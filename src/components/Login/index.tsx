import React, { useState } from 'react'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Checkbox, Form, Input } from 'antd'

import { login } from '@/api/login'
import { useMessage } from '@/hooks/message'
import { LoginApiForm } from '@/interface/index'
import { setName, setToken } from '@/redux/modules/user/action'
import { clearInfo } from '@/redux/modules/user/action'
const Login: React.FC = (props: any) => {
    const { setToken, setName, clearInfo } = props
    const { uesErrorMsg, uesSuccessMsg } = useMessage()
    const [loading, setLoading] = useState<boolean>(false)
    const navigate = useNavigate()

    const onFinish = async (values: LoginApiForm.ReqForm) => {
        try {
            clearInfo()
            setLoading(true)
            const { token } = await login(values)
            console.log(token)
            setToken(token)
            localStorage.setItem('TOKEN', token)
            setName(values.userName)
            uesSuccessMsg('登陆成功')
        } catch (error: any) {
            uesErrorMsg(error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Form
            name="basic"
            wrapperCol={{ span: 24 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
            size="large"
            className="login-forms"
        >
            <Form.Item name="username" rules={[{ required: true, message: '请输入用户名' }]}>
                <Input placeholder="用户名：test" prefix={<UserOutlined />} />
            </Form.Item>

            <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
                <Input.Password
                    autoComplete="new-password"
                    placeholder="密码：123456"
                    prefix={<LockOutlined />}
                />
            </Form.Item>

            <Form.Item
                className="login-remeber"
                name="remember"
                valuePropName="checked"
                wrapperCol={{ offset: 0, span: 16 }}
            >
                <Checkbox>记住我</Checkbox>
            </Form.Item>

            <Form.Item>
                <Button
                    type="primary"
                    htmlType="submit"
                    icon={<UserOutlined />}
                    loading={loading}
                    className="login-btn"
                >
                    登陆
                </Button>
            </Form.Item>
        </Form>
    )
}

export default connect((state: any) => state.user, {
    setToken,
    setName,
    clearInfo
})(Login)
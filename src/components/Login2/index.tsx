import React from 'react'
import { connect } from 'react-redux'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Checkbox, Form, Input } from 'antd'

import { login } from '@/api/login'
import { MenuEnum } from '@/enum/menu'
import { useMessage } from '@/hooks/message'
import { LoginApiForm } from '@/interface/index'
import { setName, setToken, clearInfo } from '@/redux/modules/user/action'

interface Login2Props {
    setToken: (token: string) => void
    setName: (name: string) => void
    clearInfo: () => void
}

interface Login2State {
    loading: boolean
}

class Login2 extends React.Component<Login2Props, Login2State> {
    constructor(props: Login2Props) {
        super(props)
        this.state = {
            loading: false
        }
    }

    handleFinish = async (values: LoginApiForm.ReqForm) => {
        const { setToken, setName, clearInfo } = this.props
        const { uesErrorMsg, uesSuccessMsg } = useMessage()

        try {
            clearInfo()
            this.setState({ loading: true })
            const { token } = await login(values)
            console.log(token)
            setToken(token)
            localStorage.setItem('TOKEN', token)
            setName(values.userName)
            uesSuccessMsg('登陆成功')
        } catch (error: any) {
            uesErrorMsg(error.message)
        } finally {
            this.setState({ loading: false })
        }
    }

    render() {
        const { loading } = this.state

        return (
            <Form
                name="basic"
                wrapperCol={{ span: 24 }}
                initialValues={{ remember: true }}
                onFinish={this.handleFinish}
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
}

const mapDispatchToProps = {
    setToken,
    setName,
    clearInfo
}

export default connect(null, mapDispatchToProps)(Login2)
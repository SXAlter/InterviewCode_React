import React from 'react'
import { RouteObject, useRoutes } from 'react-router-dom'
import Login from  '@/components/Login/index'
import Login2 from  '@/components/Login2/index'

const routers: RouteObject[] = [
    {
        path: '/',
        element: <Login/>
    },
    {
        path: '/login',
        element: <Login2/>
    }
]

const Router = () => {
    const routes = useRoutes(routers)
    return routes
}

export { Router }
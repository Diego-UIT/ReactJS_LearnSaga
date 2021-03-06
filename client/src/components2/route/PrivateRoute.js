import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoute = () => {
    const user = useSelector(state => state.users.user)
    return (
        user ? <Outlet /> : <Navigate to="/login"/>
    )
}

export default PrivateRoute

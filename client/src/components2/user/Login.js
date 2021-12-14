import React, { useEffect, useState } from 'react'
import { Form, Button, Container} from 'react-bootstrap'
import { Link, useNavigate, Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../redux2/user/userAction'

const Login = () => {
    const [username, setUserName] = useState('mchuong')
    const [password, setPassword] = useState('123')

    const dispatch = useDispatch()
    const accessToken = useSelector(state => state.users.accessToken)
    const navigate = useNavigate()

    const onLogin = (e) => {
        e.preventDefault()
        dispatch(actions.loginUser.loginUserRequest({username: username, password: password}))
        if(localStorage['accessToken'] !== '') {
            localStorage.removeItem('accessToken')
        } 
        localStorage.setItem('accessToken', accessToken)
        navigate('/')
    }

    return (
            <Container className="main-admin pt-5 w-50">
            <h1 className="text-center">Login</h1>
            <Form onSubmit={onLogin}>
                <div className="mb-3">
                    <label class="form-label">Username</label>
                    <input type="text" className="form-control" value={username} placeholder="Username"
                    onChange={(e) => setUserName(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <label class="form-label">Password</label>
                    <input type="text" className="form-control" value={password} placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div className="text-center">
                    <Button variant="primary" type="submit">
                        Login
                    </Button>
                    <Form.Group className="mt-3">
                        <Form.Text className="text-muted">
                            Don't have an account?
                        </Form.Text>
                        <Link to="/register"> Register</Link>
                    </Form.Group>
                </div>
                
            </Form>
        </Container> 
    )
}

export default Login

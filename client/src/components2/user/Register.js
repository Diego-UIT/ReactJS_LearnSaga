import React, {useState} from 'react'
import { Form, Button, Container} from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import * as actions from '../../redux2/user/userAction'

const Register = () => {
    const navigate = useNavigate()
    const [username, setUserName] = useState('mchuong')
    const [password, setPassword] = useState('123')

    const dispatch = useDispatch()

    const onHandleSubmit = (e) => {
        e.preventDefault()
        dispatch(actions.addUser.addUserRequest({username: username, password: password}))
        navigate('/admin')
        setUserName('')
        setPassword('')
    }

    return (
        <Container className="pt-5 w-50">
            <h1 className="text-center">Register</h1>
            <Form onSubmit={onHandleSubmit}>
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
                    <Button variant="outline-primary" type="submit">
                        Register
                    </Button>
                    <Form.Group className="mt-3" controlId="formBasicEmail">
                        <Form.Text className="text-muted">
                            Do you want to login?
                        </Form.Text>
                        <Link to="/login"> Login</Link>
                    </Form.Group>
                </div>
            </Form>
        </Container>
    )
}

export default Register

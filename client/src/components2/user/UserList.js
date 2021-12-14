import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../../redux2/user/userAction'
import { Table, Modal, Button, Container }  from 'react-bootstrap'
import User from './User'

const UserList = () => {
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(actions.getUsers.getUsersRequest())
    }, [])
    const users = useSelector(state => state.users.Users)
    console.log(users)

    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const [username, setUserName] = useState('mchuong')
    const [password, setPassword] = useState('123')
    const [id, setId] = useState()

    const handleSave = () => {
        dispatch(actions.editUser.editUserRequest({id: id, username: username, password: password}))
        handleClose()
    }

    const handleShow = (id) => {
        if (id !== '') {
            setId(id)
            const user = users.filter(user => user._id === id)[0]
            setUserName(user.username)
            setPassword(user.password)
        } 
        else {
            setUserName('mchuong')
            setPassword('123')
        }
        setShow(true)
    }

    return (
        <Container className="pt-5">
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th scope="col">Username</th>
                        <th scope="col">Password</th>
                        <th scope="col">Actions</th>
                    </tr> 
                </thead>
                {
                    !users ? '...loading' : users.map(user => {
                        return <User 
                                key={user._id} 
                                user={user}
                                handleShow={handleShow}
                                />
                    })
                }
            </Table>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>EDIT USER</Modal.Title>
                </Modal.Header>
                <Modal.Body>
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
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="success" onClick={handleSave} type="submit">
                    Save Changes
                </Button>
                </Modal.Footer>
            </Modal>
        </Container>
        
    )
}

export default UserList

import React from 'react'
import { useDispatch } from 'react-redux'
import * as actions from '../../redux2/user/userAction'

const User = ({user, handleShow}) => {
    const dispatch = useDispatch()

    return (
        <tbody>
            <tr>
                <td>{user.username}</td>
                <td>{user.password}</td>
                <td>
                    <button 
                        type="button" 
                        class="btn btn-warning" 
                        onClick={ () => handleShow(user._id) }>Edit</button>&nbsp;
                    <button 
                        type="button"
                        class="btn btn-danger"
                        onClick={ () => dispatch(actions.deleteUser.deleteUserRequest(user._id)) }>Delete</button>
                </td>
            </tr>
        </tbody>
    )
}

export default User

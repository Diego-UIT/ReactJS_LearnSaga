import React, { useState, useEffect } from 'react'
import { Nav, NavDropdown, Container, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import * as actions from '../../redux2/user/userAction'
import { useSelector, useDispatch } from 'react-redux'
import * as Fa from 'react-icons/fa'

const Home = ({show, setShow}) => {
    const user = useSelector(state => state.users.user)
    const dispatch = useDispatch()
    console.log(user)
    useEffect(() => {
        if (localStorage['accessToken']) {
            dispatch(actions.loadUser.loadUserRequest())
        }
    }, [])

    const onLogout = (e) => {
        e.preventDefault()
        localStorage.removeItem('accessToken')
        dispatch(actions.logoutUser.logoutUserSuccess())
    }
    const carts = useSelector(state => state.carts.products)

    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Fa.FaBars className="bars-icon"
                onClick = {() => {
                    setShow(false)
                }}/>
                <Container>
                    <Navbar.Brand href="/">My website</Navbar.Brand>
                    <Nav className="me-auto mb-2 mb-lg-0">
                        <Nav.Item>
                            <Nav.Link><Link to="/">Home</Link></Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link><Link to="/product">Products</Link></Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link><Link to="/product-table">Product Table</Link></Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link><Link to="/user">Users</Link></Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link><Link to="/admin">Admin</Link></Nav.Link>
                        </Nav.Item>
                        <NavDropdown title={user ? user.username: 'User'}>
                            <NavDropdown.Item><Link to="/login">Login</Link></NavDropdown.Item>
                            <NavDropdown.Item><Link to="/register">Register</Link></NavDropdown.Item>
                            <NavDropdown.Item><Link to="/logout" onClick={onLogout}>Logout</Link></NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                        <Link to="/cart"><Fa.FaShoppingCart to="/admin" className="cartIcon"/><span className="numberCart">({carts.length})</span></Link>
                </Container>
            </Navbar>
        </>
    )
}

export default Home

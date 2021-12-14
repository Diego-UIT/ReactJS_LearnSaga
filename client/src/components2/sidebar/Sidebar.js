import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import * as Ai from 'react-icons/ai'


const Sidebar = ({show, setShow}) => {
    const user = useSelector(state => state.users.user)
    let sideBarClass
    user ? (sideBarClass = 'sidebar d-flex flex-column') : (sideBarClass = 'sideBarNone')
    user && !show ? (sideBarClass = 'sidebar d-flex flex-column') : (sideBarClass = 'sideBarMin')

    return (
        <div className={sideBarClass}>
            <Ai.AiOutlineClose className="closeSidebar"
            onClick = {() => {
                setShow(true)
            }}/>
            <h3>Dashboard</h3>
            <div className="bar-home">
                <Link to="/">
                    <Ai.AiFillHome className="icon"/>
                    Home
                </Link>
            </div>
            <div className="bar-home">
                <Link to="/product-table">
                    <Ai.AiFillApple className="icon"/>
                    Product
                </Link>
            </div>
            <div className="bar-home">
                <Link to="/user">
                    <Ai.AiFillApple className="icon"/>
                    User
                </Link>
            </div>
        </div>
    )
}

export default Sidebar

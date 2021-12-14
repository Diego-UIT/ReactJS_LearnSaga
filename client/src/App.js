import './style.css'
import React, { useState } from 'react'
import {
    BrowserRouter,
    Routes,
    Route,
  } from "react-router-dom";
  
import Login from './components2/user/Login'
import Register from './components2/user/Register'
import Admin from './components2/admin/Admin'
import UserList from './components2/user/UserList'
import PageNotFound from './components2/notFound/PageNotFound'
import Home from './components2/home/Home'
import ProductList from './components2/product/ProductList'
import ProductListTable from './components2/product/ProductListTable'
import PrivateRoute from './components2/route/PrivateRoute'
import Sidebar from './components2/sidebar/Sidebar'
import Cart from './components2/cart/Cart'

function App() {
    const [show, setShow] = useState(false)
    
    return (
        <>
            <BrowserRouter>
            <Home show={show} setShow={setShow}/>
            <div className="admin">
                {/* <Sidebar show={show} setShow={setShow}/> */}
                <Routes>
                    <Route element={<PrivateRoute />}>
                        <Route path="/register" element={<Register />} />
                        <Route path="/user" element={<UserList />} />
                        <Route path="/admin" element={<Admin />} />
                        <Route path="/product" element={<ProductList />} />
                        <Route path="/cart" element={<Cart />} />
                    </Route>
                        <Route path="/product-table" element={<ProductListTable />} />
                        <Route path="/login" element={<Login />} />
                    <Route component={PageNotFound} />
                </Routes>
            </div>
            </BrowserRouter>
        </>
    )
}

export default App

/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import { useDispatch, useSelector} from 'react-redux'
import * as actionProduct from '../../redux2/product/productAction'
import * as actionCart from '../../redux2/cart/cartAction'
import { Col }  from 'react-bootstrap'
import { AiFillEdit, AiOutlineDelete } from 'react-icons/ai'
import Swal from 'sweetalert2'

const Product = ({product, handleShow}) => {
    const dispatch = useDispatch()
    const cart = useSelector(state => state.carts)
    const userId = useSelector(state => state.users.user._id)
    console.log(userId)
    console.log(cart)

    const addCart = (e) => {
        e.preventDefault()
        const index = cart.products.findIndex(s => s._id === product._id)
        console.log(cart.products)
        console.log(index)
        if (index < 0) {
            cart.products.push({...product, qty: 1})
        }
        else {
            cart.products[index].qty++
        }
        dispatch(actionCart.addCart.addCartRequest({
            cart: cart.products, userId: userId
        }))
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Add successfully!',
            showConfirmButton: false,
            timer: 1500
        })
    }
    return (
        <Col xs={6} sm={4} md={3} className="card">
            <img alt="" src="https://demo2wpopal.b-cdn.net/ecolive/wp-content/uploads/2021/10/81.png"/>
            <h2>{product.name}</h2>
            <p className="price">{product.price} <sup>đ</sup> /1kg</p>
            <button 
                type="button" 
                class="btn btn-success"
                onClick={addCart}>Mua hàng</button>&nbsp;

            <p className="canhTac">Chứng nhận / Canh tác</p>
            <div className="icon">
                <a href="#" className="control iconDelete"
                    onClick={ () => dispatch(actionProduct.deleteProduct.deleteProductRequest(product._id)) }>
                <AiOutlineDelete /></a>
                <a href="#" className="control iconEdit"
                    onClick={ () => handleShow(product._id) }>
                <AiFillEdit /></a>
            </div>
        </Col>
    )
}

export default Product

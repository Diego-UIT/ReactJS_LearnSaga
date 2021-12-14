import React from 'react'
import { Table, Container }  from 'react-bootstrap'
import { useSelector } from 'react-redux'
import CartItem from './CartItem'

const Cart = () => {
    const carts = useSelector(state => state.carts.products)
    console.log(carts)
    return (
        <Container className="main-data px-5 py-4">
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th scope="col">Username</th>
                        <th scope="col">Price</th>
                        <th scope="col">Unit</th>
                        <th scope="col">Info</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Total</th>
                    </tr> 
                </thead>
                {
                    !carts ? '...loading' : carts.map(cart => {
                        return <CartItem 
                                key={cart._id} 
                                cart={cart}
                                />
                    })
                }
            </Table>
        </Container>
    )
}

export default Cart

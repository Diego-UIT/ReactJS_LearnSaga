import React from 'react'

const CartItem = ({cart}) => {
    return (
        <tbody>
            <tr>
                <td>{cart.name}</td>
                <td>{cart.price}</td>
                <td>{cart.unit}</td>
                <td>{cart.info}</td>
                <td>
                    <input value="-" class="btn btn-sm btn-outline-primary btn-qty" />&nbsp;
                    <span>{cart.qty}</span>&nbsp;
                    <input value="+" class="btn btn-sm btn-outline-primary btn-qty" />
                </td>
                <td>{cart.total}</td>
            </tr>
        </tbody>
    )
}

export default CartItem

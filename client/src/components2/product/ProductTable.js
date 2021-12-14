import React from 'react'

const ProductTable = ({product}) => {
    return (
        <tbody>
            <tr>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.unit}</td>
                <td>{product.info}</td>
                <td>
                    <button 
                        type="button" 
                        class="btn btn-warning" 
                        >Edit</button>&nbsp;
                    <button 
                        type="button"
                        class="btn btn-danger"
                        >Delete</button>
                </td>
            </tr>
        </tbody>
    )
}

export default ProductTable

import React from 'react'
import { Table, Container }  from 'react-bootstrap'
import { useSelector } from 'react-redux'
import ProductTable from './ProductTable'

const ProductHome = () => {
    const products = useSelector(state => state.products)
    return (
        <Container className="main-data px-5 py-4">
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th scope="col">Username</th>
                        <th scope="col">Price</th>
                        <th scope="col">Unit</th>
                        <th scope="col">Info</th>
                        <th scope="col">Actions</th>
                    </tr> 
                </thead>
                {
                    !products ? '...loading' : products.map(product => {
                        return <ProductTable 
                                key={product._id} 
                                product={product}
                                />
                    })
                }
            </Table>
        </Container>
    )
}

export default ProductHome

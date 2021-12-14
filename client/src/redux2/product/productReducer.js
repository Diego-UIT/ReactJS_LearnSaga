import { getProducts, addProduct, editProduct, deleteProduct } from './productAction2'

const products = []

const productReducer = (state = products, action) => {
    switch(action.type) {
        case getProducts.getProductsRequest().type:
        case getProducts.getProductsFailure().type:
        case addProduct.addProductRequest().type:
        case addProduct.addProductFailure().type:
        case editProduct.editProductRequest().type:
        case editProduct.editProductFailure().type:
        case deleteProduct.deleteProductRequest().type:
        case deleteProduct.deleteProductFailure().type:
            return state   
        case getProducts.getProductsSuccess().type:
            return action.payload.products
        case deleteProduct.deleteProductSuccess().type:
            return state.filter(product => product._id !== action.payload)
        case addProduct.addProductSuccess().type:
            console.log(action.payload)
            return [...state, action.payload.data]
        case editProduct.editProductSuccess().type: 
        {   console.log(action.payload)
            return state.map(product => (product._id === action.payload._id) ? 
            {...product, 
                name: action.payload.name,
                price: action.payload.price,
                unit: action.payload.unit,
                info: action.payload.info} : product)
        }
        default:
            return state
    }
}

export default productReducer
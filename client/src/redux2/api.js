import axios from 'axios'
const urlProduct = 'http://localhost:3000/api/product/'
const urlUser = 'http://localhost:3000/api/user/'
const urlCart = 'http://localhost:3000/api/cart/'

const productAPI = axios.create({baseURL: urlProduct})
export const getProductAPI = async() => await productAPI.get()
export const addProductAPI = async(product) => await productAPI.post(urlProduct, product)
export const deleteProductAPI = async(id) => await productAPI.delete(id)
export const editProductAPI = async(product) => await productAPI.put(product.id, product)

const userAPI = axios.create({baseURL: urlUser})
export const getUserAPI = async() => await userAPI.get()
export const getUserIdAPI = async() => await userAPI.get('auth')
export const addUserAPI = async(user) => await userAPI.post(urlUser + 'register', user)
export const loginUserAPI = async(user) => await userAPI.post(urlUser + 'login', user)
export const deleteUserAPI = async(id) => await userAPI.delete(id)
export const editUserAPI = async(user) => await userAPI.put(user.id, user)

export const setTokenHeader = token => {
    if (token) {
            userAPI.defaults.headers.common['Authorization'] = `Bearer ${token}`
    } else {
        delete userAPI.defaults.headers.common['Authorization']
    }
}

const cartAPI = axios.create({baseURL: urlCart})
export const getCartAPI = async(userId) => await cartAPI.get(userId)
export const addCartAPI = async(cart) => await cartAPI.post(urlCart, cart)
export const deleteCartAPI = async(id) => await cartAPI.delete(id)
export const editCartAPI = async(id, cart) => await cartAPI.put(id, cart)
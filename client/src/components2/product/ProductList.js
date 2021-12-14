import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../../redux2/product/productAction2'
import Product from './Product'
import { Container, Row }  from 'react-bootstrap'
import { Modal, Button }  from 'react-bootstrap'
import { storage } from '../../firebase/config'

const ProductList = () => {
    const [show, setShow] = useState(false)
    const [id, setId] = useState()
    const [name, setName] = useState('Táo úc')
    const [price, setPrice] = useState(400000)
    const [unit, setUnit] = useState('quả')
    const [info, setInfo] = useState('Hàng nhập ngoại')
    const [image, setImage] = useState(null)
    const [url, setUrl] = useState('')
    const [progress, setProgress] = useState(0)

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0])
            console.log(e.target.files[0])
        }
    }

    const handleClose = () => {
        setShow(false)
        setId('')
    }

    const handleSave = () => {
        if (image) {
            const uploadTask = storage.ref(`/images/${image.name}`).put(image)
            uploadTask.on(
                'state_changed', 
                (snapshot) => {
                    const progress = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    )
                    setProgress(progress)
                }, (err) => {
                    console.log(err)
                }, () => {
                    storage.ref('images')
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        if (id) {
                            dispatch(actions.editProduct.editProductRequest({id: id, name: name, price: price, unit: unit, info: info}))
                            setUrl(url)
                        }
                        else {
                            dispatch(actions.addProduct.addProductRequest({name: name, price: price, unit: unit, info: info}))
                            setUrl(url)
                        }
                    })
                })
        }
        else {
            if (id) {
                dispatch(actions.editProduct.editProductRequest({id: id, name: name, price: price, unit: unit, info: info}))
            }
            else {
                dispatch(actions.addProduct.addProductRequest({name: name, price: price, unit: unit, info: info}))
                setUrl(url)
            }
        }
        handleClose()
    }

    const handleShow = (id) => {
        if (id !== '') {
            setId(id)
            const pro = products.filter(pro => pro._id === id)[0]
            setName(pro.name)
            setPrice(pro.price)
            setUnit(pro.unit)
            setInfo(pro.info)
        } 
        else {
            setName('Táo úc')
            setPrice(30000)
            setUnit('quả')
            setInfo('Hàng nhập ngoại')
        }
        setShow(true)
    }

    
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(actions.getProducts.getProductsRequest())
    }, [])
    const products = useSelector(state => state.products)

    

    return (
        <Container>  
            <div className="text-center">
                <Button className="mt-3 mb-3" variant="success" onClick={() => handleShow('')}>
                    ADD PRODUCT
                </Button>
            </div>
            <input type="range" value={price} min={0} max={400000} step={1000}
            onChange={(e) => {
                setPrice(e.target.value)
            }}/>
            <span>{new Intl.NumberFormat('de-DE').format(price)}₫</span>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>ADD/EDIT PRODUCT</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="input-group mb-3">
                        <span className="input-group-text">Product name</span>
                        <input type="text" className="form-control" value={name}
                        onChange={(e) => setName(e.target.value)}/>
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text">Price</span>
                        <input type="text" className="form-control" value={price}
                        onChange={(e) => setPrice(e.target.value)}/>
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text">Unit</span>
                        <input type="text" className="form-control" value={unit}
                        onChange={(e) => setUnit(e.target.value)}/>
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text">Information</span>
                        <input type="text" className="form-control" value={info}
                        onChange={(e) => setInfo(e.target.value)}/>
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text">Image</span>
                        <input type="file" className="form-control" onChange={handleImageChange} />
                        {
                            url ? <img src={url}/> : ""
                        }
                    </div>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="success" onClick={handleSave} type="submit">
                    Save Changes
                </Button>
                </Modal.Footer>
            </Modal>
            <Container>
                <Row>
                    {
                        !products ? '...loading' : 
                        products.filter(function(x) { return x.price <= price }).map(product => {
                            return <Product 
                                    key={product._id} 
                                    product={product}
                                    handleShow={handleShow}
                                    />
                        })
                    }

                </Row>
            </Container>
        </Container>
    )
}

export default ProductList

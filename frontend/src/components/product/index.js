import React from 'react'
import styles from './styles/productId.module.css'
import addIcon from '../../assets/icons/add.png'
import arrow from '../../assets/icons/arrow.png'
import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import imgProcessor from '../../utils/imgProcessor'
import { connect } from 'react-redux'


const Product = ({ addProduct, isAuthenticated, addProductSingle }) => {
    const [mainImageSrc, setMainImageSrc] = useState('')
    const [product, setProduct] = useState({})
    const navigate = useNavigate()
    const { id } = useParams()

    useEffect(() => {
        axios.get(`/product/id/${id}`)
        .then(res => res.data)
        .then(data => {setProduct(data); setMainImageSrc(data.productPicture.data)})
    },[])

    const addToCart = (e,id, price, name, quantity, picture ) => {
        e.preventDefault()
        addProduct({id, price, name, quantity, picture})
        if(isAuthenticated) {
            return navigate('/purchase-info')
        }
        navigate('/sign-up')
    }

    const buyProduct = (e,id, price, name, quantity, picture ) => {
        e.preventDefault()
        addProductSingle({id, price, name, quantity, picture})
        
        if(isAuthenticated){
            return navigate('/shipping-info')
        }

        navigate('/sign-up')

    }

    return (
        <div className={styles.productSection} >
           {product._id ? <>
                <div className={styles.productDetails} >
                    <h1 className={styles.productName} > {product.productName} </h1>
                    <p className={styles.productDescription} > {product.productDescription} </p>
                    <div className={styles.cta} >
                        <a href="" className={styles.addToCart}  onClick={(e)=>{addToCart(e,product._id,product.productPrice, product.productName, 1, product.productPicture)}} > <span> <img src={addIcon} className={styles.addIcon}  /> </span>  اضف الى السلة </a>
                        <a href="" className={styles.buy} onClick={(e)=>{buyProduct(e, product._id, product.productPrice, product.productName, 1, product.productPicture)}} > <span> <img src={arrow}  className={styles.arrow} /> </span>  شراء  </a>
                    </div>
                </div>
                <div className={styles.showcase} >
                    <div className={styles.showcaseMain} > <img src={`data:image/jpeg;base64, ${imgProcessor(mainImageSrc)}`} /> </div>
                    <div className={styles.subImages} >
                        <div onClick={() => {setMainImageSrc(product.extraImage1.data)}}  tabIndex="-1"> <img src={`data:image/jpeg;base64, ${imgProcessor(product.extraImage1.data)}`}  className={styles.subImage} /> </div>
                        <div onClick={() => {setMainImageSrc(product.extraImage2.data)}}  tabIndex="-1"> <img src={`data:image/jpeg;base64, ${imgProcessor(product.extraImage2.data)}`}  className={styles.subImage} /> </div>
                        <div onClick={() => {setMainImageSrc(product.extraImage3.data)}}  tabIndex="-1"> <img src={`data:image/jpeg;base64, ${imgProcessor(product.extraImage3.data)}`}  className={styles.subImage} /> </div>
                        <div onClick={() => {setMainImageSrc(product.extraImage4.data)}}  tabIndex="-1"> <img src={`data:image/jpeg;base64, ${imgProcessor(product.extraImage4.data)}`}  className={styles.subImage} /> </div>
                    </div>
                </div> 
            </> : ''}
          
        </div> 
    )
}

const mapStateToProps = state => {
    return {
        product: state.boughtItem,
        cart: state.cart,
        isAuthenticated: state.userAuth.isAuthenticated
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addProduct: (payload) => dispatch({type: 'ADD_PRODUCT', payload}),
        addProductSingle: (payload) => dispatch({type: 'SUBMIT_ITEM', payload}) 

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Product)

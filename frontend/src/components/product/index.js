import React from 'react'
import styles from './styles/productId.module.css'
import addIcon from '../../assets/icons/add.png'
import arrow from '../../assets/icons/arrow.png'
import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Spinner } from '../../utils/Spinner'
/* eslint-disable */

const Product = ({ addProduct, isAuthenticated, addProductSingle, isAdminAuth, token }) => {
    const [mainImageSrc, setMainImageSrc] = useState('')
    const [product, setProduct] = useState({})
    const navigate = useNavigate()
    const { id } = useParams()

    useEffect(() => {
        
        axios.get(`/product/id/${id}`)
        .then(res => res.data)
        .then(data => {setProduct(data); setMainImageSrc(data.productPicture)}).catch(error => {
            navigate('/', {replace: true})
        })
        
    },[])
  

    const addToCart = (e,id, price, name, quantity, picture ) => {
        e.preventDefault()
        addProduct({id, price, name, quantity, picture})
        // if(isAuthenticated) {
            return navigate('/purchase-info')
        // }
        // navigate('/sign-up')
    }

    const buyProduct = (e,id, price, name, quantity, picture ) => {
        e.preventDefault()
        addProductSingle({id, price, name, quantity, picture})
        
        // if(isAuthenticated){
            return navigate('/shipping-info')
        // }

        // navigate('/sign-up')

    }

    const deleteProduct = (e, id ) => {
        e.preventDefault();
        axios.delete(`/product/${id}`, {
            headers: {
                Authorization: token
            }
        }, {
            id
        }).then(res => {
            navigate('/', {replace: true})
        })
    }   

    return (
        <>{product._id ? 
        <div className={styles.productSection} >
                <div className={styles.productDetails} >
                    <h1 className={styles.productName} > {product.productName} </h1>
                    <h1 className={styles.productName} style={{fontWeight: '300'}} > {product.productPrice} <span>:السعر</span> </h1>
                    <p className={styles.productDescription} > {product.productDescription} </p>
                    <div className={styles.cta} >
                        { !isAdminAuth ?
                        <>
                            <a href="" className={styles.addToCart}  onClick={(e)=>{addToCart(e,product._id,product.productPrice, product.productName, 1, product.productPicture)}} > <span> <img src={addIcon} className={styles.addIcon}  /> </span>  اضف الى السلة </a>
                            <a href="" className={styles.buy} onClick={(e)=>{buyProduct(e, product._id, product.productPrice, product.productName, 1, product.productPicture)}} > <span> <img src={arrow}  className={styles.arrow} /> </span>  شراء  </a>
                        </>
                        :<a href="" className={styles.delete} onClick={(e) =>{deleteProduct(e, product._id)}} > مسح المنتج  </a>}
                    </div>
                </div>
                <div className={styles.showcase} >
                    <div className={styles.showcaseMain} > <img src={mainImageSrc} className={styles.mainImage} width="350px" height="500px"/> </div>
                    <div className={styles.subImages} >
                        <div onClick={() => {setMainImageSrc(product.extraImage1)}}  tabIndex="-1"> <img src={product.extraImage1}  className={styles.subImage} /> </div>
                        <div onClick={() => {setMainImageSrc(product.extraImage2)}}  tabIndex="-1"> <img src={product.extraImage2}  className={styles.subImage} /> </div>
                        <div onClick={() => {setMainImageSrc(product.extraImage3)}}  tabIndex="-1"> <img src={product.extraImage3}  className={styles.subImage} /> </div>
                        <div onClick={() => {setMainImageSrc(product.extraImage4)}}  tabIndex="-1"> <img src={product.extraImage4}  className={styles.subImage} /> </div>
                    </div>
                </div> 
        </div> : <Spinner /> }</>
    )
}

const mapStateToProps = state => {
    return {
        product: state.boughtItem,
        cart: state.cart,
        isAuthenticated: state.userAuth.isAuthenticated,
        isAdminAuth: state.adminAuth.isAuthenticated,
        token: state.adminAuth.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addProduct: (payload) => dispatch({type: 'ADD_PRODUCT', payload}),
        addProductSingle: (payload) => dispatch({type: 'SUBMIT_ITEM', payload}) 

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Product)

import React from 'react'
import { useState } from 'react'
import styles from './styles/categories.module.css'
import addIcon from '../../assets/icons/add.png'
import arrow from '../../assets/icons/arrow.png'
import { useEffect } from 'react'
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import InfiniteScroll from 'react-infinite-scroll-component'
import { connect } from 'react-redux'
import { Spinner } from '../../utils/Spinner'
/* eslint-disable */

const Category = ({addProduct, isAuthenticated, addProductSingle, clearCart, showMessage, hideMessage, setLoader, disableLoader }) => {

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [hasMore, setHasMore] = useState(true)
    const [skip, setSkip] = useState(0)
    const { category, search } = useParams()
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        setProducts([])
        setSkip(0)
        setHasMore(true)
        setLoading(true)
        window.scroll({top: 150, behavior: 'smooth'})
        console.log('location changed')
    }, [location, search])

    const getProducts = () => {
        setLoader()
        
        if(window.location.href.includes('search')) {
            axios.get(`/product/search/${search}?limit=9&skip=${skip}`)
            .then( ({ data }) => {
                if(data.length === 0 && products.length === 0) {
                    navigate('/', {replace: true})
                    showMessage('لا توجد منتجات للعرض')
                    setTimeout(hideMessage, 3000)
                }
                if(data.length === 0 ) {
                    setHasMore(false)
                    disableLoader()
                    return setLoading(false)
                }
                setProducts(products.concat(data)) 
                setSkip(skip + 9)
                disableLoader()
            })
            
        } else if(window.location.href.includes('getAll')) {
            axios.get(`/product/all?limit=9&skip=${skip}`)
            .then( ({ data }) => {
                if(data.length === 0) {
                    setHasMore(false)
                    disableLoader()
                    return setLoading(false)
                }
                setProducts(products.concat(data)) 
                setSkip(skip + 9)
                disableLoader()
            })
        }
         else {

            axios.get(`/product/category/${category}?limit=9&skip=${skip}`)
            .then( ({ data }) => {

                if(data.length === 0 && products.length === 0) {
                    navigate('/', {replace: true})
                    showMessage('لا توجد منتجات للعرض')
                    setTimeout(hideMessage, 3000)
                }
                if(data.length === 0 ) {
                    setHasMore(false)
                    disableLoader()
                    return setLoading(false)
                }
                
                setProducts(products.concat(data))
                setSkip(skip + 9)
                disableLoader()
            }).catch(error => {
                console.log(error)
            })
        }
    }

    const addToCart = (e,id, price, name, quantity, picture, currency = 'جنيه' ) => {
        e.preventDefault()
        addProduct({id, price, name, quantity, picture, currency})
        
        // if(isAuthenticated){
            showMessage('تمت اضافة المنتج الى السلة')
            setTimeout(hideMessage, 3000)
            return
        // }

        // navigate('/sign-up')

    }

    const buyProduct = (e,id, price, name, quantity, picture, currency = 'جنيه' ) => {
        e.preventDefault()
        clearCart()
        addProductSingle({id, price, name, quantity, picture, currency})
        
        // if(isAuthenticated){
            return navigate('/shipping-info')
        // }

        // navigate('/sign-up')

    }

    const productArray = products.map(el => {
        return(
                <div className={styles.productCard} key={el._id} >
                    <Link to={`/product/${el._id}`} >
                        <div className={styles.productImg} >
                            <img src={el.productPicture} width="320rem" height="270rem" />
                        </div>
                    </Link>
                    <Link to={`/product/${el._id}`} ><h2 className={styles.productName} > {el.productName} </h2> </Link>
                    <h3 className={styles.price} > <span className={styles.pound} > {el.currency === 'ريال' ? 'ريال' : 'ج'} </span> {el.productPrice} </h3>
                    <div className={styles.cta} >
                        <a onClick={(e)=>{addToCart(e, el._id, el.productPrice, el.productName, 1, el.productPicture, el.currency)}} className={styles.addToCart} > <span> <img src={addIcon}  className={styles.addIcon}  /> </span>  اضف الى السلة </a>
                        <a onClick={(e)=>{buyProduct(e, el._id, el.productPrice, el.productName, 1, el.productPicture, el.currency)}} className={styles.buy} > <span > <img src={arrow} className={styles.arrow}/> </span>  شراء  </a>
                    </div>
                </div>
        )
    })
    
    return (
        <InfiniteScroll className={ styles.categorySection }
            dataLength={products.length}
            hasMore={hasMore}   
            next={getProducts}
            loader={<h3> <Spinner /> </h3>}
            style={{overflowX: 'hidden'}} >
            <h1 className={styles.categoryName}> {category || search || 'عرض المنتجات'} </h1>
            
            <div 
            className={styles.products}>
                {products.length === 0 ? <h1 style={{textAlign: 'center'}} > {loading ? "": 'لا توجد منتجات للعرض'} </h1>: productArray }  
            </div>

        </InfiniteScroll>
    )
}

const mapStateToProps = state => {
    return {
        product: state.boughtItem,
        cart: state.cart,
        isAuthenticated: state.userAuth.isAuthenticated,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addProduct: (payload) => dispatch({type: 'ADD_PRODUCT', payload}),
        clearCart: () => dispatch({type: 'CLEAR'}),
        addProductSingle: (payload) => dispatch({type: 'SUBMIT_ITEM', payload}),
        showMessage: (payload) => dispatch({type: 'SHOW_MESSAGE',payload: payload}),
        hideMessage: () => dispatch({type: 'HIDE_MESSAGE'}),
        setLoader: () => dispatch({type: 'SET_LOADING'}),
        disableLoader: () => dispatch({type: 'DISABLE_LOADING'}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Category)



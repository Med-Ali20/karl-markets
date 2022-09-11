import React from 'react'
import { useState } from 'react'
import styles from './styles/categories.module.css'
import addIcon from '../../assets/icons/add.png'
import arrow from '../../assets/icons/arrow.png'
import { useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import imgProcessor from '../../utils/imgProcessor'
import InfiniteScroll from 'react-infinite-scroll-component'
import { connect } from 'react-redux'



const Category = ({addProduct, isAuthenticated, addProductSingle}) => {

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [hasMore, setHasMore] = useState(true)
    const [skip, setSkip] = useState(0)
    const { category, search } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        window.scroll(0,400)
        setProducts([])
        setLoading(true)
    }, [category, search])

    const getProducts = () => {
        
        if(window.location.href.includes('search')) {
            axios.get(`/product/search/${search}?limit=9&skip=${skip}`)
            .then( ({ data }) => {
                if(data.length === 0) {
                    setHasMore(false)
                    return setLoading(false)
                }
                setProducts(products.concat(data)) 
                setSkip(skip + 9)
            })
            
        } else {

            axios.get(`/product/category/${category}?limit=9&skip=${skip}`)
            .then( ({ data }) => {
                if(data.length === 0) {
                    setHasMore(false)
                    return setLoading(false)
                }
                setProducts(products.concat(data))
                setSkip(skip + 9)
            })
        }
    }

    const addToCart = (e,id, price, name, quantity, picture ) => {
        e.preventDefault()
        addProduct({id, price, name, quantity, picture})
        
        if(isAuthenticated){
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

    const productArray = products.map(el => {
        return(
                <div className={styles.productCard} key={el._id} >
                    <Link to={`/product/${el._id}`} >
                        <div className={styles.productImg} >
                            <img src={`data:image/jpeg;base64,${imgProcessor(el.productPicture.data)}`} width="320rem" height="270rem" />
                        </div>
                    </Link >
                    <Link to={`/product/${el._id}`} ><h2 className={styles.productName} > {el.productName} </h2> </Link>
                    <h3 className={styles.price} > <span className={styles.pound} > ج </span> {el.productPrice} </h3>
                    <div className={styles.cta} >
                        <a onClick={(e)=>{addToCart(e, el._id, el.productPrice, el.productName, 1, el.productPicture)}} className={styles.addToCart} > <span> <img src={addIcon}  className={styles.addIcon}  /> </span>  اضف الى السلة </a>
                        <a onClick={(e)=>{buyProduct(e, el._id, el.productPrice, el.productName, 1, el.productPicture)}} className={styles.buy} > <span > <img src={arrow} className={styles.arrow}/> </span>  شراء  </a>
                    </div>
                </div>
        )
    })
    
    return (
        <div className={ styles.categorySection } >
            <h1 className={styles.categoryName} > {category || search} </h1>
            <InfiniteScroll 
            className={styles.products}
            dataLength={products.length}    
            next={getProducts}
            hasMore={hasMore}>
                {products.length === 0? <h1 style={{textAlign: 'center'}} > {loading ? 'Loading ...' : 'لا توجد منتجات للعرض'} </h1>: productArray }
                
            </InfiniteScroll>

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
        addProduct: (payload) => dispatch({type: 'ADD_PRODUCT', payload}) ,
        addProductSingle: (payload) => dispatch({type: 'SUBMIT_ITEM', payload}) 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Category)


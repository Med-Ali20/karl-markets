import React from 'react'
import arrow from '../../assets/icons/arrow.png'
import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styles from './styles/purchase.module.css'
import { Link } from 'react-router-dom'
/* eslint-disable */

const Index = ( { cart, incrementQuantity, decrementQuantity, removeItem } ) => {
    const [products, setProducts] = useState([])
    const navigate = useNavigate()
    
    useEffect(() => {
        setProducts(() => cart.products)
        console.log(products)
    }, [cart.products])

    const cartItems = products.map(el => {
        return(
            
                    <div className={styles.tableItem} key={el.productId} >
                        <div ><img src={el.productPicture} className={styles.productImage} width="320rem" onClick={() => navigate(`/product/${el.productId}`)}  /></div>
                        <h3 className={styles.productName} onClick={() => navigate(`/product/${el.productId}`)} >{el.productName}</h3>
                        <h3 className={styles.itemPrice} >{el.productPrice} <span className={styles.pound} >{el.currency === 'ريال' ? 'ريال' : 'ج'}</span></h3>
                        <div className={styles.quantityArea} >
                            <div className={styles.quantityControls} >
                                <button onClick={() => decrementQuantity(el.productId)} className={styles.subtract} >-</button>
                                <h3 className={styles.quantity} >{el.productQuantity}</h3>
                                <button onClick={() => incrementQuantity(el.productId)} className={styles.add} >+</button>
                            </div>
                            <button className={styles.remove} onClick={()=> removeItem(el.productId)} >ازالة</button>
                        </div>
                        <h3 className={styles.total} ><span className={styles.totalPriceText} >{el.productQuantity * el.productPrice}</span>   <span className={styles.pound} >{el.currency === 'ريال' ? 'ريال' : 'ج'}</span>  </h3>
                    </div>
        )
    })

    const reducer = (previousValue, currentValue) => parseInt(previousValue) + parseInt(currentValue);

    return (
        <div className={styles.purchaseInfoSection} >
            <div className={styles.infoTable} >
                <div className={styles.tableHeader} >
                    <h2>المنتج</h2>
                    <h2>السعر</h2>
                    <h2>الكمية</h2>
                    <h2>المجمل</h2>
                </div>
                <div className={styles.tableContent} >
                    {products.length === 0? <h2 style={{textAlign: 'center', opacity: '0.6'}} >لا توجد منتجات للعرض</h2>:cartItems }
                </div>
            </div>
            <div className={styles.totalPaid} ><h2 className={styles.totalPaidText} >:اجمالي المدفوعات</h2> <h2 className={styles.totalPaidPrice}> { products.length === 0? 0:products.map(el => el.productPrice* el.productQuantity).reduce(reducer) } </h2></div>
            {products.length !== 0? <Link to="/shipping-info" className={styles.cta}><span><img src={arrow} className={styles.ctaArrow} /></span>اتمام الشراء</Link>:<></>}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        cart: state.cart
    }
}

const mapDispatchToProps = dispatch => {
    return {
        incrementQuantity: (id) => dispatch({type: 'INCREMENT',id}),
        decrementQuantity: (id) => dispatch({type: 'DECREMENT',id}),
        removeItem: (id) => dispatch({type: 'REMOVE', id})
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Index)


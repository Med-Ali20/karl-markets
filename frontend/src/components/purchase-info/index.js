import React from 'react'
import arrow from '../../assets/icons/arrow.png'
import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import imgProcessor from '../../utils/imgProcessor'
import styles from './styles/purchase.module.css'
import { Link } from 'react-router-dom'

const Index = ( { cart, incrementQuantity, decrementQuantity } ) => {
    const [products, setProducts] = useState([])
    
    useEffect(() => {
        setProducts(() => cart.products)
    }, [cart.products])

    const cartItems = products.map(el => {
        return(
            
                    <div className={styles.tableItem} key={el.productId} >
                        <div ><img src={`data:image/jpeg;base64,${imgProcessor(el.productPicture.data)}`} className={styles.productImage} width="320rem"  /></div>
                        <h3 className={styles.productName} >{el.productName}</h3>
                        <h3 className={styles.itemPrice} >{el.productPrice} <span className={styles.pound} >ج</span></h3>
                        <div className={styles.quantityControls} >
                            <button onClick={() => decrementQuantity(el.productId)} className={styles.subtract} >-</button>
                            <h3 className={styles.quantity} >{el.productQuantity}</h3>
                            <button onClick={() => incrementQuantity(el.productId)} className={styles.add} >+</button>
                        </div>
                        <h3 className={styles.total} ><span className={styles.totalPriceText} >{el.productQuantity * el.productPrice}</span>   <span className={styles.pound} >ج</span>  </h3>
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
            <div className={styles.totalPaid} ><h2 className={styles.totalPaidText} >:اجمالي المدفوعات</h2> <h2 className={styles.totalPaidPrice}> <span>ج</span> { products.length === 0? 0:products.map(el => el.productPrice* el.productQuantity).reduce(reducer) } </h2></div>
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
        decrementQuantity: (id) => dispatch({type: 'DECREMENT',id})
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Index)


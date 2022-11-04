import React from 'react'
import styles from './styles/user-dashboard.module.css'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import imgProcessor from '../../../utils/imgProcessor'



const Index = ( { token, rank } ) => {
    const [orders, setOrders] = useState([])
    const [inputField, setInputField] = useState(undefined)
    const [salesManCode, setSalesManCode] = useState(undefined)
    const [hasMore, setHasMore] = useState(true)
    const [skip, setSkip] = useState(0)

    const getOrders = (e, salesManC, tkn) => {
        if(e){
            e.preventDefault()
        }
        axios.post(`/dashboard/orders?limit=20&skip=${skip}`,{
            salesmanCode: salesManC? salesManC: null
        }, {
            headers: {
                Authorization: token
        }})
        .then(res => {
            if(e){
                setInputField(false)
            }
            if(res.data.length === 0) {
                setHasMore(false)
            }
            setOrders(res.data.orders? orders.concat(res.data.orders) : orders.concat(res.data))
            setSkip(skip +20)
            
        })
    }

    useEffect(() => {
        if(rank === 'chief-admin'){
            setInputField(true)
        }
        getOrders()

    },[])

    
    const ordersList = orders.length > 0 ? orders.map(el => {
        return(
            <>  
                <div className={styles.infoTable} key={el._id}  >
                    <div className={styles.customerInfo} >
                        <h3>اسم العميل: {el.customerName}</h3>
                        <h3>العنوان: {el.fullAddress}</h3>
                        <h3>رقم الموبايل: {el.phoneNumber}</h3>
                        <h3>المحافظة: {el.province}</h3>
                       { el.description?  <h3>معلومات اضافية: {el.description}</h3> : ''}
                    </div>
                    <div className={styles.tableHeader} >
                        <h2>المنتج</h2>
                        <h2>السعر</h2>
                        <h2>الكمية</h2>
                        <h2>المجمل</h2>
                    </div>
                    <div className={styles.tableContent} >
                        { el.products.map(prod => {
                            return(
                                <>
                                 <div className={styles.tableItem} key={prod.productId} >
                                    <img src={prod.productPicture} width="270rem" className={styles.productImage} />
                                    <h3 className={styles.productName} > { prod.productName } </h3>
                                    <h3 className={styles.itemPrice} > { prod.productPrice } <span className={styles.pound} >ج</span></h3>
                                    <div className={styles.quantityControls} >
                                        <h3 className={styles.quantity} > {prod.productQuantity} </h3>
                                    </div>
                                    <h3 className={styles.total} ><span className={styles.totalPriceText} >{prod.productQuantity * prod.productPrice}</span>   <span className={styles.pound2} >ج</span>  </h3>
                                </div>
                                </>
                            )
                        }) }
                    </div>
                </div>            
            </>
        )
    }) : ''

    const inputSalesManCode = (tkn) => {
        return (
            <form>
                <input type="text" value={salesManCode} onChange={e => setSalesManCode(e.target.value)} />
                <button onClick={(e) => getOrders(e,salesManCode, tkn)} >عرض الطلبات</button>
            </form>
        )
    }

    return (
        <div className={styles.userDashboard}>
            {inputField? inputSalesManCode(token) : <>{orders.length !== 0? ordersList : <h2 style={{opacity: '0.7', textAlign: 'center'}} > لا توجد طلبات للعرض </h2>}</> }
            
        </div>
    )
}

const mapStateToProps = state => {
    return {
        token: state.adminAuth.token,
        rank: state.adminAuth.rank
    }
}

export default connect(mapStateToProps)(Index)

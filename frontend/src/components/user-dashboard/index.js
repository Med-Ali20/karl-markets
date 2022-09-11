import React from 'react'
import styles from './styles/user-dashboard.module.css'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import imgProcessor from '../../utils/imgProcessor'

const Index = ( { token } ) => {
    const [orders, setOrders] = useState([])
    const navigate = useNavigate()
    
    useEffect(() => {
        axios.get(`/orders`,{
            headers: {
                'Authorization': token
            }
        })
        .then(res => {
            setOrders(() => res.data)

        })

    },[])

    
    
    const deleteOrder = (e, id, token) => {
        e.preventDefault()
        axios.delete(`/order/${id}`,{
            headers: {
                Authorization: token
            },
            data:{
                id
            }
        })
        navigate(0, {replace: true})
       
        
    }
    
    const reducer = (previousValue, currentValue) => parseInt(previousValue) + parseInt(currentValue);
    
    

    const ordersList = orders.map((el, i) => {
        return(
            <>
                <div className={styles.infoTable} key={el._id}  >|
                    <div className={styles.tableHeader} >
                        <h2>المنتج</h2>
                        <h2>السعر</h2>
                        <h2>الكمية</h2>
                        <h2>المجمل</h2>
                    </div>
                    <div className={styles.tableContent} >
                        {el.products.map(prod => {
                            return (<div className={styles.tableItem} >
                                        <img src={`data:image/jpeg;base64,${imgProcessor(prod.productPicture.data)}`}  className={styles.productImage}  width="270rem" />
                                        <h3 className={styles.productName} > { prod.productName } </h3>
                                        <h3 className={styles.itemPrice} > { prod.productPrice } <span className={styles.pound} >ج</span></h3>
                                        <div className={styles.quantityControls} >
                                            <h3 className={styles.quantity} > {prod.productQuantity} </h3>
                                        </div>
                                        <h3 className={styles.total} ><span className={styles.totalPriceText} >{prod.productQuantity * prod.productPrice}</span>   <span className={styles.pound2} >ج</span>  </h3>
                                    </div>)
                        })}
                    </div>
                </div>
                <div className={styles.totalPaid} ><h2 className={styles.totalPaidText} >:اجمالي المدفوعات</h2> <h2 className={styles.totalPaidPrice}> <span>ج</span> { el.products.length === 0? 0:el.products.map(el => el.productPrice* el.productQuantity).reduce(reducer) } </h2></div>
                {<a onClick={(e) => deleteOrder(e, el._id, token)} className={styles.cta} >الغاء الطلب</a>}
            
            </>
        )
    })
    
    return (
        <div className={styles.userDashboard} >
             {orders.length !== 0? ordersList : <h2 style={{opacity: '0.7', textAlign: 'center'}} > لا توجد طلبات للعرض </h2>}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        token: state.userAuth.token
    }
}

export default connect(mapStateToProps)(Index)

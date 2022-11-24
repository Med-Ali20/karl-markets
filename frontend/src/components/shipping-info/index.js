import React from 'react'
import arrow from '../../assets/icons/arrow.png'
import styles from './styles/shipping-info.module.css'
import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import sha256 from 'crypto-js/sha256';
import { Spinner } from '../../utils/Spinner'
/* eslint-disable */

const Index = ({ cart, token, boughtItem, clearCart, showMessage, hideMessage }) => {

    const [products, setProducts] = useState([])
    const [fullName, setFullName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [province, setProvince] = useState('')
    const [address, setAddress] = useState('')
    const [email, setEmail] = useState('')
    const [description, setDescription] = useState('')
    const [salesManCode, setSalesManCode] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState({errorMessage: '', isError: false})
    const navigate = useNavigate()

    useEffect(() => {
        if(cart.products.length > 0) {
            setProducts(() => cart.products)
        } else {
            setProducts(() =>[boughtItem])
        }

    }, [cart.products])

    const reducer = (previousValue, currentValue) => parseInt(previousValue) + parseInt(currentValue);

    
    const productCards = products.map(el => {
        return (
                <div className={styles.productCard} key={el.productId} >
                    <div className={styles.productImage} > <img src={el.productPicture} width="200rem" /> </div>
                    <div className={styles.productInfoText} >
                        <h3 className={styles.productName} >{el.productName} </h3>
                        <h3 className={styles.productPrice} ><span>ج</span>{el.productPrice}</h3>
                        <span className={styles.quantity} >{el.productQuantity}</span>
                    </div> 
                </div>
        )
    })

    const setupPixel = (em, fullname, ph, st, products) => {

        const name = fullname.split(' ')
        const advancedMatching = {
             em,
             ph,
             st,
             fn: name[0],
             ln: name[name.length - 1],
             id:'383063303951102',
             token: 'EAAGFZCwOMhuQBAOcfZBBHVyOLRBMetY9sZC8d0LtR5G026mJsUHKnz1pFj64DAxEvSpb1cbaumavv33o0kQCv4clBNSffIkMmjtQijr2d22Ameg1kR9ezXDD2ye3ZBUMj0q7I6kQJ2gpH6qJc7iTPnRZA8asXGZB4ijl5qqR1am4sLrAeWpuDf'

        }
       axios.post(`https://graph.facebook.com/v15.0/${advancedMatching.id}/events?access_token=${advancedMatching.token}`,
       {
        "data": [
            {
                "event_name": "Purchase",
                "event_time": Math.floor(Date.now() / 1000),
                "action_source": "website ",
                "user_data": {
                    "em": sha256(advancedMatching.em).toString(),
                    "ph": sha256(advancedMatching.ph).toString(),
                    "st": sha256(advancedMatching.st).toString(),
                    "fn": sha256(advancedMatching.fn).toString(),
                    "ln": sha256(advancedMatching.lm).toString()
                },
                "custom_data": {
                    "currency": "EGP",
                    "value": products.map(el => el.productPrice* el.productQuantity).reduce(reducer)
                }
            }
        ]
    }).then(res => {
        console.log(res)
    })
    }

    const submitOrder = (e, form, token) => {
        e.preventDefault()
        setError({isError: false, errorMessage: ''})
        if(!form.customerName || !form.fullAddress || !form.phoneNumber || !form.province || !form.products) {
            return setError({errorMessage: 'برجاء التأكد من اضافة البيانات الضرورية', isError: true})
        }
        if(form.phoneNumber.length < 11) { 
            return setError({errorMessage: 'رقم المحمول أقل من 11 خانة', isError: true})
         }
        setLoading(true)
        axios.post('/order', form, {
            headers: {
                Authorization: token
            }
        }).then( res => {
            setupPixel(
                form.email,
                form.customerName,
                form.phoneNumber,
                form.province,
                products

            )
            setLoading(false)
            clearCart()
            navigate('/user-dashboard', {replace: true})
            showMessage()
            setTimeout(hideMessage, 3000)
        }).catch(error => {
            setLoading(false)
            console.log(error)
            if(error.response.data.message === 'Order validation failed: email: Email is invalid') {
                return setError({isError: true, errorMessage: 'برجاء ادخال بريد الكتروني صحيح'})
            }
        })

        
    }


    return (
        <div  className={styles.shippingInfoSection} >
            { loading ? <div className={styles.loadingScreen}> <Spinner /> </div>: ''}
            <div className={styles.formSection} >
                <h1 className={styles.formHeader}>بيانات الشحن</h1>
                <form action="">
                    <div className={styles.inputArea} >
                        <input type="text" value={fullName} onChange={(e) => { setFullName(() => {return e.target.value}) } } className={styles.inputField} id="fullname" />
                        <label htmlFor="fullname" className={styles.label} >الاسم بالكامل</label>
                    </div>
                    <div className={styles.inputArea} >
                        <input type="text" value={phoneNumber} onChange={(e) => { setPhoneNumber(() => e.target.value) } } className={styles.inputField} id="phoneNumber" />
                        <label htmlFor="phoneNumber" className={styles.label} >رقم المحمول</label>
                    </div>
                    <div className={styles.inputArea} >
                        <input type="text" value={province} onChange={(e) => { setProvince(() => e.target.value) } } className={styles.inputField} id="governorate" />
                        <label htmlFor="governorate" className={styles.label} >المحافظة</label>
                    </div>
                    <div className={styles.inputArea} >
                        <input type="text" value={address} onChange={(e) => { setAddress(() => e.target.value) } } className={styles.inputField} id="address" />
                        <label htmlFor="address" className={styles.label} >العنوان</label>
                    </div>
                    <div className={styles.inputArea} >
                        <input type="email" value={email} onChange={(e) => { setEmail(() => e.target.value) } } className={styles.inputField} id="email" />
                        <label htmlFor="email" className={styles.label} >البريد الالكتروني</label>
                    </div>
                    <div className={styles.inputArea} >
                        <input type="text" value={description} onChange={(e) => { setDescription(() => e.target.value) } } className={styles.inputField} id="description" />
                        <label htmlFor="description" className={styles.label} >معلومات اضافية - مقاس - حجم (اختياري)</label>
                    </div>
                    <div className={styles.inputArea} >
                        <input type="text" value={salesManCode} onChange={(e) => { setSalesManCode(() => e.target.value) } } className={styles.inputField} id="salesmanCode" />
                        <label htmlFor="salesmanCode" className={styles.label} >كود المسوق (اختياري)</label>
                    </div>
                    <a onClick={(e)=> submitOrder(e,{
                    customerName: fullName,
                    fullAddress: address,
                    phoneNumber,
                    province,
                    description,
                    email,
                    products: products.map(el => {
                        return {
                            productId: el.productId,
                            productName: el.productName,
                            productQuantity: el.productQuantity,
                            productPrice: el.productPrice,
                            productPicture: el.productPicture
                        }
                    }),
                    salesmanCode: salesManCode

                },token )} className={styles.cta} ><span><img src={arrow} className={styles.ctaArrow}  /></span>ارسال الطلب</a>
                {error.isError ? <p style={{color: 'red', fontSize: '1.7rem'}} >{error.errorMessage}</p> : ''}
                </form>
            </div>
            <div className={styles.purchaseInfoSection}>
                {products.length === 0? <></>: productCards}
                <h3 className={styles.totalPaid} >:اجمالي المدفوعات <span><span>ج</span>{ products.length === 0? 0:products.map(el => el.productPrice* el.productQuantity).reduce(reducer) }</span> </h3>
            </div>
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        clearCart: () => dispatch({type: 'CLEAR'}),
        showMessage: () => dispatch({type: 'SHOW_MESSAGE', payload: 'تم ارسال الطلب'}),
        hideMessage: () => dispatch({type: 'HIDE_MESSAGE'}),
    }
}

const mapStateToProps = state => {
    return {
        cart: state.cart,
        token: state.userAuth.token,
        boughtItem: state.boughtItem,
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(Index)


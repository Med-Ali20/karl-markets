import React from 'react'
import passwordIcon from '../../assets/icons/padlock.png'
import emailIcon from '../../assets/icons/envelope.png'
import arrow from '../../assets/icons/arrow.png'
import styles from './styles/login.module.css'
import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Index = ({ setUserAuthentication, cart, boughtItem, isAuthenticated }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)
    const navigate = useNavigate()
    
    useEffect(() => {
        if(isAuthenticated) {
            navigate('/user-dashboard', { replace: true })
        }
    },[])

    const submitAccount = (e, email, password) => {
        e.preventDefault()
        setError(false)
        const requestBody = {email, password}
        axios.post(`/login`,requestBody).then(res => {
            const payload = {
                userName: res.data.user.userName,
                email: res.data.user.email,
                id: res.data.user._id,
                token: res.data.token    
            }
            setUserAuthentication(payload)
            localStorage.setItem('token', payload.token)
            localStorage.setItem('email', payload.email)
            localStorage.setItem('userName', payload.userName)
            localStorage.setItem('id', payload.id)
            localStorage.setItem('isUserAuthenticated', true)
            
            if(boughtItem.isProduct){
                return navigate('/shipping-info', { replace: true })
            }

            if(cart.products.length !== 0){
                return navigate('/purchase-info', { replace: true })
            }

            else {
                return navigate('/', { replace: true })
            }
        }).catch(e => {
            setError(true)
        })

    }


    return (
        <div className={styles.loginSection} >
            <h1 className={styles.loginHeader} >تسجيل الدخول</h1>
            <form action="" className={styles.loginForm} >
                <div className={styles.emailField} >
                    <div className={styles.emailInput} >
                        <input type="text" id="email" className={styles.inputField}  value={email} onChange={e => setEmail(() => e.target.value)}  />
                        <div><img src={emailIcon}  className={styles.img}  /></div> 
                    </div>
                    <label htmlFor="email" className={styles.label} >البريد الالكتروني</label>     
                </div>
                <div className={styles.passwordField} >
                    <div className={styles.passwordInput} >
                        <input type="password" id="password" className={styles.inputField} value={password} onChange={e => setPassword(() => e.target.value)} />
                        <div><img src={passwordIcon} className={styles.img}  /></div> 
                    </div>
                    <label htmlFor="password" className={styles.label} >كلمة السر</label>     
                </div>
                <a href="#" onClick={e => submitAccount(e, email, password)} className={styles.cta} ><img src={arrow}  className={styles.ctaArrow} />تسجيل الدخول</a>
                {error ? <p className={styles.error} style={{color: 'red', fontSize: '1.6rem'}} >خطأ في تسجيل الدخول</p> : ''}
            </form>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        cart: state.cart,
        boughtItem: state.boughtItem,
        isAuthenticated: state.userAuth.isAuthenticated
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setUserAuthentication: (payload) => dispatch({type: 'USER_AUTHENTICATION', payload})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Index)


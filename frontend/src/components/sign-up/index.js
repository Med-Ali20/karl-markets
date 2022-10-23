import React from 'react'
import userIcon from '../../assets/icons/user-a.png'
import passwordIcon from '../../assets/icons/padlock.png'
import emailIcon from '../../assets/icons/envelope.png'
import arrow from '../../assets/icons/arrow.png'
import styles from './styles/signUp.module.css'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'


const Index = ( { setUserAuthentication, cart, boughtItem, isAuthenticated } ) => {
    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [error, setError] = useState({isError: false, message: ''})
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        if(isAuthenticated) {
            navigate('/user-dashboard', { replace: true })
        }
    },[])

    const submitNewAccount = (e, userName, email, password) => {
        e.preventDefault()
        setError({isError: false, message: ''})
        const requestBody = {username: userName, email, password}

        if(password.length < 7) {
            return setError({isError: true, message: 'كلمة السر 7 خانات او اكثر'})
        }

        if(userName.length < 3) {
            return setError({isError: true, message: 'اسم المستخدم 3 خانات او اكثر'})
        }

        if(email.length === 0) { return setError({isError: true, message: 'برجاء ادخال البريد الالكتروني'})}

        axios.post(`/users`,requestBody).then(res => {
            const payload = {
                username: res.data.newUser.userName,
                email: res.data.newUser.email,
                id: res.data.newUser._id,
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

            return navigate('/', { replace: true })
            
        }).catch(error => {
            console.log(error)
            if(error.response.data.message === 'User validation failed: email: Email is invalid') {
                return setError({isError: true, message: 'برجاء ادخال بريد الكتروني صحيح'})
            }
        })

    }


    return (
        <div className={styles.signUpSection} >
            <h1 className={styles.signUpHeader} >انشاء حساب</h1>
            <form action="" className={styles.signUpForm} >
                <div className={styles.userNameField} >
                    <div className={styles.userNameInput} >
                        <input type="text" value={userName} onChange={e => setUserName(() => e.target.value)} id="username"  className={styles.inputField} />
                        <div><img src={userIcon}  className={styles.img} /></div> 
                    </div>
                    <label htmlFor="username" className={styles.label} >اسم المستخدم</label>     
                </div>
                <div className={styles.emailField} >
                    <div className={styles.emailInput} >
                        <input type="text" id="email" value={email} onChange={e => setEmail(() => e.target.value)} className={styles.inputField} />
                        <div ><img src={emailIcon} className={styles.img} /></div> 
                    </div>
                    <label htmlFor="email" className={styles.label} >البريد الالكتروني</label>     
                </div>
                <div className={styles.passwordField} >
                    <div className={styles.passwordInput} >
                        <input type="password" id="password" value={password} onChange={e => setPassword(() => e.target.value)} className={styles.inputField} />
                        <div ><img src={passwordIcon} className={styles.img} /></div> 
                    </div>
                    <label htmlFor="password" className={styles.label} >كلمة السر</label>     
                </div>
                <a onClick={(e) => submitNewAccount(e, userName, email, password)} className={styles.cta} ><span ><img src={arrow} className={styles.ctaArrow} /></span>انشاء حساب</a>
                <Link to="/login" className={styles.alreadyUser} style={{color: 'orange', fontSize: '1.6rem', marginTop: '1rem'}} >لديك حساب؟ نسجيل الدخول</Link>
                {error.isError ? <p className={styles.error} style={{color: 'red', fontSize: '1.6rem'}} >{error.message}</p> : ''}
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
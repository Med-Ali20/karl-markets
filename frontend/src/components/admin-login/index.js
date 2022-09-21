import React from 'react'
import passwordIcon from '../../assets/icons/padlock.png'
import emailIcon from '../../assets/icons/envelope.png'
import arrow from '../../assets/icons/arrow.png'
import { useState } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import styles from './styles/login.module.css'
import { useNavigate } from 'react-router-dom'

const Index = ({ setAdminAuthentication }) => {
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)
    const navigate = useNavigate()
    const submitAccount = (e, name, password) => {
        e.preventDefault()
        const requestBody = {name, password}
        axios.post(`/admin`,requestBody).then(res => {
            const payload = {
                token: res.data.token,
                rank: res.data.admin.rank,
                name: res.data.admin.name,
                id: res.data.admin._id
            }
            setAdminAuthentication(payload)
            localStorage.setItem('token', payload.token)
            localStorage.setItem('rank', payload.rank)
            localStorage.setItem('name', payload.name)
            localStorage.setItem('id', payload.id)
            localStorage.setItem('isAuthenticated', true)
            
            navigate('/admin-dashboard', { replace: true })
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
                        <input type="text" value={name} onChange={e => setName(() => e.target.value)} id="email" className={styles.inputField} />
                        <div><img src={emailIcon}  className={styles.img}  /></div> 
                    </div>
                    <label htmlFor="email" className={styles.label} >الاسم</label>     
                </div>
                <div className={styles.passwordField} >
                    <div className={styles.passwordInput} >
                        <input type="password"  value={password} onChange={e => setPassword(() => e.target.value)} id="password" className={styles.inputField} />
                        <div ><img src={passwordIcon} className={styles.img} /></div> 
                    </div>
                    <label htmlFor="password" className={styles.label} >كلمة السر</label>     
                </div>
                <a onClick={e => submitAccount(e, name, password)} className={styles.cta} >تسجيل الدخول</a>
                {error ? <p className={styles.error} style={{color: 'red', fontSize: '1.6rem'}} >خطأ في تسجيل الدخول</p> : ''}
            </form>
            
        </div>
    )
}


const mapDispatchToProps = dispatch => {
    return {
        setAdminAuthentication: (payload) => dispatch({type: 'ADMIN_AUTHENTICATION', payload})
    }
}

export default connect(null, mapDispatchToProps)(Index)

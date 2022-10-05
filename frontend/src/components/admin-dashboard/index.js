import React from 'react'
import arrow from '../../assets/icons/arrow.png'
import styles from './styles/admin-dashboard.module.css'
import { useState, useRef } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Spinner } from '../../utils/Spinner'

const Index = ({ token, showMessage, hideMessage }) => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [productName, setProductName] = useState('')
    const [category, setCategory] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    const [productPicture, setProductPicture] = useState("")
    const [extraImage1, setExtraImage1] = useState("")
    const [extraImage2, setExtraImage2] = useState("")
    const [extraImage3, setExtraImage3] = useState("")
    const [extraImage4, setExtraImage4] = useState("")
    const pictureRef = useRef()
    const image1 = useRef()
    const image2 = useRef()
    const image3 = useRef()
    const image4 = useRef()

    const FD = new FormData()
    FD.append('productName', productName)
    FD.append('categoryName', category)
    FD.append('productPrice', price)
    FD.append('productDescription', description)
    FD.append('photos', productPicture)
    FD.append('photos', extraImage1)
    FD.append('photos', extraImage2)
    FD.append('photos', extraImage3)
    FD.append('photos', extraImage4)

    const shipProduct = (e, form, token) => {
        e.preventDefault()
        setLoading(true)
        setError(false)
        axios.post('/product',form, {
            headers: {
                Authorization: token
            }
        }).then(res => {
            setLoading(false)
            setProductName('');
            setCategory('');
            setPrice('');
            setDescription('')
            setProductPicture(null)
            pictureRef.current.value = ''
            image1.current.value=''
            image2.current.value=''
            image3.current.value=''
            image4.current.value=''
            showMessage()
            setTimeout(hideMessage, 3000)
        }).catch(e => {
            setError(true)
            setLoading(false)
        })
    }


    return (
        <div className={styles.adminDashboard} >
            { loading ? <div className={styles.loadingScreen}> <Spinner /> </div>: ''}
            <div className={styles.formSection} >
                <h1 className={styles.formHeader}>اضافة منتج</h1>
                <form name="photos" encType="multipart/form-data" onSubmit={(e) => shipProduct(e, FD, token)}  >

                    <div className={styles.inputArea} >
                        <input type="text" value={productName} onChange={e => setProductName(() => e.target.value)} className={styles.inputField} id="name" />
                        <label htmlFor="name" className={styles.label} >اسم المنتج</label>
                    </div>
                    
                    <div className={styles.inputArea} >
                        <input type="text" value={category} onChange={e => setCategory(() => e.target.value)} className={styles.inputField} id="category" />
                        <label htmlFor="category" className={styles.label} >الفئة</label>
                    </div>
                    
                    <div className={styles.inputArea} >
                        <input type="text" value={price} onChange={e => setPrice(() => e.target.value)} className={styles.inputField} id="price" />
                        <label htmlFor="price" className={styles.label} >السعر</label>
                    </div>
                    
                    <div className={styles.inputArea} >

                        <input type="text" value={description} onChange={e => setDescription(() => e.target.value)} className={styles.inputField} id="description" />
                        <label htmlFor="description" className={styles.label} >وصف المنتج</label>
                    </div>
                
                    <div className={styles.inputArea} >
                        <input type="file" accept=".png, .jpg, .jpeg" name="photos" onChange={e => setProductPicture(() => e.target.files[0])} ref={pictureRef}  className={styles.fileInput} id="picture" />
                        <label htmlFor="picture" className={styles.label} > صورة المنتج</label>
                    </div>
                    
                
                    <div className={styles.inputArea} >
                        <input type="file" accept=".png, .jpg, .jpeg" name="photos" onChange={e => setExtraImage1(() => e.target.files[0])} ref={image1}  className={styles.fileInput} id="picture1" />
                        <label htmlFor="picture1" className={styles.label} >صورة اضافية 1</label>
                    </div>
                    
                
                    <div className={styles.inputArea} >
                        <input type="file" accept=".png, .jpg, .jpeg" name="photos" onChange={e => setExtraImage2(() => e.target.files[0])} ref={image2} className={styles.fileInput} id="picture2" />
                        <label htmlFor="picture2" className={styles.label} >صورة اضافية 2</label>
                    </div>
                    
                
                    <div className={styles.inputArea} >
                        <input type="file" accept=".png, .jpg, .jpeg" name="photos" onChange={e => setExtraImage3(() => e.target.files[0])} ref={image3} className={styles.fileInput} id="picture3" />
                        <label htmlFor="picture3" className={styles.label} >صورة اضافية 3</label>
                    </div>
                    
                
                    <div className={styles.inputArea} >
                        <input type="file" accept=".png, .jpg, .jpeg" name="photos" onChange={e => setExtraImage4(() => e.target.files[0])} ref={image4} className={styles.fileInput} id="picture4" />
                        <label htmlFor="picture4" className={styles.label} >صورة اضافية 4</label>
                    </div>
                    
                    <button type="submit" className={styles.cta} > اضف المنتج </button>
                    { error ? <p style={{fontSize: '2rem', color: 'red',textAlign: 'right', paddingRight: '1rem'}} >خطأ في اضافة المنتج</p> : ''}
                    <Link to="/orders" className={styles.cta} style={{background: '#1fc739'}} >عرض الطلبات</Link>
                </form>
                
            </div>
        </div>
    )
}



const mapStateToProps = state => {
    return {
         token: state.adminAuth.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        showMessage: () => dispatch({type: 'SHOW_MESSAGE', payload: 'تم اضافة المنتج'}),
        hideMessage: () => dispatch({type: 'HIDE_MESSAGE'})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Index)
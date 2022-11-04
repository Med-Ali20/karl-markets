import React from 'react'
import * as filestack from 'filestack-js'
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
    const [category, setCategory] = useState('أدوات منزلية')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    const [productPicture, setProductPicture] = useState("")
    const [extraImage1, setExtraImage1] = useState("")
    const [extraImage2, setExtraImage2] = useState("")
    const [extraImage3, setExtraImage3] = useState("")
    const [extraImage4, setExtraImage4] = useState("")

    const FD = new FormData()
    FD.append('productName', productName)
    FD.append('categoryName', category)
    FD.append('productPrice', price)
    FD.append('productDescription', description)
    FD.append('productPicture', productPicture)
    FD.append('extraImage1', extraImage1)
    FD.append('extraImage2', extraImage2)
    FD.append('extraImage3', extraImage3)
    FD.append('extraImage4', extraImage4)
    const modalLinksSet1 = ['أدوات منزلية','ملابس','اكسسوارات موبايل','عناية شخصية','أحذية','ساعات','الساعات الذكيه','مستلزمات كمبيوتر']
    const modalLinksSet2 = ['عروض حصرية','أجهزة إلكترونية صغيرة','العاب','شنط و محافظ','مستحضرات تجميل','مفروشات','مستلزمات أطفال','مستلزمات طبية']
    const modalLinksSet3 = ['مستلزمات الحيوانات الأليفة','اكسسوارات سيارات','مكن حلاقة','معدات صيانه','مراوح و مكييفات','Gaming']
    const menuLinksSet = [...modalLinksSet1,...modalLinksSet2,...modalLinksSet3]

    const uploadImage = (e, setState) => {
        e.preventDefault()
        const client = filestack.init('AF9ysaTqQ8o6usQFiMndgz')
        client.picker({imageMax: [350, 350], maxFiles: 1, onUploadDone: res => {
            setState(res.filesUploaded[0].url)
        }}).open()
    }

    const shipProduct = (e, form, token) => {
        e.preventDefault()
        setLoading(true)
        setError(false)
        axios.post('/product',form, {
            headers: {
                Authorization: token
            }
        }).then(res => {
            console.log(res)
            setLoading(false)
            setProductName('');
            setCategory('');
            setPrice('');
            setDescription('')
            setProductPicture(null)
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
                        <select name="category" id="category" onChange={e => setCategory(e.target.value)} className={styles.inputField}>
                            {menuLinksSet.map(el => <option key={el} value={el}> {el} </option>)}
                        </select>
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
                        <input type="submit" value="صورة المنتج" className={styles.imageInput} id="picture" onClick={(e) => uploadImage(e, setProductPicture)} />
                        {productPicture? <span style={{color: 'green', fontSize: '1.6rem'}} >تم اضافة الصورة</span> : ''}
                        <label htmlFor="picture" className={styles.label} > صورة المنتج</label>
                    </div>
                    
                
                    <div className={styles.inputArea} >
                        <input type="submit" value="صورة اضافية 1" className={styles.imageInput} id="picture1" onClick={(e) => uploadImage(e, setExtraImage1)} />
                        {extraImage1? <span style={{color: 'green', fontSize: '1.6rem'}} >تم اضافة الصورة</span> : ''}
                        <label htmlFor="picture1" className={styles.label} >صورة اضافية 1</label>
                    </div>
                    
                
                    <div className={styles.inputArea} >
                        <input type="submit" value="صورة اضافية 2"  className={styles.imageInput} id="picture2" onClick={(e) => uploadImage(e, setExtraImage2)} />
                        {extraImage2? <span style={{color: 'green', fontSize: '1.6rem'}} >تم اضافة الصورة</span> : ''}
                        <label htmlFor="picture2" className={styles.label} >صورة اضافية 2</label>
                    </div>
                    
                
                    <div className={styles.inputArea} >
                        <input type="submit" value="صورة اضافية 3"  className={styles.imageInput} id="picture3" onClick={(e) => uploadImage(e, setExtraImage3)} />
                        {extraImage3? <span style={{color: 'green', fontSize: '1.6rem'}} >تم اضافة الصورة</span> : ''}
                        <label htmlFor="picture3" className={styles.label} >صورة اضافية 3</label>
                    </div>
                    
                
                    <div className={styles.inputArea} >
                        <input type="submit" value="صورة اضافية 4"  className={styles.imageInput} id="picture4" onClick={(e) => uploadImage(e, setExtraImage4)} />                        
                        {extraImage4? <span style={{color: 'green', fontSize: '1.6rem'}} >تم اضافة الصورة</span> : ''}
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
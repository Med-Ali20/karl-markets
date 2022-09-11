import React from 'react'
import arrow from '../../assets/icons/arrow.png'
import styles from './styles/admin-dashboard.module.css'
import { useState } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const Index = ({ token }) => {
    const [productName, setProductName] = useState('')
    const [category, setCategory] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    const [productPicture, setProductPicture] = useState(null)
    const [extraImage1, setExtraImage1] = useState(null)
    const [extraImage2, setExtraImage2] = useState(null)
    const [extraImage3, setExtraImage3] = useState(null)
    const [extraImage4, setExtraImage4] = useState(null)

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
        axios.post('/product',form, {
            headers: {
                Authorization: token
            }
        }).then(res => {
        })
    }


    return (
        <div className={styles.adminDashboard} >
            <div className={styles.formSection} >
                <h1 className={styles.formHeader}>اضافة منتج</h1>
                <form name="photos" encType="multipart/form-data" onSubmit={(e) => shipProduct(e, FD, token)}  >
                    <input type="text" value={productName} onChange={e => setProductName(() => e.target.value)} className={styles.inputField} id="name" />
                    <label htmlFor="name" className={styles.label} >اسم المنتج</label>
                    

                    <input type="text" value={category} onChange={e => setCategory(() => e.target.value)} className={styles.inputField} id="category" />
                    <label htmlFor="category" className={styles.label} >الفئة</label>
                    

                    <input type="text" value={price} onChange={e => setPrice(() => e.target.value)} className={styles.inputField} id="price" />
                    <label htmlFor="price" className={styles.label} >السعر</label>
                    

                    <input type="text" value={description} onChange={e => setDescription(() => e.target.value)} className={styles.inputField} id="description" />
                    <label htmlFor="description" className={styles.label} >وصف المنتج</label>
                

                    <input type="file" accept=".png, .jpg, .jpeg" name="photos" onChange={e => setProductPicture(() => e.target.files[0])} className={styles.fileInput} id="picture" />
                    <label htmlFor="picture" className={styles.label} > صورة المنتج</label>
                    
                

                    <input type="file" accept=".png, .jpg, .jpeg" name="photos" onChange={e => setExtraImage1(() => e.target.files[0])} className={styles.fileInput} id="picture1" />
                    <label htmlFor="picture1" className={styles.label} >صورة اضافية 1</label>
                    
                

                    <input type="file" accept=".png, .jpg, .jpeg" name="photos" onChange={e => setExtraImage2(() => e.target.files[0])} className={styles.fileInput} id="picture2" />
                    <label htmlFor="picture2" className={styles.label} >صورة اضافية 2</label>
                    
                

                    <input type="file" accept=".png, .jpg, .jpeg" name="photos" onChange={e => setExtraImage3(() => e.target.files[0])} className={styles.fileInput} id="picture3" />
                    <label htmlFor="picture3" className={styles.label} >صورة اضافية 3</label>
                    
                

                    <input type="file" accept=".png, .jpg, .jpeg" name="photos" onChange={e => setExtraImage4(() => e.target.files[0])} className={styles.fileInput} id="picture4" />
                    <label htmlFor="picture4" className={styles.label} >صورة اضافية 4</label>
                    
                    <button type="submit" > اضف المنتج </button>
                </form>
                
            </div>
            <span style={{textAlign: 'center', fontSize: '1.6rem', color: '#FFA62B', display:'block', margin:' 2rem auto'}}><Link to="/orders" >عرض الطلبات</Link></span>
        </div>
    )
}



const mapStateToProps = state => {
    return {
         token: state.adminAuth.token
    }
}

export default connect(mapStateToProps)(Index)
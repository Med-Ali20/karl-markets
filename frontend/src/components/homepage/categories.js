import React from 'react'
import styles from './categories.module.css'
import { Link } from 'react-router-dom'
/* eslint-disable */
export default function categories() {
    return (
        <section className={styles.categories} >
            <Link to="categories/ملابس" >
                <div className={`${styles.category} ${styles.category1}`}>
                    <h1 className={`${styles.categoryName} ${styles.categoryName1}`} > ملابس</h1>
                </div>
            </Link>
            <Link to="categories/شنط و محافظ" >
                <div className={`${styles.category} ${styles.category2}`}>
                    <h1 className={`${styles.categoryName} ${styles.categoryName2}`} > شنط و محافظ </h1>
                </div>
            </Link>
            <Link to="categories/مستلزمات عناية شخصية" >
                <div className={`${styles.category} ${styles.category3}`}>
                    <h1 className={`${styles.categoryName} ${styles.categoryName3}`} > مستلزمات عناية شخصية </h1>
                </div>
            </Link>
            <Link to="categories/مستلزمات الحيوانات الأليفة" >
                <div className={`${styles.category} ${styles.category4}`}>
                    <h1 className={`${styles.categoryName} ${styles.categoryName4}`} > مستلزمات الحيوانات الأليفة </h1>
                </div>
            </Link>
            <Link to="categories/الساعات الذكيه" >
                <div className={`${styles.category} ${styles.category5}`}>
                    <h1 className={`${styles.categoryName} ${styles.categoryName5}`} > الساعات الذكية </h1>
                </div>
            </Link>
            <Link to="categories/مفروشات" >
                <div className={`${styles.category} ${styles.category6}`}>
                    <h1 className={`${styles.categoryName} ${styles.categoryName6}`} > مفروشات </h1>
                </div>
            </Link>
            <Link to="categories/اكسسوارات موبايل" >
                <div className={`${styles.category} ${styles.category7}`}>
                    <h1 className={`${styles.categoryName} ${styles.categoryName7}`} >اكسسوارات موبايل</h1>
                </div>
            </Link>
            <Link to="categories/مستلزمات كمبيوتر" >
                <div className={`${styles.category} ${styles.category8}`}>
                    <h1 className={`${styles.categoryName} ${styles.categoryName8}`} > اكسسوارات الكمبيوتر </h1>
                </div>
            </Link>
        </section>
    )
}

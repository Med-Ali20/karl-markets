import React from 'react'
import background from '../../assets/images/background-shopping-bags.png'
import icon from '../../assets/icons/shopping-bag.png'
import styles from './allProducts.module.css'

export default function allProducts() {
    return (
        <div className={styles.allProducts} >
            <img src={background} className={styles.background} />
            <a href="#" className={styles.cta} ><img src={icon}  className={styles.icon}  /> <span className={styles.linkText} >عرض كل المنتجات</span> </a>
        </div>
    )
}

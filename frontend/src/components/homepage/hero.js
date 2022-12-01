import React from 'react'
import styles from './hero.module.css'
import heroBackgroundImg from '../../assets/images/hero-img.png'
import hero1 from '../../assets/images/hero1.jpg'
import hero2 from '../../assets/images/hero2.jpg'
import hero3 from '../../assets/images/hero3.jpg'
import hero4 from '../../assets/images/hero4.jpg'
import arrow from '../../assets/icons/arrow.png'
import { Link } from 'react-router-dom'
import { useState } from 'react'
/* eslint-disable */


export default function Hero() {
    
    const [counter, setCounter] = useState(0)

    const clickPrev = () => {

        setCounter(prevCounter => {
            if(prevCounter === 0) return 0
            return prevCounter -1
        })
        
    }

    const clickNext = () => {

        setCounter(prevCounter => {
            if(prevCounter === 3) return 3
            return prevCounter +1
        })

    }


    return (
        <div className={styles.hero}>
            <div className={styles.prev} onClick={clickPrev}></div>
            <div className={styles.heroGallery} style={{transform: `translateX(${window.screen.width <= 600 ? -13.4*counter : -20*counter}%)`}} >
                <div className={styles.galleryItem} >
                    <div className={`${styles.galleryItemBackground} ${styles.galleryItemBackground1}`} >
                        <img src={heroBackgroundImg}  className={styles.heroBackgroundImg} alt=""/>
                        <div className={styles.galleryItemText} >
                            <h1 className={styles.galleryHeader} >عروضنا المفضلة</h1>
                            <h2 className={`${styles.galleryProductName} ${styles.galleryProductName1} `} >قميص وبنطلون كلاسيك</h2>
                            <Link to="/product/63803fdacdc80495d8958a3d" className={styles.galleryCta} ><span><img src={arrow} className={styles.ctaArrow}  alt=""/></span>اطلب الان</Link>
                        </div>
                    </div>
                    <img src={hero1}  className={styles.galleryProductPicture}  alt="" />
                </div>
                <div className={styles.galleryItem} >
                    <div className={`${styles.galleryItemBackground} ${styles.galleryItemBackground2}`} >
                        <img src={heroBackgroundImg}  className={styles.heroBackgroundImg} alt=""/>
                        <div className={styles.galleryItemText} >
                            <h1 className={styles.galleryHeader} >عروضنا المفضلة</h1>
                            <h2 className={`${styles.galleryProductName} ${styles.galleryProductName2} `} >عرض اربع قطع بنطلون  { window.screen.width > 600 ? <br /> : ''}بنجالين</h2>
                            <Link to="/product/632b3f9b21d7973a29562559" className={styles.galleryCta} ><span><img src={arrow} className={styles.ctaArrow}  alt=""/></span>اطلب الان</Link>
                        </div>
                    </div>
                    <img src={hero2}  className={styles.galleryProductPicture}  alt="" />
                </div>
                <div className={styles.galleryItem} >
                    <div className={`${styles.galleryItemBackground} ${styles.galleryItemBackground3}`} >
                        <img src={heroBackgroundImg}  className={styles.heroBackgroundImg} alt=""/>
                        <div className={styles.galleryItemText} >
                            <h1 className={styles.galleryHeader} >عروضنا المفضلة</h1>
                            <h2 className={styles.galleryProductName} >عرض قطعتين هاي كول { window.screen.width > 600 ? <br /> : ''}رجالي</h2>
                            <Link to="/product/632b503a21d7973a2956263d" className={styles.galleryCta} ><span><img src={arrow} className={styles.ctaArrow}  alt=""/></span>اطلب الان</Link>
                        </div>
                    </div>
                    <img src={hero3}  className={styles.galleryProductPicture}  alt="" />
                </div>
                <div className={styles.galleryItem} >
                    <div className={`${styles.galleryItemBackground} ${styles.galleryItemBackground4}`} >
                        <img src={heroBackgroundImg}  className={styles.heroBackgroundImg} alt=""/>
                        <div className={styles.galleryItemText} >
                            <h1 className={styles.galleryHeader} >عروضنا المفضلة</h1>
                            <h2 className={styles.galleryProductName} >Smart Watch t55 Plus</h2>
                            <Link to="/product/632b2a0b4cb8a1fe67375ff0" className={styles.galleryCta} ><span><img src={arrow} className={styles.ctaArrow}  alt=""/></span>اطلب الان</Link>
                        </div>
                    </div>
                    <img src={hero4}  className={styles.galleryProductPicture}  alt="" />
                </div>
                
            </div>
            <div className={styles.next} onClick={clickNext}></div>
        </div>
    )
}

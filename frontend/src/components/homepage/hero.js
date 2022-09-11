import React from 'react'
import styles from './hero.module.css'
import heroBackgroundImg from '../../assets/images/hero-img.png'
import airpods from '../../assets/images/airpods.png'
import arrow from '../../assets/icons/arrow.png'
import { useState, useEffect } from 'react'


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
                    <div className={styles.galleryItemBackground} >
                        <img src={heroBackgroundImg}  className={styles.heroBackgroundImg} alt=""/>
                        <div className={styles.galleryItemText} >
                            <h1 className={styles.galleryHeader} >عروضنا المفضلة</h1>
                            <h2 className={styles.galleryProductName} >Airpods i11 +  Smart Watch M4 band </h2>
                            <a href="#" className={styles.galleryCta} ><span><img src={arrow} className={styles.ctaArrow}  alt=""/></span>اطلب الان</a>
                        </div>
                    </div>
                    <img src={airpods}  className={styles.galleryProductPicture}  alt="" />
                </div>
                <div className={styles.galleryItem} >
                    <div className={styles.galleryItemBackground} >
                        <img src={heroBackgroundImg}  className={styles.heroBackgroundImg} alt=""/>
                        <div className={styles.galleryItemText} >
                            <h1 className={styles.galleryHeader} >عروضنا المفضلة</h1>
                            <h2 className={styles.galleryProductName} >Airpods i11 +  Smart Watch M4 band </h2>
                            <a href="#" className={styles.galleryCta} ><span><img src={arrow} className={styles.ctaArrow}  alt=""/></span>اطلب الان</a>
                        </div>
                    </div>
                    <img src={airpods}  className={styles.galleryProductPicture}  alt="" />
                </div>
                <div className={styles.galleryItem} >
                    <div className={styles.galleryItemBackground} >
                        <img src={heroBackgroundImg}  className={styles.heroBackgroundImg} alt=""/>
                        <div className={styles.galleryItemText} >
                            <h1 className={styles.galleryHeader} >عروضنا المفضلة</h1>
                            <h2 className={styles.galleryProductName} >Airpods i11 +  Smart Watch M4 band </h2>
                            <a href="#" className={styles.galleryCta} ><span><img src={arrow} className={styles.ctaArrow}  alt=""/></span>اطلب الان</a>
                        </div>
                    </div>
                    <img src={airpods}  className={styles.galleryProductPicture}  alt="" />
                </div>
                <div className={styles.galleryItem} >
                    <div className={styles.galleryItemBackground} >
                        <img src={heroBackgroundImg}  className={styles.heroBackgroundImg} alt=""/>
                        <div className={styles.galleryItemText} >
                            <h1 className={styles.galleryHeader} >عروضنا المفضلة</h1>
                            <h2 className={styles.galleryProductName} >Airpods i11 +  Smart Watch M4 band </h2>
                            <a href="#" className={styles.galleryCta} ><span><img src={arrow} className={styles.ctaArrow}  alt=""/></span>اطلب الان</a>
                        </div>
                    </div>
                    <img src={airpods}  className={styles.galleryProductPicture}  alt="" />
                </div>
                
            </div>
            <div className={styles.next} onClick={clickNext}></div>
        </div>
    )
}

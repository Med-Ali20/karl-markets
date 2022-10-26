import React from 'react'
import { useState } from 'react'
import searchIcon from '../../assets/icons/search.png'
import userIcon from '../../assets/icons/user-b.png'
import shoppingCartImage from '../../assets/icons/shopping-cart-b.png'
import logo from '../../assets/icons/logo-1.png'
import styles from './styles/layout.module.css'
import menu from '../../assets/icons/menu-1.png'
import { Link, useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import signUpIcon from '../../assets/icons/sign-up.png'
import logout from '../../assets/icons/logout.png'


const Layout = ({children, isAuthenticated, isAdminAuth, showMessage, messageText, isLoading }) => {
    
    const [modalStyle, setModalStyle] = useState({display: 'none'})
    const [menuBackgroundStyle, setMenuBackgroundStyle] = useState({visibility: 'hidden', opacity:'0', transition: 'all 0.3s'})
    const [menuStyle, setMenuStyle] = useState({transform: 'translateX(-100%)',transition:'transform 0.3s'})
    const [searchParams, setSearchParams] = useState('')
    const navigate = useNavigate()

    const showMenu = () => {
        setMenuStyle(() => {return {transform: 'translateX(0%)',transition:'transform 0.3s'}})
        setMenuBackgroundStyle(() => {return {visibility: 'visible', opacity:'1', transition: 'all 0.3s'}})
        console.log(showMessage)
    }

    const hideMenu = () => {
        setMenuStyle(() => {return {transform: 'translateX(-100%)',transition:'transform 0.3s'}})
        setMenuBackgroundStyle(() => {return {visibility: 'hidden', opacity:'0', transition: 'all 0.3s'}})
    }

    

    const categoryBarLinks = ['أدوات منزلية','ملابس','اكسسوارات موبايل','عناية شخصية','أحذية','ساعات','الساعات الذكيه']
    const modalLinksSet1 = ['أدوات منزلية','ملابس','اكسسوارات موبايل','عناية شخصية','أحذية','ساعات','الساعات الذكيه','مستلزمات كمبيوتر']
    const modalLinksSet2 = ['عروض حصرية','أجهزة إلكترونية صغيرة','العاب','شنط و محافظ','مستحضرات تجميل','مفروشات','مستلزمات أطفال','مستلزمات طبية']
    const modalLinksSet3 = ['مستلزمات الحيوانات الأليفة','اكسسوارات سيارات','مكن حلاقة','معدات صيانه','مراوح و مكييفات','Gaming']
    const menuLinksSet = [...modalLinksSet1,...modalLinksSet2,...modalLinksSet3]
    const categoryList = categoryBarLinks.map(el => { return <Link to={`/categories/${el}`} key={el} style={{pointerEvents: isLoading ? 'none' : ''}}  ><p className={styles.categoryBarLink} >  {el} </p></Link> })
    const modalList1 = modalLinksSet1.map(el => {return <Link to={`/categories/${el}`} key={el} style={{pointerEvents: isLoading ? 'none' : ''}}  className={styles.modalLink} >{el}</Link>})
    const modalList2 = modalLinksSet2.map(el => {return <Link to={`/categories/${el}`} key={el} style={{pointerEvents: isLoading ? 'none' : ''}}  className={styles.modalLink} >{el}</Link>})
    const modalList3 = modalLinksSet3.map(el => {return <Link to={`/categories/${el}`} key={el} style={{pointerEvents: isLoading ? 'none' : ''}}  className={styles.modalLink} >{el}</Link>})
    const menuList = menuLinksSet.map(el => <Link to={`/categories/${el}`} key={el}  onClick={() => {hideMenu()}} style={{pointerEvents: isLoading ? 'none' : ''}}  className={styles.modalLink} >{el}</Link>)

    const searchProduct = (e) => {
        e.preventDefault()
        if(searchParams === '') return;
        navigate(`/categories/search/${searchParams}`)
        setSearchParams('')
    }
    
    const getUserLoggedOut = () => {
        localStorage.clear()
        navigate(0, {replace: true})
    }

    let navLinks

    if(!isAdminAuth) {
        navLinks = (
            <>
                <Link to='/purchase-info'>
                            <li className={`${styles.navLink} ${styles.navLink0}`}>
                                <p className={`${styles.navLinkText} ${styles.navLinkText0}`} >{'السلة'}</p>
                                <div>
                                    <img src={shoppingCartImage} alt="login" className={`${styles.navLinkIcon} ${styles.navLinkIcon1}`} />
                                </div>
                            </li>
                        </Link>
                {/* <Link to={!isAuthenticated ? '/login' : '/user-dashboard'} >
                            <li className={`${styles.navLink} ${styles.navLink1}`} style={!isAuthenticated?{}: {marginLeft:'-2rem'}}>
                                <p className={`${styles.navLinkText} ${styles.navLinkText1}`} >{!isAuthenticated? 'تسجيل الدخول' : 'حسابي'}</p>
                                <div>
                                    <img src={!isAuthenticated ? userIcon: signUpIcon} alt="login" className={`${styles.navLinkIcon} ${styles.navLinkIcon1}`} />
                                </div>
                            </li>
                        </Link>
                        <Link to={!isAuthenticated? '/sign-up' : ''}>
                            <li className={`${styles.navLink} ${styles.navLink2}`} >
                                <p className={`${styles.navLinkText} ${styles.navLinkText2}`} onClick={isAuthenticated? getUserLoggedOut : null} > {!isAuthenticated? 'انشاء حساب': 'تسجيل الخروج'} </p>
                                <div>
                                    <img src={!isAuthenticated? signUpIcon : logout} alt="cart" className={`${styles.navLinkIcon} ${styles.navLinkIcon2}`} />
                                </div>
                            </li>
                        </Link> */}
            </>
        )
    } else navLinks = (
        <>
            <Link to='/admin-dashboard'>
                <li className={`${styles.navLink} ${styles.navLink1}`} style={{marginLeft:'-2.5rem'}}>
                    <p className={`${styles.navLinkText} ${styles.navLinkText1}`} >{'Dashboard'}</p>
                    <div>
                        <img src={signUpIcon} alt="login" className={`${styles.navLinkIcon} ${styles.navLinkIcon1}`} />
                    </div>
                </li>
             </Link>
            <Link to="/">
                <li className={`${styles.navLink} ${styles.navLink2}`} >
                    <p className={`${styles.navLinkText} ${styles.navLinkText2}`} onClick={getUserLoggedOut}> تسجيل الخروج  </p>
                    <div>
                        <img src={logout} alt="cart" className={`${styles.navLinkIcon} ${styles.navLinkIcon2}`} />
                    </div>
                </li>
            </Link>
        </>
    )
    
    const style = {transform: `translateY(${showMessage ? 0 : -100}%)`, background: `${messageText === 'لا توجد منتجات للعرض' ? 'grey' : 'rgb(37, 185, 8)'}`}

    let menuLinks 
    if(!isAdminAuth) {
        if(!isAuthenticated) {
             menuLinks = (
                <>
                    <Link to='/login' onClick={hideMenu}  >تسجيل الدخول </Link>
                    <Link to='/sign-up' onClick={hideMenu}  > انشاء حساب </Link>
                    <Link to='/purchase-info' onClick={hideMenu}  > السلة </Link>
                </>
                
            )
        } else {
            menuLinks = ( <>
                    <Link to='/user-dashboard' onClick={hideMenu}  >حسابي </Link>
                    <Link to='/' onClick={() => {getUserLoggedOut(); hideMenu() }}> نسجيل الخروج </Link>
                    <Link to='/purchase-info' onClick={hideMenu}  > السلة </Link>
                </>
                )
        }
    } else {
            menuLinks = ( <>
                <Link to='/admin-dashboard' onClick={hideMenu}  >Dashboard </Link>
                <Link to='/' onClick={() => {getUserLoggedOut(); hideMenu() }}> نسجيل الخروج </Link>
            </>
            )
    }

    return (
        <div className={styles.layout}>
            <span className={styles.message} style={style} >{ messageText }</span>
            <div className={styles.navWrapper} >
                <div className={styles.nav} >
                    <Link to="/"><div > <img src={logo} className={styles.logo} /> </div></Link>
                    <div className={styles.search}>
                    <form className={styles.searchForm} onSubmit={searchProduct}>
                        <input className={styles.searchBar} value={searchParams} onChange={e => setSearchParams(e.target.value)}  type="text" placeholder="البحث عن منتج" />
                    </form>
                        <img className={styles.searchIcon} src={searchIcon} alt="search" />
                    </div>
                    <ul className={styles.navLinks}>
                        {navLinks}
                    </ul>
                    <div> <img src={menu} className={styles.menuIcon} onClick={showMenu}  /> </div>
                </div>
                
            </div>
            <div className={styles.categoryBar} >
                <ul className={styles.categoryList} >
                    <li onMouseEnter={()=>{setModalStyle(()=> {
                        return{display:'flex'}})}}
                        onMouseLeave={()=>{setModalStyle(()=>{
                        return{display:'none'}})}} >
                        <p 
                        className={`${styles.categoryBarLink} ${styles.allCategories}`} 
                         > عرض كل الفئات </p>
                    </li>
                    {categoryList}
                </ul>
                <div className={styles.modal} style={modalStyle}
                    onMouseEnter={()=>{setModalStyle(()=> {
                        return{display:'flex'}})}}
                    onMouseLeave={()=>{setModalStyle(()=>{
                        return{display:'none'}})}} >
                    <div className={styles.modalLinkSet} >
                        {modalList1}
                    </div>
                    <div className={styles.modalLinkSet} >
                        {modalList2}
                    </div>
                    <div className={styles.modalLinkSet} >
                        {modalList3}                    
                    </div>
                </div>
            </div>
            {children}
            <div className={styles.sidebarBackground} style={menuBackgroundStyle} onClick={hideMenu} ></div>   
            <div className={styles.menu} style={menuStyle} >
                <div className={styles.menuNavLinks} >
                    <p className={styles.closingIcon} onClick={hideMenu}>x</p>
                    {menuLinks}
                </div>
                <div className={styles.menuCategoryLinks} >
                    {menuList}        
                </div>
            </div>
        </div>
    )
}


const mapStateToProps = state => {
    return {
        isAuthenticated: state.userAuth.isAuthenticated,
        isAdminAuth: state.adminAuth.isAuthenticated,
        showMessage: state.message.showMessage,
        messageText: state.message.messageText,
        isLoading: state.message.isLoading,
    }
}



export default connect(mapStateToProps)(Layout)

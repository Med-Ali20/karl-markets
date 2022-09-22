import React from 'react'
import {  Routes, Route, Navigate } from 'react-router-dom'
import { connect } from 'react-redux'
import Home from '../components/homepage'
import AdminDashboard from '../components/admin-dashboard'
import AdminLogin from '../components/admin-login'
import Orders from '../components/admin-dashboard/orders'
import Categories from '../components/categories'
import Login from '../components/login'
import Product from '../components/product'
import PurchaseInfo from '../components/purchase-info'
import ShippingInfo from '../components/shipping-info'
import SignUp from '../components/sign-up'
import UserDashboard from '../components/user-dashboard'


const AppRoutes = ({ isAdminAuth, isAuth }) => {
    return(
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin-dashboard" element={isAdminAuth ? <AdminDashboard /> : <Navigate to="/" replace/>} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/orders" element={isAdminAuth ? <Orders /> : <Navigate to="/" replace/>}  />
            <Route path="/categories/products/getAll" element={<Categories />} />
            <Route path="/categories/search/:search" element={<Categories />} />
            <Route path="/categories/:category" element={<Categories />} />
            <Route path="/login" element={<Login />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/purchase-info" element={<PurchaseInfo />} />
            <Route path="/shipping-info" element={isAuth ? <ShippingInfo /> : <Navigate to="/" replace/>} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/user-dashboard" element={isAuth ? <UserDashboard /> : <Navigate to="/" replace/>} />
            <Route path="*" element={<Navigate to="/" ></Navigate>} />

        </Routes>
    )
}

const mapStateToProps = state => {
    return {
        isAdminAuth: state.adminAuth.isAuthenticated,
        isAuth: state.userAuth.isAuthenticated,
    }
}


export default connect(mapStateToProps)(AppRoutes)
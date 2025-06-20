import React from 'react'
import { Route, Routes } from "react-router-dom";
import Login from '../pages/Login';
import Register from '../pages/Register';
import Home from '../pages/Home';
import Cart from '../pages/Cart';
import Checkout from '../pages/Checkout';
import AddProduct from '../AddProduct';

const AppRoutes = () => {
    return (
        <>
            <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/home' element={<Home />} />
                <Route path='/cart' element={<Cart />} />
                <Route path='/checkout' element={<Checkout />} />
                <Route path='/addproduct' element={<AddProduct />} />
                
            </Routes>
        </>
    )
}

export default AppRoutes
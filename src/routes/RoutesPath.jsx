import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import Login from '../page/Login/Login'
import Home from '../page/Home/Home'
import NavBar from '../component/NavBar/NavBar'


const RoutesPath = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={
                    <Login />
                } />
                <Route path='/home' element={
                    <>
                        <NavBar />
                        <Home />
                    </>
                } />
                <Route path='*' element={<Navigate to={'/'} />} />
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesPath
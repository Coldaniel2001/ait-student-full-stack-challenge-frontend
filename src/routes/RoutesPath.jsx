import React, { Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import Login from '../page/Login/Login'
import Home from '../page/Home/Home'
import OnePiece from '../page/OnePiece/OnePiece'
import Pokemon from '../page/Pokemon/Pokemon'
import DragonBall from '../page/DragonBall/DragonBall'

import NavBar from '../component/NavBar/NavBar'

import LoginPrivate from './LoginPrivate'

import UserProvider from '../context/User/UserProvider'
import GilfProvider from '../context/Gilf/GilfProvider'
import SearchProvider from '../context/Search/SearchProvider'

const RoutesPath = () => {
    return (
        <UserProvider>
            <GilfProvider>
                <SearchProvider>
                    <BrowserRouter>
                        <Routes>
                            <Route path='/' element={
                                <LoginPrivate>
                                    <Login />
                                </LoginPrivate>
                            } />
                            <Route path='/home' element={
                                <>
                                    <NavBar />
                                    <Home />
                                </>
                            } />
                            <Route path='/onepiece' element={
                                <>
                                    <NavBar />
                                    <OnePiece />
                                </>
                            } />
                            <Route path='/pokemon' element={
                                <>
                                    <NavBar />
                                    <Pokemon />
                                </>
                            } />
                            <Route path='/dragonball' element={
                                <>
                                    <NavBar />
                                    <DragonBall />
                                </>
                            } />
                            <Route path='*' element={<Navigate to={'/'} />} />
                        </Routes>
                    </BrowserRouter>
                </SearchProvider>
            </GilfProvider>
        </UserProvider>
    )
}

export default RoutesPath
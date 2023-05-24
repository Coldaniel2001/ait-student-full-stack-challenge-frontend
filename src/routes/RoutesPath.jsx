import React, { Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import Login from '../page/Login/Login'
import Home from '../page/Home/Home'
import OnePiece from '../page/OnePiece/OnePiece'
import Pokemon from '../page/Pokemon/Pokemon'
import DragonBall from '../page/DragonBall/DragonBall'

import NavBar from '../component/NavBar/NavBar'

import RoutesPrivate from './RoutesPrivate'
import LoginPrivate from './LoginPrivate'

import UserProvider from '../context/User/UserProvider'
import GilfProvider from '../context/Gilf/GilfProvider'


const RoutesPath = () => {
    return (
        <UserProvider>
            <GilfProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path='/' element={
                            <LoginPrivate>
                                <Login />
                            </LoginPrivate>
                        } />
                        <Route path='/home' element={
                            <RoutesPrivate>
                                <NavBar />
                                <Home />
                            </RoutesPrivate>
                        } />
                        <Route path='/onepiece' element={
                            <RoutesPrivate>
                                <NavBar />
                                <OnePiece />
                            </RoutesPrivate>
                        } />
                        <Route path='/pokemon' element={
                            <RoutesPrivate>
                                <NavBar />
                                <Pokemon />
                            </RoutesPrivate>
                        } />
                        <Route path='/dragonball' element={
                            <RoutesPrivate>
                                <NavBar />
                                <DragonBall />
                            </RoutesPrivate>
                        } />
                        <Route path='*' element={<Navigate to={'/'} />} />
                    </Routes>
                </BrowserRouter>
            </GilfProvider>
        </UserProvider>
    )
}

export default RoutesPath
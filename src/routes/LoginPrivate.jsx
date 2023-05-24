import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'

import UserContext from '../context/User/UserContext'

const LoginPrivate = ({ children }) => {
    const {userLogged} = useContext(UserContext)
  
    return (
        <>
      {!userLogged ? (
        children
      ) : (
        <Navigate to="/home" replace={true} />
      )}
    </>
       
       
    )
}

export default LoginPrivate
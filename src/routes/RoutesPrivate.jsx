import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'

import UserContext from '../context/User/UserContext'

const RoutesPrivate = ({ children }) => {
    const {userLogged} = useContext(UserContext)
  
    return (
        <>
      {/* {userLogged ? (
        children
      ) : (
        <Navigate to="/" replace={true} />
      )} */}
      {children}
    </>
    )
}

export default RoutesPrivate
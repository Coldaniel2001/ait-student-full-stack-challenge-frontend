import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'

const Login = () => {
    const { loginWithRedirect } = useAuth0()
    return (
        <>
            <button className='bg-red-500 h-screen w-full' onClick={() => loginWithRedirect()} >Login</button>
        </>
    )
}

export default Login
import React, { useEffect, useState } from 'react'
import UserContext from './UserContext'
import { useAuth0 } from '@auth0/auth0-react'

const UserProvider = ({ children }) => {
    const { user, getIdTokenClaims } = useAuth0()
    const [userLogged, setUserLogged] = useState("")

    useEffect(() => {
        const createUsers = async () => {
            try {
                if (user) {
                    const token = await getIdTokenClaims();
                    const infoUsers = {
                        name: user.nickname,
                        email: user.email,
                    };

                    const response = await fetch(
                        `${process.env.REACT_APP_SERVER_URL}/users/`,
                        {
                            method: "POST",
                            headers: {
                                Authorization: `Bearer ${token ? token.__raw : "Not Auth"}`,
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(infoUsers),
                        }
                    );
                    const data = await response.json();
                    if (data.status === "OK") {
                        setUserLogged(data.newUser);
                    }
                }
            } catch (error) {
                console.log(error);
            }
        };
        createUsers();

        const getUser = async () => {
            try {
                    const token = await getIdTokenClaims();
                    
                    const response = await fetch(
                        `${process.env.REACT_APP_SERVER_URL}/users/${user?.email}`,
                        {
                            headers: {
                                Authorization: `Bearer ${token ? token.__raw : "Not Auth"}`,
                                "Content-Type": "application/json",
                            },
                        }
                        );
                        const data = await response.json();

                    if (data.status === "OK") {
                        setUserLogged(data.user[0]);
                    }
            } catch (error) {
                console.log(error);
            }
        };
        getUser()
    }, [user, getIdTokenClaims])


    return (
        <UserContext.Provider value={
            {
                userLogged,
                setUserLogged,
            }
        }>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider
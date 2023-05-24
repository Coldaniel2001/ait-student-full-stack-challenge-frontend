import React, { useContext, useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'

import { toast } from 'react-hot-toast';

import GilfContext from './GilfContext'
import UserContext from '../User/UserContext'

const GilfProvider = ({ children }) => {
    const { getIdTokenClaims } = useAuth0()
    const { userLogged } = useContext(UserContext)
    const [dataGilf, setDataGilf] = useState([])
    const [EditGilf, setEditGilf] = useState([])
    const [deleteOneGilf, setDeleteOneGilf] = useState({})
    const { user } = useAuth0()

    useEffect(() => {
        const getAllGilf = async (gilfdata) => {
            try {
                if (user) {
                    const token = await getIdTokenClaims();

                    const response = await fetch(
                        `${process.env.REACT_APP_SERVER_URL}/gilfs`,
                        {
                            headers: {
                                Authorization: `Bearer ${token ? token.__raw : "Not Auth"}`,
                                "Content-Type": "application/json",
                            },
                        }
                    );
                    const data = await response.json();

                    if (data.status === "OK") {
                        setDataGilf(data.allGilf);
                    }

                }
            } catch (error) {
                console.log(error);
            }
        };
        getAllGilf()
    }, [getIdTokenClaims, user, deleteOneGilf, EditGilf])

    const addGilf = async (gilfdata) => {
        try {
            const token = await getIdTokenClaims();

            const response = await fetch(
                `${process.env.REACT_APP_SERVER_URL}/gilfs/${userLogged._id}`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token ? token.__raw : "Not Auth"}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(gilfdata)
                }
            );
            const data = await response.json();

            if (data.status === "OK") {
                setDataGilf([...dataGilf, data.newGilf]);
                toast.success("Ha sido subido exitosamente")
            }
        } catch (error) {
            console.log(error);
        }
    };

    const editGilf = async (gilfdata) => {
        try {
            const token = await getIdTokenClaims();

            const response = await fetch(
                `${process.env.REACT_APP_SERVER_URL}/gilfs/${userLogged._id}`,
                {
                    method: "PATCH",
                    headers: {
                        Authorization: `Bearer ${token ? token.__raw : "Not Auth"}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(gilfdata)
                }
            );
            const data = await response.json();

            if (data.status === "OK") {
                setEditGilf(data.gilfEdit);
                toast.success("Ha sido Modificando exitosamente")
            }
        } catch (error) {
            console.log(error);
        }
    };


    const deleteGilf = async (deleteGilf) => {
        try {
            const token = await getIdTokenClaims();

            const response = await fetch(
                `${process.env.REACT_APP_SERVER_URL}/gilfs/${userLogged._id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token ? token.__raw : "Not Auth"}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(deleteGilf)
                }
            );
            const data = await response.json();
            console.log(data)
            if (data.status === "OK") {
                setDeleteOneGilf(data.gilfDelete);
                toast.success("Ha sido eliminado exitosamente")
            }
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <GilfContext.Provider value={
            {
                dataGilf,
                setDataGilf,
                addGilf: addGilf,
                editGilf: editGilf,
                deleteGilf: deleteGilf
            }
        }>
            {children}
        </GilfContext.Provider>
    )
}

export default GilfProvider
import React, { useContext, useState } from 'react'

import { MdDeleteForever } from 'react-icons/md';
import { AiOutlineEdit } from 'react-icons/ai';

import GilfContext from '../../context/Gilf/GilfContext'
import UserContext from '../../context/User/UserContext';

import ModalEditGilf from '../../component/ModalEditGilf/ModalEditGilf';



const Home = () => {
    const { dataGilf, deleteGilf } = useContext(GilfContext)
    const { userLogged } = useContext(UserContext)

    const [uploadGilf, setUploadGilf] = useState(false)
    const [gilfValue, setGilfValue] = useState({})

    const filterMyGilf = dataGilf.filter((myGilf) => {
        return myGilf.uploadedBy === userLogged._id
    })




    const handleDelete = (gilf) => {
        deleteGilf(gilf)
    }

    const handleModalEdit = (gilf) => {
        setUploadGilf(true)
        setGilfValue(gilf)
    }

    return (
        <section className='bg-blue-500 w-full h-screen'>
            <h2 className='text-[10rem] font-bold'>Mis Gilf</h2>
            <div className='bg-yellow-500 grid grid-cols-4 gap-4 w-full h-screen '>
                {
                    filterMyGilf.map((gilf) => {
                        return (
                            <div className='flex justify-center items-center flex-col w-[90%] h-[100%] border-[1px] border-black' key={gilf._id} >
                                <img className='w-[30%] h-[80%]' src={gilf.picture} alt="my gilf" />
                                <span>{gilf.nameGilf}</span>
                                <div className='flex'>
                                    <MdDeleteForever onClick={() => handleDelete(gilf)} />
                                    <AiOutlineEdit onClick={() => handleModalEdit(gilf)} />
                                </div>
                            </div>
                        )
                    })
                }

            </div>
            {
                uploadGilf &&
                <ModalEditGilf setUploadGilf={setUploadGilf} gilfValue={gilfValue} setGilfValue={setGilfValue}/>
            }
        </section >

    )
}

export default Home
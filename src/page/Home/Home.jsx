import React, { useContext, useState } from 'react'
import {useNavigate} from 'react-router-dom'

import { MdDeleteForever } from 'react-icons/md';
import { AiOutlineEdit } from 'react-icons/ai';

import GilfContext from '../../context/Gilf/GilfContext'
import UserContext from '../../context/User/UserContext';
import SearchContext from '../../context/Search/SearchContext';

import ModalEditGilf from '../../component/ModalEditGilf/ModalEditGilf';



const Home = () => {
    const { dataGilf, deleteGilf } = useContext(GilfContext)
    const { userLogged } = useContext(UserContext)
    const { searchResults } = useContext(SearchContext)

    const [uploadGilf, setUploadGilf] = useState(false)
    const [gilfValue, setGilfValue] = useState({})
    const [searchFilter, setSearchFilter] = useState("")

    const navigate = useNavigate()

    if(!userLogged){
        navigate('/')
    }

    const filterMyGilf = dataGilf.filter((myGilf) => {
        return myGilf.uploadedBy === userLogged._id
    })
    const filterNameGilfMyGilf = searchResults?.nameGilf?.filter((myGilf) => {
        return myGilf?.uploadedBy === userLogged?._id
    })
    const filterGenreMyGilf = searchResults?.genre?.filter((myGilf) => {
        return myGilf?.uploadedBy === userLogged?._id
    })
    const filterPictureMyGilf = searchResults?.picture?.filter((myGilf) => {
        return myGilf?.uploadedBy === userLogged?._id
    })


    const handleDelete = (gilf) => {
        deleteGilf(gilf)
    }

    const handleModalEdit = (gilf) => {
        setUploadGilf(true)
        setGilfValue(gilf)
    }

    const handleSearchFilter = (e) => {
        setSearchFilter(e.target.value)
    }

    return (
        <section className='bg-blue-500 w-full h-screen'>
            <h2 className='text-[10rem] font-bold'>My Gif</h2>
            <label>NameGif<input onChange={handleSearchFilter} type='radio' name="filter" value='nameGif' /></label>
            <label>Picture<input onChange={handleSearchFilter} type='radio' name="filter" value='picture' /> </label>
            <label>Genre<input onChange={handleSearchFilter} type='radio' name="filter" value='genre' /></label>
            <div className='bg-yellow-500 grid grid-cols-4 gap-4 w-full h-screen '>

                {(filterNameGilfMyGilf?.length && searchFilter === "nameGif") || (filterGenreMyGilf?.length && searchFilter === "genre") || (filterPictureMyGilf?.length && searchFilter === "picture") ? (
                    searchFilter === "nameGif" ? filterNameGilfMyGilf?.map((nameGilf) => {
                        return (
                            <div className='flex justify-center items-center flex-col w-[90%] h-[100%] border-[1px] border-black' key={nameGilf?._id} >
                                <img className='w-[30%] h-[80%]' src={nameGilf?.picture} alt="my gilf" />
                                <span>{nameGilf?.nameGilf}</span>
                                <div className='flex'>
                                    <MdDeleteForever onClick={() => handleDelete(nameGilf)} />
                                    <AiOutlineEdit onClick={() => handleModalEdit(nameGilf)} />
                                </div>
                            </div>
                        )
                    }) : searchFilter === "genre" ? filterGenreMyGilf?.map((nameGilf) => {
                        return (
                            <div className='flex justify-center items-center flex-col w-[90%] h-[100%] border-[1px] border-black' key={nameGilf?._id} >
                                <img className='w-[30%] h-[80%]' src={nameGilf?.picture} alt="my gilf" />
                                <span>{nameGilf?.nameGilf}</span>
                                <div className='flex'>
                                    <MdDeleteForever onClick={() => handleDelete(nameGilf)} />
                                    <AiOutlineEdit onClick={() => handleModalEdit(nameGilf)} />
                                </div>
                            </div>
                        )
                    }): filterPictureMyGilf.map((nameGilf) => {
                            return (
                                <div className='flex justify-center items-center flex-col w-[90%] h-[100%] border-[1px] border-black' key={nameGilf?._id} >
                                    <img className='w-[30%] h-[80%]' src={nameGilf?.picture} alt="my gilf" />
                                    <span>{nameGilf?.nameGilf}</span>
                                    <div className='flex'>
                                        <MdDeleteForever onClick={() => handleDelete(nameGilf)} />
                                        <AiOutlineEdit onClick={() => handleModalEdit(nameGilf)} />
                                    </div>
                                </div>
                            )
                        })
                ) : (
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
                )}

            </div>
            {
                uploadGilf &&
                <ModalEditGilf setUploadGilf={setUploadGilf} gilfValue={gilfValue} setGilfValue={setGilfValue} />
            }
        </section >

    )
}

export default Home
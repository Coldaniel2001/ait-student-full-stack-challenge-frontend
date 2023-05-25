import React, { useContext, useState } from 'react'
import {useNavigate} from 'react-router-dom'

import GilfContext from '../../context/Gilf/GilfContext';
import UserContext from '../../context/User/UserContext';
import SearchContext from '../../context/Search/SearchContext';


const OnePiece = () => {
    const { dataGilf } = useContext(GilfContext)
    const { userLogged } = useContext(UserContext)
    const { searchResults } = useContext(SearchContext)
    const [searchFilter, setSearchFilter] = useState("")

    const navigate = useNavigate()
    
    if(!userLogged){
        navigate('/')
    }

    const filterOnePieceGilf = dataGilf.filter((onePieceGif) => {
        return (onePieceGif.uploadedBy !== userLogged._id) && (onePieceGif.genre === "One Piece")
    })
    const filterNameGilfOnePiece = searchResults?.nameGilf?.filter((onePieceGif) => {
        return (onePieceGif.uploadedBy !== userLogged._id) && (onePieceGif.genre === "One Piece")
    })

    const filterPictureOnePiece = searchResults?.picture?.filter((onePieceGif) => {
        return (onePieceGif.uploadedBy !== userLogged._id) && (onePieceGif.genre === "One Piece")
    })

    const handleSearchFilter = (e) => {
        setSearchFilter(e.target.value)
    }


    return (
        <section className='bg-blue-500 w-full h-screen'>
            <h2 className='text-[10rem] font-bold'>One Piece</h2>
            <label>NameGif<input onChange={handleSearchFilter} type='radio' name="filter" value='nameGif' /></label>
            <label>Picture<input onChange={handleSearchFilter} type='radio' name="filter" value='picture' /> </label>
            <div className='bg-yellow-500 grid grid-cols-4 gap-4 w-full h-screen '>
                {(filterNameGilfOnePiece?.length && searchFilter === "nameGif") || (filterPictureOnePiece?.length && searchFilter === "picture") ? (
                    searchFilter === "nameGif" ? filterNameGilfOnePiece?.map((nameGilf) => {
                        return (
                            <div className='flex justify-center items-center flex-col w-[90%] h-[100%] border-[1px] border-black' key={nameGilf?._id} >
                                <img className='w-[30%] h-[80%]' src={nameGilf?.picture} alt="my gilf" />
                                <span>{nameGilf?.nameGilf}</span>
                            </div>
                        )
                    }) : filterPictureOnePiece.map((nameGilf) => {
                        return (
                            <div className='flex justify-center items-center flex-col w-[90%] h-[100%] border-[1px] border-black' key={nameGilf?._id} >
                                <img className='w-[30%] h-[80%]' src={nameGilf?.picture} alt="my gilf" />
                                <span>{nameGilf?.nameGilf}</span>
                            </div>
                        )
                    })
                ) : (
                    filterOnePieceGilf.map((gilf) => {
                        return (
                            <div className='flex justify-center items-center flex-col w-[90%] h-[100%] border-[1px] border-black' key={gilf._id} >
                                <img className='w-[30%] h-[80%]' src={gilf.picture} alt="my gilf" />
                                <span>{gilf.nameGilf}</span>
                            </div>
                        )
                    })
                )}

            </div>
        </section >
    )
}

export default OnePiece
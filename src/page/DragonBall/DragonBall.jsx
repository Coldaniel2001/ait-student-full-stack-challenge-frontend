import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import GilfContext from '../../context/Gilf/GilfContext'
import UserContext from '../../context/User/UserContext';
import SearchContext from '../../context/Search/SearchContext';


const DragonBall = () => {
    const { dataGilf } = useContext(GilfContext)
    const { userLogged } = useContext(UserContext)

    const { searchResults } = useContext(SearchContext)
    const [searchFilter, setSearchFilter] = useState("")

    const navigate = useNavigate()

    if (!userLogged) {
        navigate('/')
    }

    const filterDragonBallGilf = dataGilf.filter((dragonBallGilf) => {
        return (dragonBallGilf.uploadedBy !== userLogged._id) && (dragonBallGilf.genre === "Dragon Ball")
    })
    const filterNameGilfDragonBallGilf = searchResults?.nameGilf?.filter((dragonBallGilf) => {
        return (dragonBallGilf?.uploadedBy !== userLogged?._id) && (dragonBallGilf.genre === "Dragon Ball")
    })
    const filterPictureDragonBallGilf = searchResults?.picture?.filter((dragonBallGilf) => {
        return (dragonBallGilf.uploadedBy !== userLogged._id) && (dragonBallGilf.genre === "Dragon Ball")
    })

    const handleSearchFilter = (e) => {
        setSearchFilter(e.target.value)
    }

    return (
        <section className='bg-blue-500 w-full h-screen'>
            <h2 className='text-[10rem] font-bold'>One Piece</h2>
            <label>NameGif<input onChange={handleSearchFilter} type='radio' name="filter" value='nameGif' /></label>
            <label>Picture<input onChange={handleSearchFilter} type='radio' name="filter" value='picture' /> </label>
            <div className='bg-yellow-500 grid grid-cols-4 gap-4 w-full h-screen  overflow-x-scroll scrollbar-hide '>
                {(filterNameGilfDragonBallGilf?.length && searchFilter === "nameGif") || (filterPictureDragonBallGilf?.length && searchFilter === "picture") ? (
                    searchFilter === "nameGif" ? filterNameGilfDragonBallGilf?.map((nameGilf) => {
                        return (
                            <div className='flex justify-center items-center flex-col w-[20rem] h-[20rem] border-[1px] border-black' key={nameGilf._id} >
                                <img className='w-[75%] h-[80%]' src={nameGilf.picture} alt="my gilf" />
                                <span>{nameGilf.nameGilf}</span>
                            </div>
                        )
                    }) : filterPictureDragonBallGilf.map((nameGilf) => {
                        return (
                            <div className='flex justify-center items-center flex-col w-[20rem] h-[20rem] border-[1px] border-black' key={nameGilf._id} >
                                <img className='w-[75%] h-[80%]' src={nameGilf.picture} alt="my gilf" />
                                <span>{nameGilf.nameGilf}</span>
                            </div>
                        )
                    })
                ) : (
                    filterDragonBallGilf.map((gilf) => {
                        return (
                            <div className='flex justify-center items-center flex-col w-[20rem] h-[20rem] border-[1px] border-black' key={gilf._id} >
                                <img className='w-[75%] h-[80%]' src={gilf.picture} alt="my gilf" />
                                <span>{gilf.nameGilf}</span>
                            </div>
                        )
                    })
                )}

            </div>
        </section >

    )
}

export default DragonBall
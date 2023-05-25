import React, { useContext, useState } from 'react'
import {useNavigate} from 'react-router-dom'

import GilfContext from '../../context/Gilf/GilfContext'
import UserContext from '../../context/User/UserContext';
import SearchContext from '../../context/Search/SearchContext';

const Pokemon = () => {
    const { dataGilf } = useContext(GilfContext)
    const { userLogged } = useContext(UserContext)

    const { searchResults } = useContext(SearchContext)
    const [searchFilter, setSearchFilter] = useState("")

    const navigate = useNavigate()
    
    if(!userLogged){
        navigate('/')
    }
    
    const filterPokemonGilf = dataGilf.filter((pokemonGilf) => {
        return (pokemonGilf.uploadedBy !== userLogged._id) && (pokemonGilf.genre === "Pokemon")
    })

    const filterNameGilfPokemonGilf = searchResults?.nameGilf?.filter((pokemonGilf) => {
        return (pokemonGilf?.uploadedBy !== userLogged?._id) && (pokemonGilf.genre === "Pokemon")
    })
    const filterPicturePokemonGilf = searchResults?.picture?.filter((pokemonGilf) => {
        return (pokemonGilf?.uploadedBy !== userLogged?._id) && (pokemonGilf.genre === "Pokemon")
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
            {(filterNameGilfPokemonGilf?.length && searchFilter === "nameGif")  || (filterPicturePokemonGilf?.length && searchFilter === "picture") ? (
                searchFilter === "nameGif" ? filterNameGilfPokemonGilf?.map((nameGilf) => {
                    return (
                        <div className='flex justify-center items-center flex-col w-[90%] h-[100%] border-[1px] border-black' key={nameGilf?._id} >
                            <img className='w-[30%] h-[80%]' src={nameGilf?.picture} alt="my gilf" />
                            <span>{nameGilf?.nameGilf}</span>
                        </div>
                    )
                }) :  filterPicturePokemonGilf.map((nameGilf) => {
                    return (
                        <div className='flex justify-center items-center flex-col w-[90%] h-[100%] border-[1px] border-black' key={nameGilf?._id} >
                            <img className='w-[30%] h-[80%]' src={nameGilf?.picture} alt="my gilf" />
                            <span>{nameGilf?.nameGilf}</span>
                        </div>
                    )
                })
            ) : (
                filterPokemonGilf.map((gilf) => {
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

export default Pokemon
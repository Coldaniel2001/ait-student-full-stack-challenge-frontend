import React, { useContext, useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'

import { toast } from 'react-hot-toast';

import SearchContext from './SearchContext'
import GilfContext from '../Gilf/GilfContext';

const SearchProvider = ({ children }) => {
    const { user, getIdTokenClaims } = useAuth0()
    const { dataGilf } = useContext(GilfContext)

    const [searchValue, setSearchValue] = useState("");

    const [searchResults, setSearchResults] = useState({
        nameGilf: [],
        picture: [],
        genre: [],
    });
    const [searchFinal, setSearchFinal] = useState({
        nameGilf: [],
        picture: [],
        genre: [],
    });


    const handleSearch = async (e) => {
        const value = e.target.value;
        setSearchValue(value);

        if (value.trim() === "") {
            setSearchResults({
                playlists: [],
                artists: [],
                tracks: [],
            });
        } else {
            try {
                if (user) {
                    const token = await getIdTokenClaims();
                    const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/search/${searchValue}`, {
                        headers: {
                            Authorization: `Bearer ${token ? token.__raw : "Not Auth"}`,
                            "Content-Type": "application/json",
                        },
                    });
                    const data = await response.json();
                    if (data.ok) {
                        setSearchFinal(data.data);
                    }
                }
            } catch (error) {

            }
        }
    }

    useEffect(() => {
        const getAllSearch = async (gilfdata) => {
            try {
                if (user) {
                    const token = await getIdTokenClaims();
                    const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/search/${searchValue}`, {
                        headers: {
                            Authorization: `Bearer ${token ? token.__raw : "Not Auth"}`,
                            "Content-Type": "application/json",
                        },
                    });
                    const data = await response.json();
                    if (data.ok) {
                        setSearchResults(data.data);
                    }
                }
            } catch (error) {
                console.log(error)
            }
        }
        getAllSearch()
    }, [getIdTokenClaims, user, searchFinal, searchValue, dataGilf])

    return (
        <SearchContext.Provider value={
            {
                handleSearch: handleSearch,
                searchValue,
                setSearchValue,
                searchResults,
                setSearchResults
            }
        }>
            {children}
        </SearchContext.Provider>
    )

}
export default SearchProvider
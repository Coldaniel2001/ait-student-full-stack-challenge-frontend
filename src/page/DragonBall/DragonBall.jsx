import React, { useContext } from 'react'


import GilfContext from '../../context/Gilf/GilfContext'
import UserContext from '../../context/User/UserContext';


const DragonBall = () => {
    const { dataGilf } = useContext(GilfContext)
    const { userLogged } = useContext(UserContext)

    const filterDragonBallGilf = dataGilf.filter((myGilf) => {
        return (myGilf.uploadedBy !== userLogged._id) && (myGilf.genre === "Dragon Ball")
    })

    return (
        <section className='bg-blue-500 w-full h-screen'>
            <h2 className='text-[10rem] font-bold'>Dragon Ball</h2>
            <div className='bg-yellow-500 grid grid-cols-4 gap-4 w-full h-screen '>
                {
                    filterDragonBallGilf.map((gilf) => {
                        return (
                            <div className='flex justify-center items-center flex-col w-[90%] h-[100%]  border-[1px] border-black' key={gilf._id} >
                                <img className='w-[30%] h-[80%]' src={gilf.picture} alt="my gilf" />
                                <span>{gilf.nameGilf}</span>
                            </div>
                        )
                    })
                }

            </div>
        </section >
    )
}

export default DragonBall
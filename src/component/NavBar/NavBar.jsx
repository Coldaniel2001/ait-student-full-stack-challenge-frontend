import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

import { AiOutlineSearch } from 'react-icons/ai';
import { FiLogOut } from 'react-icons/fi';

import ModalAddNewGilf from '../ModalAddNewGilf/ModalAddNewGilf';

import UserContext from '../../context/User/UserContext';

const NavBar = () => {
	const { logout } = useAuth0()
	const { userLogged } = useContext(UserContext)
	const [uploadGilf, setUploadGilf] = useState(false)

	const handleOpenModal = () => {
		setUploadGilf(true)
	}
	return (
		<div className='flex justify-around items-center bg-black h-[5rem] text-white '>
			<div className='flex h-[100%]  w-[30%] items-center '>
				<input className='text-black h-[70%] w-[70%]' type='text' />
				<AiOutlineSearch className='bg-green-500 h-[70%] w-[30%]' />
			</div>
			<div className=' flex justify-around w-[40%]'>
				<NavLink className={({ isActive }) => isActive && "text-yellow-500"}
					to="/home"><span>My Gilf</span></NavLink>
				<NavLink className={({ isActive }) => isActive && "text-yellow-500"}
					to="/pokemon"><span>Pokemon</span></NavLink>
				<NavLink className={({ isActive }) => isActive && "text-yellow-500"}
					to="/dragonball"><span>Dragon Ball</span></NavLink>
				<NavLink className={({ isActive }) => isActive && "text-yellow-500"}
					to="/onepiece"><span>One Piece</span></NavLink>
			</div>
			<div className='flex justify-center bg-blue-500 h-[100%] w-[10%]'>
				<button onClick={() => handleOpenModal()}>Upload</button>
			</div>
			<div className='flex justify-center w-[20%]'>
				<FiLogOut className='w-[3rem] h-[70%] rounded-[0.5rem] cursor-pointer'
					onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })} />
				<div>
					<span className='flex items-center'>{userLogged?.name}</span>
					<span className='flex items-center'>{userLogged?.email}</span>
				</div>
			</div>
			{
				uploadGilf &&
				<ModalAddNewGilf setUploadGilf={setUploadGilf} />
			}
		</div>
	)
};

export default NavBar;

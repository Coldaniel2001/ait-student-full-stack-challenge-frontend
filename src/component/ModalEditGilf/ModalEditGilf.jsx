import React, { useContext, useState } from 'react'


import { AiOutlineLink } from 'react-icons/ai';

import GilfContext from '../../context/Gilf/GilfContext';



const ModalEditGilf = ({ setUploadGilf, gilfValue, setGilfValue }) => {

console.log(gilfValue)
	const {editGilf } = useContext(GilfContext)

	const handleInput = (event) => {
		setGilfValue({ ...gilfValue, [event.target.name]: event.target.value })
	}
	const handleSubmit = (e) => {
		e.preventDefault()
		setUploadGilf(false)
		editGilf(gilfValue)
	}



	return (
		<div className="fixed z-50 inset-0 overflow-y-auto bg-black/70">
			<div className="flex items-center justify-center min-h-screen">
				<div className="flex flex-col justify-center bg-gradient-to-tr from-black via-[green] to-[green] rounded-lg shadow-lg p-6 w-[90%] sm:w-2/3 md:w-3/6 lg:w-2/6 2xl:w-[1/4] border-2 border-white">
					<p className='font-bold text-3xl mx-auto'>Edit gilf</p>
					<form onSubmit={handleSubmit} enctype="multipart/form-data">
						<div className='flex flex-col mt-4'>
							<label className='text-xl font-bold'>Name gilf</label>
							<input className='rounded h-[2rem] text-black'
								type="text"
								name="nameGilf"
								onChange={handleInput}
								value={gilfValue.nameGilf}
								required
							/>
						</div>
						<div className='flex flex-col mt-4'>
							<label className='flex items-center text-xl font-bold'>Link  gilf  <>&nbsp;&nbsp;	</><AiOutlineLink /></label>
							<input className='rounded h-[2rem] text-black'
								type="text"
								name="picture"
								onChange={handleInput}
								value={gilfValue.picture}
								required
							/>
						</div>
						<div className='flex flex-col mt-4'>
							<label className='text-xl font-bold'>Genre</label>
							<select className='text-black h-[2rem] rounded'
								name="genre"
								value={gilfValue.genre}
								onChange={handleInput}
								required
							>
								<option value="" >Seleccione una opción</option>
								<option value="Pokemon" required>Pokemon</option>
								<option value="Dragon Ball" required>Dragon Ball</option>
								<option value="One Piece" required>One Piece</option>
							</select>
						</div>
						<label>


						</label>
						<div className='mt-20 flex justify-center gap-3'>

							<div className='bg-transparent border py-2 px-4 rounded cursor-pointer  w-[130px] flex justify-center hover:bg-[#f34545]' onClick={() => setUploadGilf(false)}>
								<p >Cancel</p>
							</div>
							<button type='submit' className='bg-[#2ca72c] px-4 py-2 rounded border hover:bg-yellow-500' >Add new gilf</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}

export default ModalEditGilf
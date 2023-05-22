import React, { useRef, useState } from 'react'
// import updateImgSong from '../../assets/images/updateImgSong.png'
// import greenCheck from '../../assets/images/icons/greenCheck.png'


import { toast } from 'react-hot-toast';
import { RingLoader } from 'react-spinners';


const ModalAddNewGilf = ({ setUploadGilf }) => {
	const currentDate = new Date(); const day = currentDate.getDate(); const month = currentDate.getMonth() + 1; const year = currentDate.getFullYear();
	const formattedDate = `${day}/${month}/${year}`;
	const [previewImg, setPreviewImg] = useState(null);


	const [loading, setLoading] = useState(false);

	const isLoading = (isActive) => {
		setLoading(isActive)
	}

	const [songUpload, setSongUpload] = useState(false);


	const handlePreviewImg = (e) => {
		const file = e.target.files[0];
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => {
			setPreviewImg(reader.result);
		};
	}

	const uploadSong = () => {
		setSongUpload(true)
	}

	const form = useRef(null)
	const dataNameSong = useRef(null)

	const handleSubmit = (e) => {
		isLoading(true)
		setSongUpload(false)
		e.preventDefault()
		const formdata = new FormData(form.current)
		formdata.append("update_at", formattedDate)

		editSongImageFetch(formdata)
	}

	const editSongImageFetch = async (data) => {

		const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/tracks/imagesong`, {
			method: "POST",
			body: data
		});
		const newData = await res.json()

		if (newData.ok) {
			toast.success(`Enhorabuena. Tu canción ha sido subida con éxito`)
			setUploadGilf(false)
			isLoading(false)
		} else { toast.error("Ha surgido un error. Por favor, intentelo de nuevo") }


	}

	return (
		<div className="fixed z-50 inset-0 overflow-y-auto bg-black/70">
			<div className="flex items-center justify-center min-h-screen">
				<div className="flex flex-col justify-center bg-gradient-to-tr from-black via-[green] to-[green] rounded-lg shadow-lg p-6 w-[90%] sm:w-2/3 md:w-3/6 lg:w-2/6 2xl:w-[1/4] border-2 border-white">
					<p className='font-bold text-3xl mx-auto'>Añadir gilf</p>
					<form onSubmit={handleSubmit} ref={form} enctype="multipart/form-data">
						<div className='w-full flex justify-center mt-[3vh]' >
							<label>
								<img className='w-[10rem] cursor-pointer rounded-full border-2 h-[10rem] ' src={previewImg ? previewImg : "updateImgSong"} alt="UP" />
								<input type="file" className='hidden'
									required
									onChange={handlePreviewImg}
									name="picture"
								/>
							</label>
						</div>
						<div className='flex flex-col mt-4'>
							<label className='text-xl font-bold'>Nombre del gilf</label>
							<input ref={dataNameSong} className='rounded h-[2rem] text-black'
								type="text"
								name="nameSong"
								id="nameSong"
							/>
						</div>
						<div className='flex flex-col mt-4'>
							<label className='text-xl font-bold'>Género</label>
							<select className='text-black h-[2rem] rounded'
								name="genre"
								id="genre"
							>
								<option value="Pop español">Pop Español</option>
								<option value="Urbano latino">Urbano latino</option>
								<option value="Rock español">Rock español</option>
								<option value="Hip hop">Hip hop</option>
								<option value="Electronica">Electrónica</option>
								<option value="Reggae">Reggae</option>
								<option value="Pop latino">Pop latino</option>
								<option value="Jazz">Jazz</option>
								<option value="Rock">Rock</option>
								<option value="Flamenco">Flamenco</option>
							</select>
						</div>
						<label>


							<div className='bg-[#7C8BBF] py-2 px-4 rounded cursor-pointer mt-6 w-[150px] flex justify-center'
							>
								<input type="file" className='hidden'
									name="song"
									onChange={uploadSong}
								/>
								<p>Subir canción</p>
							</div>
							{songUpload ?
								<div className='flex mt-5 w-full justify-center gap-2 items-center'>
									{/* <img className='w-[30px] h-[30px]' src={greenCheck} alt="" /> */}
									<p>gilf añadida con éxito</p>
								</div>

								: <div className='flex mt-5 w-full justify-center gap-2 items-center'>
									<RingLoader
										color="#ffff"
										loading={loading}
										cssOverride={{}}
										size={60}
									/>
								</div>}
						</label>
						<div className='mt-20 flex justify-center gap-3'>

							<div className='bg-transparent border py-2 px-4 rounded cursor-pointer  w-[130px] flex justify-center hover:bg-[#f34545]' onClick={() => setUploadGilf(false)}>
								<p >Cancelar</p>
							</div>
							<button className='bg-[#2ca72c] px-4 py-2 rounded border hover:bg-yellow-500' >Añadir nuevo gilf</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}

export default ModalAddNewGilf
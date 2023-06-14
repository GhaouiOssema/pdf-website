import React, { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Link, useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import Navbar from './NavBar';

const Alert = React.forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

const FormSend = () => {
	const [formState, setFormState] = useState({
		selectedFile: null,
		title: '',
		owner: '',
		publicOrPrivate: 'public',
	});
	const Navigate = useNavigate();

	const [open, setOpen] = useState(false);
	const [alertMsg, setAlertMsg] = useState('error');

	const handleClick = () => {
		setOpen(true);
	};

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpen(false);
	};

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setFormState({ ...formState, [name]: value });
	};

	const handleFileChange = (event) => {
		setFormState({ ...formState, selectedFile: event.target.files[0] });
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		const { selectedFile, title, owner, publicOrPrivate } = formState;

		// Check if a file was selected
		if (!selectedFile) {
			setAlertMsg('error');
			handleClick();
			return;
		}

		const formData = new FormData();
		formData.append('pdf', selectedFile);
		formData.append('title', title);
		formData.append('owner', owner);
		formData.append('publicOrPrivate', publicOrPrivate);

		try {
			const response = await fetch(
				'https://pdf-server-809j.onrender.com/upload',
				{
					method: 'POST',
					body: formData,
				}
			);

			if (response.ok) {
				// alert('good');
				setAlertMsg('success');
				handleClick();
			} else {
				console.error('Failed to upload PDF.');
			}
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		if (alertMsg === 'success') {
			const performActionAfterInterval = () => {
				Navigate('/pdf');
			};
			const timeout = setTimeout(performActionAfterInterval, 2000);

			return () => {
				clearTimeout(timeout);
			};
		}
	}, [alertMsg, Navigate]);

	return (
		<>
			<div className='mt-[-40px]'>
				<Navbar />
			</div>
			<h1 className='text-3xl text-center font-bold mb-4 mt-10'>
				Ajouter un Plan
			</h1>
			{/* <div className='flex flex-col mt-10 border-4 border-sky-500 w-[70%] ml-[15%]'>
				<form onSubmit={handleSubmit} className='flex flex-col mb-4'>
					<div className='flex w-[100%]'>
						<input
							type='file'
							accept='.pdf'
							onChange={handleFileChange}
							className=' border border-gray-300 mr-2'
						/>
					</div>
					<input
						type='text'
						name='title'
						placeholder='Title'
						value={formState.title}
						onChange={handleInputChange}
						className='p-2 border border-gray-300 mr-2'
					/>
					<input
						type='text'
						name='owner'
						placeholder='Owner'
						value={formState.owner}
						onChange={handleInputChange}
						className='p-2 border border-gray-300 mr-2'
					/>
					<select
						name='publicOrPrivate'
						value={formState.publicOrPrivate}
						onChange={handleInputChange}
						className='p-2 border border-gray-300 mr-2'>
						<option value='public'>Public</option>
						<option value='private'>Private</option>
					</select>
					<div className='flex justify-center'>
						<button
							type='submit'
							className='px-4 py-2 bg-blue-500 text-white font-semibold mr-5'>
							Upload
						</button>
						<button className='px-4 py-2 bg-blue-500 text-white font-semibold'>
							<Link to='/pdf'>Show all PDFs</Link>
						</button>
					</div>
				</form>
			</div> */}
			<form onSubmit={handleSubmit}>
				<div className='flex justify-center items-center bg-white'>
					<div className=' w-[70%] container mx-auto my-4 px-4 lg:px-20'>
						<div className='p-8 my-4 mr-auto rounded-2xl shadow-2xl'>
							<div className=' mt-5'>
								<div className='w-full'>
									<input
										className='w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline'
										type='file'
										accept='.pdf'
										onChange={handleFileChange}
										placeholder='First Name*'
									/>
								</div>
								<div className='flex items-center justify-between'>
									<input
										className='w-[60%] bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline'
										type='text'
										placeholder='Nom du fichier'
										value={formState.title}
										onChange={handleInputChange}
										name='title'
									/>
									<select
										name='publicOrPrivate'
										value={formState.publicOrPrivate}
										onChange={handleInputChange}
										className='w-[38%] bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline pl-5'>
										<option value='public'>Publique</option>
										<option value='private'>Privé</option>
									</select>
								</div>
							</div>
							<div className='mt-5 my-2 flex w-[100%] justify-end'>
								<button
									type='submit'
									className='uppercase text-sm font-bold tracking-wide bg-blue-900 text-gray-100 p-3 rounded-lg focus:outline-none focus:shadow-outline'>
									Ajouter
								</button>
								<button
									type='reset'
									className='uppercase text-sm font-bold tracking-wide bg-blue-900 text-gray-100 p-3 ml-5 rounded-lg focus:outline-none focus:shadow-outline'>
									Restaurer
								</button>
							</div>
						</div>
					</div>
				</div>
			</form>
			<Stack spacing={2} sx={{ width: '100%' }}>
				<Snackbar
					open={open}
					autoHideDuration={6000}
					onClose={handleClose}>
					{alertMsg === 'success' ? (
						<Alert
							onClose={handleClose}
							severity='success'
							sx={{ width: '100%' }}>
							Fichier ajouté avec succès
						</Alert>
					) : alertMsg === 'error' ? (
						<Alert
							onClose={handleClose}
							severity='error'
							sx={{ width: '100%' }}>
							Veuillez insérer un fichier!
						</Alert>
					) : null}
				</Snackbar>
			</Stack>
		</>
	);
};

export default FormSend;

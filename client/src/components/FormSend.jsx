import React, { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Link, useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { Alert } from '@mui/material';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import Navbar from './NavBar';
import PdfFile from './PdfFile';

const ATert = React.forwardRef(function Alert(props, ref) {
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
			<form onSubmit={handleSubmit}>
				<div className='flex justify-center items-center bg-white'>
					<div className=' max__size w-[70%] container mx-auto my-4 px-4 lg:px-20'>
						<div className=' p-8 my-4 mr-auto rounded-2xl shadow-2xl'>
							<div className=' mt-5'>
								<div className='w-full flex flex-col'>
									<input
										className='w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline'
										type='file'
										accept='.pdf'
										onChange={handleFileChange}
									/>
									{formState.selectedFile && (
										<Stack
											sx={{
												width: '100%',
												color: 'black',
												marginTop: '10px',
											}}
											spacing={2}>
											<Alert severity='info'>
												<span>
													{
														formState.selectedFile
															.name
													}
												</span>
											</Alert>
										</Stack>
									)}
									<label htmlFor='files'></label>
								</div>
								<div className='flex items-center justify-between form__style'>
									<input
										className='w-[60%] bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline max'
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
										className='max w-[38%] bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline pl-5'>
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
						<ATert
							onClose={handleClose}
							severity='success'
							sx={{ width: '100%' }}>
							Fichier ajouté avec succès
						</ATert>
					) : alertMsg === 'error' ? (
						<ATert
							onClose={handleClose}
							severity='error'
							sx={{ width: '100%' }}>
							Veuillez insérer un fichier!
						</ATert>
					) : null}
				</Snackbar>
			</Stack>
		</>
	);
};

export default FormSend;

import React, { useState, useEffect } from 'react';
import { Document, Page } from 'react-pdf';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from './NavBar';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

const PdfFile = () => {
	const [pdfs, setPdfs] = useState([]);
	const [open, setOpen] = useState(false);
	const [alertMsg, setAlertMsg] = useState('');

	const handleClick = () => {
		setOpen(true);
	};

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpen(false);
	};
	useEffect(() => {
		const getPdfData = async () => {
			try {
				const response = await axios.get(
					'https://pdf-server-809j.onrender.com/pdfs'
				);
				setPdfs(response.data.pdfs);
			} catch (error) {
				console.log('Error retrieving PDF data:', error);
			}
		};

		getPdfData();
	}, []);

	const handleDelete = async (id) => {
		try {
			const response = await axios.delete(
				`https://pdf-server-809j.onrender.com/pdfs/${id}`
			);

			if (response.status === 200) {
				setAlertMsg('success');
				handleClick();
			} else {
				console.error('Failed to delete PDF.');
			}
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		if (alertMsg === 'success') {
			const performActionAfterInterval = () => {
				window.location.reload();
			};
			const timeout = setTimeout(performActionAfterInterval, 2000);

			return () => {
				clearTimeout(timeout);
			};
		}
	}, [alertMsg]);

	return (
		<div>
			<div className='mt-[-40px]'>
				<Navbar />
			</div>
			<h1 className='text-3xl text-center font-bold mb-4 mt-10'>
				All PDF Files
			</h1>
			<ul className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
				{pdfs ? (
					<>
						{pdfs.map((pdf) => (
							<li
								key={pdf._id}
								className=' row__card h-10 flex justify-between items-center mb-2 p-10 rounded-2xl shadow-md shadow-black/30'>
								<div className=' flex items-center justify-between w-[170px] pdf__file__name'>
									<img
										width='44'
										height='44'
										src='https://img.icons8.com/cute-clipart/64/pdf.png'
										alt='pdf'
									/>
									<span>{pdf.title}</span>
								</div>
								<div className=' ml-5 flex '>
									<Link to={`/pdf/${pdf._id}`}>
										<button
											onClick={() =>
												handleDelete(pdf._id)
											}
											type='reset'
											className='button__left uppercase text-sm tracking-wide bg-green-500 text-gray-100 px-2 py-1 ml-5 rounded-md focus:outline-none focus:shadow-outline hover:bg-red-500'>
											Details
										</button>
									</Link>

									<button
										onClick={() => handleDelete(pdf._id)}
										type='reset'
										className='button__left uppercase text-sm tracking-wide bg-blue-900 text-gray-100 px-2 py-1 ml-5 rounded-md focus:outline-none focus:shadow-outline hover:bg-red-500'>
										Supprimer
									</button>
								</div>
							</li>
						))}
					</>
				) : (
					<h2 className='text-2xl font-bold mt-6'>
						The List of Pdfs is Empty!!!
					</h2>
				)}
			</ul>

			<Stack spacing={2} sx={{ width: '100%' }}>
				<Snackbar
					open={open}
					autoHideDuration={6000}
					onClose={handleClose}>
					<Alert
						onClose={handleClose}
						severity='success'
						sx={{ width: '100%' }}>
						Fichier supprimer avec succès
					</Alert>
				</Snackbar>
			</Stack>
		</div>
	);
};

export default PdfFile;

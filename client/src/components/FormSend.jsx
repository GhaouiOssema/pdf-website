import React, { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Link, useNavigate } from 'react-router-dom';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import Navbar from './NavBar';

const FormSend = () => {
	const [formState, setFormState] = useState({
		selectedFile: null,
		title: '',
		owner: '',
		publicOrPrivate: 'public',
	});
	const Navigate = useNavigate();

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
			alert('Please select a PDF file.');
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
				console.log('PDF uploaded successfully.');
				Navigate('/pdf');
			} else {
				console.error('Failed to upload PDF.');
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<>
			<div className='mt-[-40px]'>
				<Navbar />
			</div>
			<div className='flex felx-col mt-10'>
				<h1 className='text-3xl font-bold mb-4'>Upload PDF</h1>
				<form onSubmit={handleSubmit} className='mb-4'>
					<div className='flex'>
						<input
							type='file'
							accept='.pdf'
							onChange={handleFileChange}
							className='p-2 border border-gray-300 mr-2'
						/>
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
						<button
							type='submit'
							className='px-4 py-2 bg-blue-500 text-white font-semibold'>
							Upload
						</button>
						<Link to='/pdf'>
							<button className='ml-5 px-4 py-2 bg-blue-500 text-white font-semibold'>
								Show all PDFs
							</button>
						</Link>
					</div>
				</form>
			</div>
		</>
	);
};

export default FormSend;

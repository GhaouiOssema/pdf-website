import React, { useState, useEffect } from 'react';
import { pdfjs } from 'react-pdf';
import { Link } from 'react-router-dom';

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const FormSend = () => {
	const [selectedFile, setSelectedFile] = useState(null);

	const handleFileChange = (event) => {
		setSelectedFile(event.target.files[0]);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		const formData = new FormData();
		formData.append('pdf', selectedFile);

		try {
			const response = await fetch('http://localhost:3000/upload', {
				method: 'POST',
				body: formData,
			});

			if (response.ok) {
				console.log('PDF uploaded successfully.');
				// fetchPdfs();
			} else {
				console.error('Failed to upload PDF.');
			}
		} catch (error) {
			console.error(error);
		}
	};

	const handleDelete = async (id) => {
		try {
			const response = await fetch(`http://localhost:3000/pdfs/${id}`, {
				method: 'DELETE',
			});

			if (response.ok) {
				console.log('PDF deleted successfully.');
				fetchPdfs();
			} else {
				console.error('Failed to delete PDF.');
			}
		} catch (error) {
			console.error(error);
		}
	};
	return (
		<div>
			<h1 className='text-3xl font-bold mb-4'>Upload PDF</h1>
			<form onSubmit={handleSubmit} className='mb-4'>
				<div className='flex'>
					<input
						type='file'
						accept='.pdf'
						onChange={handleFileChange}
						className='p-2 border border-gray-300 mr-2'
					/>
					<button
						type='submit'
						className='px-4 py-2 bg-blue-500 text-white font-semibold'>
						Upload
					</button>
					<Link to={'/pdf'}>
						<button className='ml-5 px-4 py-2 bg-blue-500 text-white font-semibold'>
							show all pdf
						</button>
					</Link>
				</div>
			</form>
		</div>
	);
};

export default FormSend;

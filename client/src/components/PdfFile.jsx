import React, { useState, useEffect } from 'react';
import { Document, Page } from 'react-pdf';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const PdfFile = () => {
	const [pdfs, setPdfs] = useState([]);
	const Navigate = useNavigate();
	const [pdfLoaded, setPdfLoaded] = useState(false);
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
				`http://localhost:3000/pdfs/${id}`
			);

			if (response.status === 200) {
				console.log('PDF deleted successfully.');
				// Navigate('/pdf');
				document.location.reload();
			} else {
				console.error('Failed to delete PDF.');
			}
		} catch (error) {
			console.error(error);
		}
	};

	const handlePdfLoadSuccess = () => {
		setPdfLoaded(true);
	};

	console.log(pdfs);

	return (
		<div>
			<div className='flex'>
				<h2 className='text-2xl font-bold mb-2'>All PDF Files</h2>
			</div>
			<ul className='flex flex-col flex-wrap'>
				{pdfs ? (
					<>
						{pdfs.map((pdf) => (
							<li
								key={pdf._id}
								className='h-10 flex justify-between items-center mt-8 mb-2 ml-5 p-10 rounded-2xl shadow-md shadow-black/30'>
								<div className='flex items-center justify-around w-[200px]'>
									<img
										width='64'
										height='64'
										src='https://img.icons8.com/cute-clipart/64/pdf.png'
										alt='pdf'
									/>
									<span>{pdf.title}</span>
								</div>
								<div className='mt-3 ml-5'>
									<Link to={`/pdf/${pdf._id}`}>
										<button className='px-2 py-1 bg-red-500 text-white text-sm font-semibold'>
											Details
										</button>
									</Link>
									<button
										onClick={() => handleDelete(pdf._id)}
										className='ml-2 px-2 py-1 bg-red-500 text-white text-sm font-semibold'>
										Delete
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
		</div>
	);
};

export default PdfFile;

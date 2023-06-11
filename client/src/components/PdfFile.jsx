import React, { useState, useEffect } from 'react';
import { Document, Page } from 'react-pdf';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const PdfFile = () => {
	useEffect(() => {
		fetchPdfs();
	}, []);

	const [pdfs, setPdfs] = useState([]);
	const Navigate = useNavigate();

	const fetchPdfs = async () => {
		try {
			const response = await fetch('http://localhost:3000/pdfs');
			const data = await response.json();

			if (response.ok) {
				setPdfs(data.pdfs);
			} else {
				console.error('Failed to fetch PDF files.');
			}
		} catch (error) {
			console.error(error);
		}
	};

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

	return (
		<div>
			<div className='flex'>
				<h2 className='text-2xl font-bold mb-2'>All PDF Files</h2>
			</div>
			<ul className='flex flex-wrap'>
				{pdfs ? (
					<>
						{pdfs.map((pdf) => (
							<li
								key={pdf._id}
								className='flex items-center mb-2 ml-5 p-10'>
								<Document
									file={`http://localhost:3000/${pdf.path}`}
									className='mr-2'>
									<Page pageNumber={1} width={80} />
								</Document>
								<div>
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

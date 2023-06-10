import React, { useState, useEffect } from 'react';
import { Document, Page } from 'react-pdf';
import { Link } from 'react-router-dom';

const PdfFile = () => {
	useEffect(() => {
		fetchPdfs();
	}, []);

	const [pdfs, setPdfs] = useState([]);

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
	console.log(pdfs);

	return (
		<div>
			<div className='flex'>
				<h2 className='text-2xl font-bold mb-2'>PDF Files</h2>
				<Link to={'/'}>
					<button className='ml-5 px-4 py-2 bg-blue-500 text-white font-semibold'>
						Home
					</button>
				</Link>
			</div>
			<ul className='flex flex-wrap'>
				{pdfs.map((pdf) => (
					<li
						key={pdf._id}
						className='flex items-center mb-2 ml-5 p-10'>
						<Document
							file={`http://localhost:3000/${pdf.path}`}
							className='mr-2'>
							<Page pageNumber={1} width={80} />
						</Document>
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
					</li>
				))}
			</ul>
		</div>
	);
};

export default PdfFile;

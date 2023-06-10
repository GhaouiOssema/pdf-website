import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Document, Page } from 'react-pdf';
import QRCode from 'react-qr-code';
import { Link } from 'react-router-dom';

const PdfDetails = () => {
	const { id } = useParams();
	const [pdfData, setPdfData] = useState(null);

	useEffect(() => {
		const getPdfData = async () => {
			try {
				const response = await axios.get(
					`http://localhost:3000/pdf/${id}`
				);
				setPdfData(response.data);
			} catch (error) {
				console.log('Error retrieving PDF data:', error);
			}
		};

		getPdfData();
	}, [id]);

	return (
		<div>
			<div className='flex'>
				<h2 className='text-2xl font-bold mb-2'>PDF Details</h2>
				<Link to={'/'}>
					<button className='ml-5 px-4 py-2 bg-blue-500 text-white font-semibold'>
						Home
					</button>
				</Link>
			</div>
			{pdfData != null ? (
				<div className='flex justify-around mt-5'>
					<div>
						<h1>QR Code</h1>
						<QRCode
							value={`http://localhost:5173/pdf/${pdfData.path}`}
						/>
					</div>
					<div
						key={pdfData._id}
						className='flex items-center mb-2 ml-5 p-10'>
						<Document
							file={`http://localhost:3000/${pdfData.path}`}
							className='mr-2'>
							<Page pageNumber={1} width={200} />
						</Document>
						<a
							href={`http://localhost:3000/${pdfData.path}`}
							target='_blank'
							rel='noopener noreferrer'
							className='text-blue-500 underline mr-2'>
							{pdfData.filename}
						</a>

						<button
							onClick={() => handleDelete(pdf._id)}
							className='ml-2 px-2 py-1 bg-red-500 text-white text-sm font-semibold'>
							Delete
						</button>
					</div>
				</div>
			) : (
				<p>Loading PDF data...</p>
			)}
		</div>
	);
};

export default PdfDetails;

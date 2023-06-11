import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Document, Page, pdfjs } from 'react-pdf';
import QRCode from 'react-qr-code';
import html2canvas from 'html2canvas';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PdfDetails = () => {
	const { id } = useParams();
	const [pdfData, setPdfData] = useState(null);
	const qrCodeRef = useRef(null);
	const Navigate = useNavigate();

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

	const handleDownloadQRCode = () => {
		html2canvas(qrCodeRef.current).then((canvas) => {
			const qrCodeDataURL = canvas.toDataURL();
			const downloadLink = document.createElement('a');
			downloadLink.href = qrCodeDataURL;
			downloadLink.download = 'qr_code.png';
			downloadLink.click();
		});
	};

	const handleDelete = async () => {
		try {
			const response = await axios.delete(
				`http://localhost:3000/pdfs/${id}`
			);

			if (response.status === 200) {
				console.log('PDF deleted successfully.');
				Navigate('/pdf');
			} else {
				console.error('Failed to delete PDF.');
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div>
			<div className='flex items-center'>
				<h2 className='text-2xl font-bold mb-2'>PDF Details</h2>
				{pdfData ? (
					<div className='ml-10 flex'>
						<button
							onClick={handleDownloadQRCode}
							className='ml-2 px-2 py-1 bg-blue-500 text-white text-sm font-semibold'>
							Download QR Code
						</button>
						<button
							onClick={handleDelete}
							className='ml-2 px-2 py-1 bg-red-500 text-white text-sm font-semibold'>
							Delete PDF
						</button>
					</div>
				) : null}
			</div>
			{pdfData ? (
				<div className='flex justify-around mt-5'>
					<div>
						<h1>QR Code</h1>
						<div ref={qrCodeRef}>
							<QRCode
								value={`http://localhost:5173/pdf/${pdfData.path}`}
							/>
						</div>
					</div>
					<div
						key={pdfData._id}
						className='flex flex-col items-center mb-2 ml-5 p-10'>
						<a
							href={`http://localhost:3000/${pdfData.path}`}
							target='_blank'
							rel='noopener noreferrer'
							className='text-blue-500 underline mr-2'>
							{pdfData.filename}
						</a>
						<Document
							file={`http://localhost:3000/${pdfData.path}`}
							className='mr-2'>
							<Page pageNumber={1} width={200} />
						</Document>
					</div>
				</div>
			) : (
				<p>Loading PDF data...</p>
			)}
		</div>
	);
};

export default PdfDetails;

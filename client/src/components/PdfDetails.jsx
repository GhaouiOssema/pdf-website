import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Document, Page, pdfjs } from 'react-pdf';
import QRCode from 'react-qr-code';
import html2canvas from 'html2canvas';

// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

const PdfDetails = () => {
	const { id } = useParams();
	const [pdfData, setPdfData] = useState(null);
	const qrCodeRef = useRef(null);

	const Navigate = useNavigate();

	useEffect(() => {
		const getPdfData = async () => {
			try {
				const response = await axios.get(
					`https://pdf-server-809j.onrender.com/pdf/${id}`
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
				`https://pdf-server-809j.onrender.com/pdfs/${id}`
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

	const [pdfLoaded, setPdfLoaded] = useState(false);

	const handlePdfLoadSuccess = () => {
		setPdfLoaded(true);
	};
	const handlePDFClick = () => {
		window.open(
			`https://pdf-server-809j.onrender.com/pdf/view/d8506e42e1e487bec8b260332e78c05f`,
			'_blank'
		);
	};

	return (
		<div>
			<div className='flex items-center'>
				<h2 className='text-2xl font-bold mb-2'>PDF Details</h2>
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
			</div>
			{pdfData ? (
				<div className='flex justify-around mt-5'>
					<div className='mt-5'>
						<h1>QR Code</h1>
						<div ref={qrCodeRef}>
							<QRCode
								className='w-[200px] h-[200px]'
								value={`https://pdf-server-809j.onrender.com/pdf/${id}`}
							/>
						</div>
						<div className='mt-5'>
							<h1 className='font-bold text-lg'>
								Title :
								<span className='font-normal'>
									{' '}
									{pdfData.title}
								</span>
							</h1>
							<h1 className='font-bold text-2xl'>
								Owner :
								<span className='font-normal'>
									{' '}
									{pdfData.owner}
								</span>
							</h1>
						</div>
					</div>
					<div
						key={pdfData._id}
						className='flex flex-col items-center mb-2 ml-5 p-10'>
						<button onClick={handlePDFClick}>Open PDF</button>

						<Document
							file={`https://pdf-server-809j.onrender.com/${pdfData.path}`}
							onLoadSuccess={handlePdfLoadSuccess}>
							{pdfLoaded && (
								<Page
									pageNumber={1}
									width={200}
									renderTextLayer={false}
								/>
							)}
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

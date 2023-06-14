import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Document, Page, pdfjs } from 'react-pdf';
import QRCode from 'react-qr-code';
import html2canvas from 'html2canvas';
import { Link } from 'react-router-dom';
import { IoIosArrowForward } from 'react-icons/io';

import './MediaStyle.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import Navbar from './NavBar';

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
			`https://qr-plan.netlify.app/pdf/view/${pdfData._id}`,
			'_blank'
		);
	};

	return (
		<div className='container'>
			<div className='mt-[-40px]'>
				<Navbar />
			</div>
			<div className='flex items-center mt-10'>
				<div className='header'>
					<h2 className='text-2xl font-bold mb-2'>PDF Details</h2>
				</div>{' '}
				<div className='ml-10 flex button-group'>
					<button
						onClick={handleDownloadQRCode}
						className='ml-2 px-2 py-1 bg-blue-500 text-white text-sm font-semibold button'>
						Download QR Code
					</button>
					<button
						onClick={handleDelete}
						className='ml-2 px-2 py-1 bg-red-500 text-white text-sm font-semibold button'>
						Delete PDF
					</button>
				</div>
			</div>
			{pdfData ? (
				<div className='flex justify-around mt-5 flex__col'>
					<div className='mt-5 qr-code-section'>
						<h1>QR Code</h1>
						<div ref={qrCodeRef} className='qr-code'>
							<QRCode
								className='w-[200px] h-[200px] space_top'
								value={`https://qr-plan.netlify.app/pdf/view/${pdfData._id}`}
							/>
						</div>
						<div className='mt-5 pdf-details-info'>
							<h1 className='font-bold text-lg title'>
								Title :
								<span className='font-normal'>
									{' '}
									{pdfData.title}
								</span>
							</h1>
						</div>
					</div>
					<div
						key={pdfData._id}
						className='flex flex-col items-center ml-5 p-10 pdf-details'>
						<div className='open-pdf-link'>
							<Link
								to={`/pdf/view/${pdfData._id}`}
								className='open-pdf'>
								<span>Open Pdf </span> <IoIosArrowForward />
							</Link>
						</div>
						<div className='pdf-preview' key={pdfData._id}>
							<Document
								file={`https://pdf-server-809j.onrender.com/${pdfData.path}`}
								onLoadSuccess={handlePdfLoadSuccess}
								className='hidden__class'>
								{pdfLoaded && (
									<Page
										pageNumber={1}
										width={200}
										renderTextLayer={false}
										className='pdf-page'
									/>
								)}
							</Document>
						</div>
					</div>
				</div>
			) : (
				<p>Loading PDF data...</p>
			)}
		</div>
	);
};

export default PdfDetails;

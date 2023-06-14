import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import { IoIosArrowBack } from 'react-icons/io';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PdfView = () => {
	const { id } = useParams();
	const [pdfData, setPdfData] = useState(null);
	const [numPages, setNumPages] = useState(null);

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

	const handlePdfLoadSuccess = ({ numPages }) => {
		setNumPages(numPages);
	};

	const handleDownload = async () => {
		try {
			const response = await fetch(
				`https://pdf-server-809j.onrender.com/pdf/${id}`
			);
			const blob = await response.blob();

			const fileURL = URL.createObjectURL(blob);

			const link = document.createElement('a');
			link.href = fileURL;
			link.target = '_blank';
			link.rel = 'noopener noreferrer';

			link.click();

			URL.revokeObjectURL(fileURL);
			link.remove();
		} catch (error) {
			console.error('Error downloading PDF:', error);
		}
	};

	const [screenSize, setScreenSize] = useState({
		width: window.innerWidth,
		height: window.innerHeight,
	});

	useEffect(() => {
		const handleResize = () => {
			setScreenSize({
				width: window.innerWidth,
				height: window.innerHeight,
			});
		};

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	const location = useLocation();
	const navigate = useNavigate();

	const handleGoBack = () => {
		navigate(-1);
	};

	if (!pdfData || !pdfData.path) {
		return <div>Loading PDF...</div>;
	}

	return (
		<div className='min-h-screen flex flex-col'>
			<div className='flex items-center justify-center'>
				<div className='flex items-center justify-between px-4 py-2 bg-gray-200 sm:w-[600px] w-[400px]'>
					<div className='text-normal flex items-center'>
						<button
							className='items-center text-center text-white focus:outline-none bg-black rounded-full mr-5'
							onClick={handleGoBack}>
							<IoIosArrowBack size={20} />
						</button>
						Number of Pages: {numPages}
					</div>
					<button
						className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-xs'
						onClick={handleDownload}>
						Download PDF
					</button>
				</div>
			</div>
			<div className='flex-1 overflow-y-auto mx-4 my-2'>
				<Document
					file={`https://pdf-server-809j.onrender.com/${pdfData.path}`}
					className='flex flex-col items-center'
					onLoadSuccess={handlePdfLoadSuccess}>
					{Array.from(new Array(numPages), (el, index) => (
						<Page
							key={index}
							pageNumber={index + 1}
							renderTextLayer={false}
							width={screenSize.width < 700 ? 400 : 600}
							className='mt-5'
						/>
					))}
				</Document>
			</div>
		</div>
	);
};

export default PdfView;

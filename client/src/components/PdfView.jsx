import React, { useState, useEffect, useRef } from 'react';
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
	const pdfRef = useRef();

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

	const navigate = useNavigate();

	const handleGoBack = () => {
		navigate(-1);
	};

	const handleDownload = () => {
		const url = `https://pdf-server-809j.onrender.com/${pdfData.path}`;
		fetch(url)
			.then((response) => response.blob())
			.then((blob) => {
				const downloadLink = URL.createObjectURL(blob);
				const a = document.createElement('a');
				a.href = downloadLink;
				a.download = 'download.pdf';
				a.click();
				URL.revokeObjectURL(downloadLink);
			})
			.catch((error) => {
				console.log('Error downloading PDF:', error);
			});
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
						className='items-center text-center text-white focus:outline-none bg-blue-500 rounded-full px-4 py-2'
						onClick={handleDownload}>
						Download PDF
					</button>
				</div>
			</div>
			<div className='flex-1 overflow-y-auto mx-4 my-2' ref={pdfRef}>
				<Document
					file={`https://pdf-server-809j.onrender.com/${pdfData.path}`}
					className='flex flex-col items-center'
					onLoadSuccess={handlePdfLoadSuccess}>
					{Array.from(new Array(numPages), (el, index) => (
						<Page
							key={index}
							pageNumber={index + 1}
							renderTextLayer={false}
							height={null}
							width={screenSize.width < 700 ? 200 : 600}
							className='mt-5'
						/>
					))}
				</Document>
				<br />
			</div>
		</div>
	);
};

export default PdfView;

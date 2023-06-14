import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Document, Page, pdfjs } from 'react-pdf';
import QRCode from 'react-qr-code';
import html2canvas from 'html2canvas';
import { Link } from 'react-router-dom';
import { IoIosArrowForward, IoIosWarning, IoIosDownload } from 'react-icons/io';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
const Alert = React.forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});
import Navbar from './NavBar';
const PdfDetails = () => {
	const { id } = useParams();
	const [pdfData, setPdfData] = useState(null);
	const [open, setOpen] = useState(false);
	const qrCodeRef = useRef(null);
	const Navigate = useNavigate();
	const [alertMsg, setAlertMsg] = useState('');
	const handleClick = () => {
		setOpen(true);
	};
	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpen(false);
	};
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
				setAlertMsg('success');
				handleClick();
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
	useEffect(() => {
		if (alertMsg === 'success') {
			const performActionAfterInterval = () => {
				Navigate('/pdf');
			};
			const timeout = setTimeout(performActionAfterInterval, 2000);
			return () => {
				clearTimeout(timeout);
			};
		}
	}, [alertMsg]);
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
	return (
		<>
			<div className='mt-[-40px]'>
				<Navbar />
			</div>
			<h1 className='text-3xl text-center font-bold mb-4 mt-10'>
				PDF Details
			</h1>
			<div className='container'>
				{pdfData ? (
					<div className='flex justify-around mt-5 flex__col'>
						<div className='qr-code-section'>
							<h1 className='flex items-center justify-center title'>
								<button
									onClick={handleDownloadQRCode}
									className=''>
									<IoIosDownload
										size={32}
										className='cursor-pointer'
									/>
								</button>
								<span className='ml-3'>QR Code</span>
							</h1>
							<div className='qr-code bg-white' ref={qrCodeRef}>
								<QRCode
									className='w-[200px] h-[200px] space_top'
									value={`https://qr-plan.netlify.app/pdf/view/${pdfData._id}`}
								/>
							</div>
							<div className='mt-5 pdf-details-info'>
								<h1 className='font-bold text-lg'>
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
							className='flex justify-between flex-col-reverse items-center flex-col ml-5 p-10 mb-5'>
							<div className='pdf__footer'>
								<Link
									to={`/pdf/view/${id}`}
									className='buttons__style_link__h buttons__style_link__left bg-gray-200'>
									<span>Open Pdf</span> <IoIosArrowForward />
								</Link>
								<div
									className='cursor-pointer button__left uppercase text-sm tracking-wide bg-blue-500 text-gray-100 px-2 py-1 ml-1 rounded-md focus:outline-none focus:shadow-outline hover:bg-red-500'
									onClick={handleDelete}>
									Delete
								</div>
							</div>
							<div className='pdf-preview' key={pdfData._id}>
								<Document
									file={`https://pdf-server-809j.onrender.com/${pdfData.path}`}
									onLoadSuccess={handlePdfLoadSuccess}
									className='hidden__class'>
									{pdfLoaded && (
										<Page
											pageNumber={1}
											width={
												screenSize.width < 700
													? 400
													: 230
											}
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
			<Stack spacing={2} sx={{ width: '100%' }}>
				<Snackbar
					open={open}
					autoHideDuration={6000}
					onClose={handleClose}>
					<Alert
						onClose={handleClose}
						severity='success'
						sx={{ width: '100%' }}>
						Fichier supprimer avec succès
					</Alert>
				</Snackbar>
			</Stack>
		</>
	);
};
export default PdfDetails;

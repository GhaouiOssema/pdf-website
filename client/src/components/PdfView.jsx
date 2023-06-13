import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PdfView = () => {
	const { id } = useParams();
	const [pdfData, setPdfData] = useState(null);
	const [numPages, setNumPages] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);

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

	const goToNextPage = () => {
		if (currentPage < numPages) {
			setCurrentPage(currentPage + 1);
		}
	};

	const goToPreviousPage = () => {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1);
		}
	};

	if (!pdfData || !pdfData.path) {
		return <div>Loading PDF...</div>;
	}

	return (
		<div className='pdf-view-container'>
			<div className='pdf-view-toolbar'>
				<span>Number of Pages: {numPages}</span>
				<button onClick={goToPreviousPage} disabled={currentPage === 1}>
					Previous
				</button>
				<span>
					{currentPage}/{numPages}
				</span>
				<button
					onClick={goToNextPage}
					disabled={currentPage === numPages}>
					Next
				</button>
			</div>
			<div className='pdf-view-content'>
				<Document
					file={`https://pdf-server-809j.onrender.com/${pdfData.path}`}
					onLoadSuccess={handlePdfLoadSuccess}>
					<Page pageNumber={currentPage} renderTextLayer={false} />
				</Document>
			</div>
		</div>
	);
};

export default PdfView;

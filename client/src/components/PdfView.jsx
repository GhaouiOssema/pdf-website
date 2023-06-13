import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

const PdfView = () => {
	const { id } = useParams();
	const [pdfData, setPdfData] = useState(null);

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

	const [pdfLoaded, setPdfLoaded] = useState(false);

	const handlePdfLoadSuccess = () => {
		setPdfLoaded(true);
	};
	return (
		<Document
			file={`https://pdf-server-809j.onrender.com/${pdfData.path}`}
			onLoadSuccess={handlePdfLoadSuccess}>
			{pdfLoaded && (
				<Page
					pageNumber={1}
					width={400}
					height={400}
					renderTextLayer={false}
				/>
			)}
		</Document>
	);
};

export default PdfView;

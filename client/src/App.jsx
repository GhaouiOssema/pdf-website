// src/App.js

import React, { useState, useEffect } from 'react';
import PdfFile from './components/PdfFile';
import FormSend from './components/FormSend';
import PdfDetails from './components/PdfDetails';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Navbar from './components/NavBar';

const App = () => {
	return (
		<div className='container mx-auto p-4 flex flex-col flex-wrap'>
			<Router>
				<Navbar />
				<div className='mt-10'>
					<Routes>
						<Route path='/*' element={<FormSend />} />
						<Route path='/pdf' element={<PdfFile />} />
						<Route path='pdf/:id' element={<PdfDetails />} />
					</Routes>
				</div>
			</Router>
		</div>
	);
};

export default App;

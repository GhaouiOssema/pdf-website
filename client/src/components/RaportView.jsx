import { Box, Container, CssBaseline } from '@mui/material';
import React from 'react';

const RaportView = () => {
	return (
		<>
			<CssBaseline />
			<Container fixed>
				<Box
					sx={{
						bgcolor: '#cfe8fc',
						height: '80vh',
						borderRadius: '25px',
					}}
				/>
			</Container>
		</>
	);
};

export default RaportView;

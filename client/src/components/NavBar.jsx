import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { FiMenu, FiX } from 'react-icons/fi';

const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};
	const location = useLocation();
	const navigate = useNavigate();

	const handleGoBack = () => {
		navigate(-1);
	};
	const handleGoNext = () => {
		navigate(+1);
	};

	return (
		<nav className='bg-gray-800'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='flex items-center justify-between h-16'>
					<div>
						{location.pathname !== '/' && (
							<button
								className='text-white focus:outline-none flex items-center'
								onClick={handleGoBack}>
								<IoIosArrowBack size={20} />
								<IoIosArrowForward size={20} />
							</button>
						)}
					</div>
					<div className='hidden md:block'>
						<div className='ml-4 flex items-center space-x-4'>
							<Link
								to={'/'}
								className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'>
								Upload
							</Link>
							<Link
								to={'/pdf'}
								className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'>
								All Pdfs
							</Link>
						</div>
					</div>
					<div className='md:hidden'>
						<button
							onClick={toggleMenu}
							type='button'
							className='inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'
							aria-controls='mobile-menu'
							aria-expanded='false'>
							<span className='sr-only'>Open main menu</span>
							{!isOpen ? (
								<FiMenu className='block h-6 w-6' />
							) : (
								<FiX className='block h-6 w-6' />
							)}
						</button>
					</div>
				</div>
			</div>

			{isOpen && (
				<div className='md:hidden' id='mobile-menu'>
					<div className='px-2 pt-2 pb-3 space-y-1 sm:px-3'>
						<Link
							to={'/upload'}
							className='text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium'>
							Upload
						</Link>
						<Link
							to={'/pdf'}
							className='text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium'>
							All Pdfs
						</Link>
					</div>
				</div>
			)}
		</nav>
	);
};

export default Navbar;

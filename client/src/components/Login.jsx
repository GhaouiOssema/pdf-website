import { React, useState } from 'react';
import './Login.css';

const Login = () => {
	return (
		<div className='background-login'>
			<div className='container-login'>
				<div className='screen'>
					<div className='screen__content'>
						<div className='login'>
							<div className='login__field'>
								<i className='login__icon fas fa-user'></i>
								<input
									type='email'
									name='email'
									className='login__input'
									placeholder='Email'
								/>
							</div>
							<div className='login__field'>
								<i className='login__icon fas fa-lock'></i>
								<input
									type='password'
									name='password'
									className='login__input'
									placeholder='Password'
								/>
							</div>
							<button
								className='button login__submit'
								onClick={Login}>
								<span className='button__text'>Log In Now</span>
								<i className='button__icon fas fa-chevron-right'></i>
							</button>
						</div>
						{/* <div className='create-account'>
							<NavLink to='/register'>
								<span>Create Account</span>
							</NavLink>
						</div> */}
					</div>
					<div className='screen__background'>
						<span className='screen__background__shape screen__background__shape4'></span>
						<span className='screen__background__shape screen__background__shape3'></span>
						<span className='screen__background__shape screen__background__shape2'></span>
						<span className='screen__background__shape screen__background__shape1'></span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;

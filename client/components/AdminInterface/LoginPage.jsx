import React, { useState } from 'react';
import { Redirect } from 'react-router';
import API from '../../api';
import useAuth from '../../hooks/useAuth';
import usePageTitle from '../../hooks/usePageTitle';
import Header from '../Header';
import Input from '../Input';

const LoginPage = () => {
	const usernameState = useState('');
	const passwordState = useState('');
	const [authToken, setAuthToken] = useAuth();
	usePageTitle('Log In - Admin');

	const params = new URLSearchParams(window.location.search);
	if (authToken) return <Redirect to={params.get('next') || '/admin/comics'} />;

	const login = () =>
		API.post(
			'/user/login',
			{
				username: usernameState[0],
				password: passwordState[0],
			},
			{
				success: ({ token }) => setAuthToken(token),
				fail: () => {},
			}
		);

	return (
		<div className="form--center">
			<Header title="Admin - Log In" className="mb-20" />
			<Input label="Username" localState={usernameState} />
			<Input label="Password" type="password" localState={passwordState} />
			<button className="dynamic submit" onClick={login}>
				Log In
			</button>
		</div>
	);
};

export default LoginPage;

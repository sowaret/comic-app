import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import useAuth from '../../hooks/useAuth';

const LogoutComponent = () => {
	const [, , , logout] = useAuth();
	const [navigate, setNavigate] = useState(false);

	useEffect(() => {
		setNavigate(true);
		logout();
	}, []);

	return navigate ? <Redirect to="/admin" /> : null;
};

export default LogoutComponent;

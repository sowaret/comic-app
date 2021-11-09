import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useLocation } from 'react-router';
import { setToken } from '../features/adminSlice';
import { useLocalStorage } from './useStorage';
import useUpdateEffect from './useUpdateEffect';

export default useAuth = (redirectPath = '/admin') => {
	const [storageValue, setStorageValue, logout] = useLocalStorage(
		'admin-token',
		null
	);
	const { token } = useSelector(state => state.admin.auth);
	const { pathname } = useLocation();
	const dispatch = useDispatch();

	useUpdateEffect(() => {
		dispatch(setToken(storageValue));
	}, [storageValue]);

	return [
		storageValue || token,
		setStorageValue,
		<Redirect to={redirectPath + '?next=' + pathname} />,
		logout,
	];
};

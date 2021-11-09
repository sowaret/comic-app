import { useCallback, useState } from 'react';
import useUpdateEffect from './useUpdateEffect';

const useStorage = (key, defaultValue, storageObject) => {
	const [value, setValue] = useState(() => {
		const storageValue = storageObject.getItem(key);
		return storageValue === null ? defaultValue : JSON.parse(storageValue);
	});

	useUpdateEffect(() => {
		if (value === undefined) return storageObject.removeItem(key);
		storageObject.setItem(key, JSON.stringify(value));
	}, [key, value, storageObject]);

	const remove = useCallback(() => {
		setValue(undefined);
	}, []);

	return [value, setValue, remove];
};

export const useLocalStorage = (key, defaultValue) =>
	useStorage(key, defaultValue, window.localStorage);

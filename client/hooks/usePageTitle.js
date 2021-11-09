import { useEffect } from 'react';
import { formatString } from '../utils/app';

export default usePageTitle = (
	templateString,
	values = {},
	dependencies = []
) => {
	useEffect(() => {
		document.title = formatString(
			templateString + ' | ' + process.env.SITE_TITLE,
			values
		);
	}, [dependencies]);

	// On unmount, reset page title to default
	useEffect(
		() => () => {
			document.title = process.env.SITE_TITLE;
		},
		[]
	);
};

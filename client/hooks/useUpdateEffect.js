import { useEffect, useState } from 'react';

export default useUpdateEffect = (callback, dependencies) => {
	const [isFirstRender, setIsFirstRender] = useState(true);

	useEffect(() => {
		if (isFirstRender) {
			setIsFirstRender(false);
			return;
		}
		return callback();
	}, dependencies);
};

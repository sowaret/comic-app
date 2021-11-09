import React, { useState } from 'react';
import { mediaUrlStyle } from '../../../../../utils/style';
import useDebounce from '../../../../hooks/useDebounce';
import Input from '../../../Input';
import '../styles/SocialInput';

const SocialInput = ({ index, siteName }) => {
	const computedLogoStyle = {
		...(siteName && {
			backgroundImage: mediaUrlStyle(`sites/${siteName.toLowerCase()}.png`),
		}),
	};
	const [logoStyle, setLogoStyle] = useState(computedLogoStyle);
	const inputReduxValue = key => `socialLinks/list/${index}/${key}`;

	useDebounce(() => setLogoStyle(computedLogoStyle), 500, [siteName]);

	return (
		<div className="social-input">
			<div className="social-input__site-logo" style={logoStyle} />
			<Input label="Site name" wide reduxValue={inputReduxValue('siteName')} />
			<Input label="Username" wide reduxValue={inputReduxValue('username')} />
			<Input label="Site URL" wide reduxValue={inputReduxValue('siteUrl')} />
		</div>
	);
};

export default SocialInput;

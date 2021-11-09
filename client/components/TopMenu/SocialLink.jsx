import React, { useState } from 'react';
import { mediaUrlStyle } from '../../../utils/style';
import useDebounce from '../../hooks/useDebounce';

const SocialLink = ({ siteName, siteUrl, username }) => {
	const computedLogoStyle = {
		...(siteName && {
			backgroundImage: mediaUrlStyle(`sites/${siteName.toLowerCase()}.png`),
		}),
	};
	const [logoStyle, setLogoStyle] = useState(computedLogoStyle);

	useDebounce(() => setLogoStyle(computedLogoStyle), 500, [siteName]);

	return (
		<a
			href={siteUrl}
			className="top-menu__social-link"
			target="_blank"
			title={`${username} on ${siteName}`}
			style={logoStyle}
		/>
	);
};

export default SocialLink;

import React from 'react';
import { Link } from 'react-router-dom';

export const CoverLink = ({ icon, title, to, children }) =>
	React.createElement(
		to ? Link : 'div',
		{
			...(to && { to }),
			className: `comic-cover__link ${icon}`,
			title,
		},
		<>
			<div className="comic-cover__link-icon">{icon}</div>
			{children}
		</>
	);

export const ReadLink = ({ latest, titleSlug }) => (
	<CoverLink
		to={`/comic/${titleSlug}${latest ? '/latest' : ''}`}
		icon={latest ? 'auto_stories' : 'book'}
	>
		Read {latest ? 'latest' : 'first'} page
	</CoverLink>
);

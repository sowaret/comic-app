import React from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { mediaUrlStyle } from '../../../utils/style';
import './style';

const Page = ({ title, images, number, releaseDate, titleSlug }) => {
	const { titleSlug: comicTitleSlug } = useParams();

	return (
		<Link
			className="archive-page"
			to={`/comic/${comicTitleSlug}/${number}/${titleSlug}`}
		>
			<div
				className="archive-page__thumb"
				style={{
					backgroundImage: mediaUrlStyle(
						`comic-panel/thumb/${images[0].filename}`
					),
				}}
			/>
			<div className="archive-page__number">{number}</div>
			<div className="archive-page__title">{title}</div>
			<div className="archive-page__date">{releaseDate}</div>
		</Link>
	);
};

export default Page;

import React from 'react';
import usePageTitle from '../../hooks/usePageTitle';
import { useLocalStorage } from '../../hooks/useStorage';
import Header from '../Header';
import FollowPageLink from './FollowPageLink';

const PageView = ({ comic, pageIndex, pages, titleSlug }) => {
	// State
	const [useGifs, setUseGifs] = useLocalStorage('useGifs', true);
	// Configuration
	if (pageIndex === 'latest') pageIndex = pages.length - 1;

	const {
		authorComment,
		images,
		releaseDate,
		title: pageTitle,
	} = pages[pageIndex];
	const previousPage = pageIndex && pages[pageIndex - 1];
	const nextPage = pageIndex < pages.length && pages[pageIndex + 1];

	const display = {
		headerTitle: `${comic.title} - ${pageTitle}`,
		images: images.map((image, i) => (
			<img
				src={`${process.env.MEDIA_URL}comic-panel/${
					(useGifs && image.animatedFilename) || image.filename
				}`}
				key={i}
			/>
		)),
		authorComment: authorComment && (
			<div className="comic__author-comment">
				<div className="author-comment__icon">rate_review</div>
				<div className="author-comment__text">{authorComment}</div>
			</div>
		),
	};

	usePageTitle(
		'${comicTitle}: ${pageTitle}',
		{ comicTitle: comic.title, pageTitle },
		[comic, pageIndex]
	);

	return (
		<>
			<Header
				title={display.headerTitle}
				buttonIcon="gif"
				buttonTitle="Toggle GIF panels"
				onClick={() => setUseGifs(!useGifs)}
			/>
			{display.images}
			{display.authorComment}

			<div className="comic__nav">
				<FollowPageLink {...{ titleSlug }} page={previousPage} previous />
				<div className="comic__nav__current">
					<div>
						<div className="nav__current__title">{pageTitle}</div>
						<div className="comic__date">{releaseDate}</div>
					</div>
				</div>
				<FollowPageLink {...{ titleSlug }} page={nextPage} />
			</div>
		</>
	);
};

export default PageView;

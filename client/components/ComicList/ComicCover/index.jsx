import React from 'react';
import { Link } from 'react-router-dom';
import useClasses from '../../../hooks/useClasses';
import { CoverLink, ReadLink } from './Links';
import './style';
import './shelf';
import './shelf.mini';

const ComicCover = ({
	title,
	titleSlug,
	bannerFilename,
	description,
	emblemName,
	lastUpdateDate,
	pageCount,
	admin,
	shelf,
	mini,
}) => {
	const baseUrl = `${admin ? '/admin' : ''}/comic/${titleSlug}`;
	const coverMediaUrl =
		process.env.MEDIA_URL +
		`comic-${shelf ? 'cover' : 'banner'}/` +
		(shelf ? titleSlug + '.png' : bannerFilename);

	const descriptionParagraphs = description
		.split('\n')
		.map((paragraph, key) => React.createElement('p', { key }, paragraph));

	const lastUpdatedCoverLink = (
		<CoverLink icon="edit">Last updated: {lastUpdateDate || 'TBD'}</CoverLink>
	);

	const descriptionDisplay = (
		<div className="comic-cover__description">
			<div className="comic-cover__description-paragraphs">
				{descriptionParagraphs}
			</div>
		</div>
	);
	const display = {
		banner: (
			<Link
				to={baseUrl}
				className="comic-cover__main-link"
				title={shelf ? '' : `Begin reading ${title}`}
			>
				<img
					src={coverMediaUrl}
					className="comic-cover__banner"
					alt={`${title} banner`}
				/>
				{shelf && !mini && descriptionDisplay}
			</Link>
		),
		title: <div className="comic-cover__title">{title}</div>,
		infoLinks: (
			<div className="comic-cover__info">
				<CoverLink
					to={`${baseUrl}/archive`}
					icon="description"
					title="View archive"
				>
					{pageCount || 'No'} page{pageCount === 1 || 's'}
				</CoverLink>
				{lastUpdatedCoverLink}
			</div>
		),
	};

	return (
		<div
			className={useClasses('comic-cover', shelf && 'shelf', mini && 'mini')}
		>
			{display.banner}
			<div className="comic-cover__decoration">{emblemName}</div>
			{shelf && display.title}
			{shelf && lastUpdatedCoverLink}
			{!shelf && descriptionDisplay}
			<div className="comic-cover__links">
				{!shelf && display.infoLinks}
				<div className="comic-cover__read-links">
					{!mini && <ReadLink titleSlug={titleSlug} />}
					<ReadLink titleSlug={titleSlug} latest />
				</div>
			</div>
		</div>
	);
};

export default ComicCover;

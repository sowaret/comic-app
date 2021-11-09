import React from 'react';
import { Link } from 'react-router-dom';

const FollowPageLink = ({ titleSlug, page, previous }) =>
	page ? (
		<Link
			className={`nav__follow-page-link${previous ? ' previous' : ''}`}
			to={`/comic/${titleSlug}/${page.number}/${page.titleSlug}`}
			onClick={() => window.scroll(0, 160)}
		>
			<div className="follow-page-link__arrow">
				keyboard_arrow_{previous ? 'left' : 'right'}
			</div>
			<div className="follow-page-link__title">{page.title}</div>
			<div className="comic__date">{page.releaseDate}</div>
		</Link>
	) : null;

export default FollowPageLink;

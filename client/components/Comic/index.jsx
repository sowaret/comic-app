import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import ComicPagesLoader from '../Loader/ComicPages';
import PageView from './PageView';
import './style';

const Comic = () => {
	// Configuration
	const { titleSlug, pageId: _pageId } = useParams();
	const pageIndex = _pageId
		? _pageId === 'latest'
			? 'latest'
			: parseInt(_pageId) - 1
		: 0;
	// State
	const comic = useSelector(state => state.comic.list[titleSlug]);

	return (
		<div className="comic">
			<ComicPagesLoader
				component={PageView}
				componentProps={{ comic, pageIndex, titleSlug }}
				{...{ titleSlug }}
			/>
		</div>
	);
};

export default Comic;

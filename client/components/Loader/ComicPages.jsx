import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import API from '../../API';
import { setComicPages, setIsLoadingPages } from '../../features/comicSlice';
import Loader from '.';

const ComicPagesLoader = ({ component, componentProps = {}, titleSlug }) => {
	const isLoadingPages = useSelector(state => state.comic.isLoadingPages);
	const comicList = useSelector(state => state.comic.list);
	const pages = useSelector(state => state.comic.list[titleSlug]?.pages);
	const dispatch = useDispatch();

	// On mount, load pages if they haven't been loaded yet
	useEffect(() => {
		if (isLoadingPages || pages || !comicList || !Object.keys(comicList).length)
			return;

		dispatch(setIsLoadingPages(true));
		API.get(`/comic/pages/${titleSlug}`, null, {
			success: pages => {
				dispatch(setComicPages({ titleSlug, pages }));
				dispatch(setIsLoadingPages(false));
			},
			fail: console.log,
		});
	}, [comicList]);

	return isLoadingPages || !pages ? (
		<Loader />
	) : (
		React.createElement(component, { ...componentProps, pages })
	);
};

export default ComicPagesLoader;

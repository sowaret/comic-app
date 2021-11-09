import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import API from '../../API';
import { setFooterText, setSocialLinks } from '../../features/adminSlice';
import { setComicList, setIsLoadingComicList } from '../../features/comicSlice';
import Loader from '.';

const ComicListLoader = ({ mini, component, componentProps = {} }) => {
	const isLoadingComicList = useSelector(
		state => state.comic.isLoadingComicList
	);
	const comicList = useSelector(state => state.comic.list);
	const dispatch = useDispatch();

	const loaderDisplay = mini ? 'Loading comics...' : <Loader />;

	// On mount, get the list of comics if it hasn't already been fetched
	useEffect(() => {
		if (isLoadingComicList || Object.keys(comicList).length) return;

		dispatch(setIsLoadingComicList(true));
		API.get(
			'/comic/list',
			null,
			{
				success: ({ comics, config, socialLinks }) =>
					dispatch(setIsLoadingComicList(false)) &&
					dispatch(setComicList(comics)) &&
					dispatch(setFooterText(config.footerText)) &&
					dispatch(setSocialLinks(socialLinks)),
				fail: console.log,
			}
		);
	}, []);

	return isLoadingComicList
		? loaderDisplay
		: React.createElement(component, { ...componentProps, comicList });
};

export default ComicListLoader;

import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import usePageTitle from '../../hooks/usePageTitle';
import Header from '../Header';
import ComicPagesLoader from '../Loader/ComicPages';
import PageList from './PageList';

const Archive = ({ header = true }) => {
	const { titleSlug } = useParams();
	const comicTitle = useSelector(state => state.comic.list[titleSlug]?.title);

	const headerTitle = (comicTitle ? comicTitle + ' - ' : '') + 'Archive';

	usePageTitle('${comicTitle} - Archive', { comicTitle }, [comicTitle]);

	return (
		<>
			{header && <Header title={headerTitle} className="sticky" />}
			<ComicPagesLoader component={PageList} {...{ titleSlug }} />
		</>
	);
};

export default Archive;

import React from 'react';
import { useSelector } from 'react-redux';
import { Route, useParams, useRouteMatch } from 'react-router-dom';
import usePageTitle from '../../hooks/usePageTitle';
import AddPagePanel from '../AdminInterface/Panels/AddPage';
import Header from '../Header';
import Archive from './';

const AdminPagesArchive = ({ pagesData = [] }) => {
	const { comicTitleSlug } = useParams();
	const { path, url } = useRouteMatch();
	const comic = useSelector(state => state.comic.list[comicTitleSlug]);
	const { bannerFilename, title } = comic || {};

	const coverMediaUrl =
		bannerFilename && process.env.MEDIA_URL + 'comic-banner/' + bannerFilename;

	usePageTitle('${title} - Archive - Admin', { title }, [comic]);

	return (
		<>
			<img src={coverMediaUrl} className="comic-cover__banner" />
			<Header
				title="Pages"
				buttonIcon="add"
				buttonLinkTo={`${url}/add-page`}
				buttonTitle="Add a page"
			/>
			<Route path={`${path}/add-page`}>
				<AddPagePanel />
			</Route>
			<Archive header={false} />
		</>
	);
};

export default AdminPagesArchive;

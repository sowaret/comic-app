import React from 'react';
import { Route, useRouteMatch } from 'react-router-dom';
import usePageTitle from '../../hooks/usePageTitle';
import CreateComicPanel from '../AdminInterface/Panels/CreateComic';
import Header from '../Header';
import ComicListLoader from '../Loader/ComicList';
import ComicListContainer from './Container';
import './style';

const ComicList = ({ admin = false, shelf = false, mini = false }) => {
	const { path, url } = useRouteMatch();

	const display = {
		header: React.createElement(Header, {
			title: 'Comics',
			...(admin && {
				buttonIcon: 'add',
				buttonLinkTo: `${url}/create`,
				buttonTitle: 'Create a new comic',
			}),
		}),
		creationPanel: (
			<Route path={`${path}/create`}>
				<CreateComicPanel />
			</Route>
		),
	};

	!mini && // Prevent menu dropdown from affecting page title
		usePageTitle(
			shelf && !admin ? 'Home' : 'Comics' + (admin ? ' - Admin' : '')
		);

	return (
		<>
			{(!shelf || admin) && display.header}
			{admin && display.creationPanel}
			<ComicListLoader
				component={ComicListContainer}
				componentProps={{ admin, shelf, mini }}
				{...{ mini }}
			/>
		</>
	);
};

export default ComicList;

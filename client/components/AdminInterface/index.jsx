import React from 'react';
import { Route, Switch, useLocation, useRouteMatch } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import AdminPagesArchive from '../Archive/Admin';
import ComicList from '../ComicList';
import LoginPage from './LoginPage';
import LogoutComponent from './LogoutComponent';
import SitePanel from './Panels/Site';
import SocialLinksPanel from './Panels/SocialLinks';
import AdminTopMenu from './TopMenu';

const AdminInterface = () => {
	const { path } = useRouteMatch();
	const { pathname } = useLocation();
	const [token, , redirect] = useAuth();
	if (!token && pathname !== '/admin') return redirect;

	return (
		<div className="admin-interface">
			<Switch>
				<Route path={`${path}/logout`} exact component={LogoutComponent} />
				<Route path={path} exact component={LoginPage} />
				<Route path={path}>
					<AdminTopMenu />
					<Route path={`${path}/comics`} children={<ComicList admin shelf />} />
					<Route
						path={`${path}/comic/:comicTitleSlug`}
						component={AdminPagesArchive}
					/>
					<Route path={`${path}/site`} exact component={SitePanel} />
					<Route path={`${path}/social`} exact component={SocialLinksPanel} />
				</Route>
			</Switch>
		</div>
	);
};

export default AdminInterface;

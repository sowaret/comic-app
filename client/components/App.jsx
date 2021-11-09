import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AdminInterface from './AdminInterface';
import Archive from './Archive';
import Comic from './Comic';
import ComicList from './ComicList';
import Footer from './Footer';
import TopMenu from './TopMenu';
import './styles/App';

const App = () => (
	<Router>
		<TopMenu />
		<div className="content-container">
			<Switch>
				<Route exact path="/">
					<div className="welcome-header">comics</div>
					<ComicList shelf />
				</Route>
				<Route exact path="/comics" component={ComicList} />
				<Route path="/admin" component={AdminInterface} />

				<Route path="/comic/:titleSlug/archive" component={Archive} />
				<Route path="/comic/:titleSlug/:pageId" component={Comic} />
				<Route path="/comic/:titleSlug" component={Comic} />
			</Switch>
		</div>
		<Footer />
	</Router>
);

export default App;

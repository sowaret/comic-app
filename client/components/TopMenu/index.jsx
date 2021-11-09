import React from 'react';
import { useSelector } from 'react-redux';
import { mediaUrlStyle } from '../../../utils/style';
import useAuth from '../../hooks/useAuth';
import ComicList from '../ComicList';
import MenuLink from './MenuLink';
import SocialLink from './SocialLink';
import './style';

const menuBackgroundStyle = {
	backgroundImage: `linear-gradient(180deg, #0000 0%, #2226 100%), ${mediaUrlStyle(
		'menu-background.jpg'
	)}`,
};

const TopMenu = () => {
	const [token] = useAuth();
	const socialLinks = useSelector(state => state.admin.socialLinks.list);

	const adminMenu = (
		<>
			<MenuLink label="Admin" color="#FD0" />
			<MenuLink label="Log Out" to="/admin/logout" />
		</>
	);

	return (
		<div className="top-menu" style={menuBackgroundStyle}>
			<div className="top-menu__links">
				<MenuLink to="/" label="Home" exact />
				<MenuLink label="Comics">
					<ComicList shelf mini />
				</MenuLink>
				<MenuLink label="About" />
				<MenuLink label="Contact" />
				{token ? adminMenu : null}
			</div>
			<div className="top-menu__social-links">
				{socialLinks.map((link, i) => (
					<SocialLink {...link} key={i} />
				))}
			</div>
		</div>
	);
};

export default TopMenu;

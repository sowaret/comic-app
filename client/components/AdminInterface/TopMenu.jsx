import React from 'react';
import MenuLink from '../TopMenu/MenuLink';
import './styles/TopMenu';

const AdminTopMenu = () => (
	<div className="admin-interface__top-menu">
		<MenuLink label="Comics" to="/admin/comics" />
		<MenuLink label="Site Settings" to="/admin/site" />
		<MenuLink label="Social Links" to="/admin/social" />
	</div>
);

export default AdminTopMenu;

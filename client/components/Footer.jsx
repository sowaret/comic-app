import React from 'react';
import { useSelector } from 'react-redux';
import './styles/Footer';

const Footer = () => {
	const footerText = useSelector(state => state.admin.site.footerText);
	return <div className="footer">{footerText || '\u00A0'}</div>;
};

export default Footer;

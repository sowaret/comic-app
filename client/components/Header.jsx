import React from 'react';
import { Link } from 'react-router-dom';
import useClasses from '../hooks/useClasses';
import './styles/Header';

const Header = ({
	buttonLinkTo,
	buttonIcon,
	buttonTitle,
	className,
	onClick,
	title,
}) => {
	const hasButton = buttonLinkTo || onClick;
	const buttonDisplay =
		hasButton &&
		React.createElement(
			buttonLinkTo ? Link : 'button',
			{
				className: 'header__button dynamic',
				title: buttonTitle,
				...(buttonLinkTo && { to: buttonLinkTo }),
				...(onClick && { onClick }),
			},
			buttonIcon
		);

	return (
		<div
			className={useClasses('header', className, !hasButton && 'align-center')}
		>
			<div className="header__title">{title}</div>
			{buttonDisplay}
		</div>
	);
};

export default Header;

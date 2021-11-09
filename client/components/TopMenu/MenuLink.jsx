import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link, useRouteMatch } from 'react-router-dom';
import useClasses from '../../hooks/useClasses';

const MenuLink = ({ to, label, exact, color, children }) => {
	const [isHovering, _setIsHovering] = useState(false);
	const setIsHovering = val => children && _setIsHovering(val);
	const dropdownRef = useRef();

	// Use label for link if none is provided
	to = to || '/' + label.toLowerCase();

	const isActive = useRouteMatch({ path: to, exact });
	const colourStyle = color ? { color } : {};

	const closeDropdown = e =>
		['A', 'IMG'].includes(e.target.tagName)
			? setIsHovering(false)
			: e.stopPropagation();

	const dropdownPortal =
		children &&
		createPortal(
			<div
				className={`top-menu__dropdown${isHovering ? ' visible' : ''}`}
				onClick={closeDropdown}
				ref={dropdownRef}
			>
				{children}
			</div>,
			document.getElementById('root')
		);

	useEffect(() => {
		if (!children) return;

		const updateDropdownPosition = () => {
			const menuElement = document.querySelector('.top-menu');
			dropdownRef.current.style.top =
				menuElement.offsetTop + menuElement.clientHeight + 'px';
		};

		document.addEventListener('scroll', updateDropdownPosition);
		return (cleanup = () =>
			document.removeEventListener('scroll', updateDropdownPosition));
	}, []);

	return React.createElement(
		isActive ? 'div' : Link,
		{
			...(!isActive && { to }),
			className: useClasses('top-menu__link', isActive && 'active'),
			style: colourStyle,
			onClick: () => _setIsHovering(false),
			onMouseEnter: () => !isActive && setIsHovering(true),
			onMouseLeave: () => setIsHovering(false),
		},
		label,
		<div className="top-menu__link-indicator" />,
		dropdownPortal
	);
};

export default MenuLink;

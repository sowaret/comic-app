import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import API from '../../../../API';
import { appendNewLink } from '../../../../features/adminSlice';
import useAuth from '../../../../hooks/useAuth';
import usePageTitle from '../../../../hooks/usePageTitle';
import Header from '../../../Header';
import SocialInput from './SocialInput';

const SocialLinksPanel = () => {
	const [token] = useAuth();
	const socialLinks = useSelector(state => state.admin.socialLinks.list);
	const dispatch = useDispatch();

	const save = () =>
		API.post(
			'/socialLink/update',
			socialLinks,
			{
				success: {},
			},
			{ Authorization: `Bearer ${token}` }
		);

	usePageTitle('Social Links - Admin');

	return (
		<>
			<Header
				title="Social links"
				buttonIcon="add"
				buttonTitle="Add a link"
				onClick={() => dispatch(appendNewLink())}
			/>
			<div>
				{socialLinks.map((link, index) => (
					<SocialInput {...link} index={index} key={index} />
				))}
			</div>
			<button className="submit dynamic" onClick={save}>
				Save links
			</button>
		</>
	);
};

export default SocialLinksPanel;

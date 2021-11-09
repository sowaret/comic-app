import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import API from '../../../API';
import useAuth from '../../../hooks/useAuth';
import usePageTitle from '../../../hooks/usePageTitle';
import Header from '../../Header';
import Input from '../../Input';
import FileInput from '../../Input/File';

const SitePanel = () => {
	const [token] = useAuth();

	const footerText = useSelector(state => state.admin.site.footerText);
	const [originalFooterText, setOriginalFooterText] = useState(footerText);

	const hasChanges = footerText !== originalFooterText;

	const saveSettings = () => {
		if (!hasChanges) return;
		API.post(
			'/siteSettings/update',
			{ footerText },
			{
				success: () => setOriginalFooterText(footerText),
			},
			{ Authorization: `Bearer ${token}` }
		);
	};

	usePageTitle('Site Settings - Admin');

	return (
		<>
			<Header title="Site settings" />
			<div className="admin-panel">
				<FileInput label="Top menu background image" maxFiles={1} />
				<Input
					label="Footer text"
					reduxValue="site/footerText"
					wide
					quickTextOptions={[
						['©', 'Copyright symbol'],
						['–', 'En dash (date divider)'],
						['</>', 'Insert a link', '[Link text](https://example.com)'],
					]}
				/>
				<button
					className="dynamic submit"
					onClick={saveSettings}
					disabled={!hasChanges}
				>
					Save
				</button>
			</div>
		</>
	);
};

export default SitePanel;

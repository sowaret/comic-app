import React from 'react';
import Page from './Page';

const PageList = ({ pages = [] }) => (
	<div className="archive__pages">
		{pages.map((page, i) => (
			<Page {...page} key={i} />
		))}
	</div>
);

export default PageList;

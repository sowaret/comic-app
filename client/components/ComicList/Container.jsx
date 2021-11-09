import React from 'react';
import useClasses from '../../hooks/useClasses';
import ComicCover from './ComicCover';

const ComicListContainer = ({ comicList, admin, shelf, mini }) => {
	const comicListDisplay = Object.entries(comicList).map(([titleSlug, comic]) =>
		React.createElement(ComicCover, {
			key: titleSlug,
			titleSlug,
			...comic,
			...(admin && { admin }),
			...(shelf && { shelf }),
			...(mini && { mini }),
		})
	);

	return (
		<div className={useClasses('comic-list', mini && 'mini')}>
			{comicListDisplay}
		</div>
	);
};

export default ComicListContainer;

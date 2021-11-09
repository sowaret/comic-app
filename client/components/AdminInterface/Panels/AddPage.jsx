import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { getSlug } from '../../../../utils/slug';
import {
	addPanelsFromStaticImages,
	setInput,
} from '../../../features/adminSlice';
import useAuth from '../../../hooks/useAuth';
import usePageTitle from '../../../hooks/usePageTitle';
import { submitUploadForm } from '../../../utils/fileUpload';
import Input from '../../Input';
import FileInput, { serializeFileList } from '../../Input/File';
import ComicPanelPreview from '../ComicPanelPreview';
import { buildInputValues } from '.';
import './styles';

const AddPagePanel = () => {
	const [token] = useAuth();
	const { comicTitleSlug } = useParams();

	// State
	const [isCustomSlug, setIsCustomSlug] = useState(false);
	const inputValues = buildInputValues(
		'addPage',
		['title', 'titleSlug', 'authorComment', 'releaseDateTime'],
		useSelector
	);
	const newPanels = useSelector(state => state.admin.addPage.panels);
	const comic = useSelector(state => state.comic.list[comicTitleSlug]);
	const { nextPageNumber, title } = comic || {};

	// Configuration
	const isReleaseDateInFuture =
		new Date().getTime() < new Date(inputValues.releaseDateTime).getTime();
	const isFormValid =
		Object.keys(newPanels).length &&
		Object.keys(inputValues)
			.filter(key => key !== 'authorComment') // Author comment isn't required
			.every(key => inputValues[key].trim());

	const pageTitleRef = useRef();
	const dispatch = useDispatch();

	const resetSlugGeneration = value => setIsCustomSlug(!!value.trim());

	const panelsDisplay = Object.keys(newPanels).map(filename => (
		<ComicPanelPreview filename={filename} key={filename} />
	));

	const addPage = () =>
		submitUploadForm(`/comic/addPage/${comicTitleSlug}`, {
			fileData: newPanels,
			filesFieldName: 'panelFiles',
			inputValues,
			token,
			success: () => {},
		});

	usePageTitle(
		'New page: ${pageTitle} - ${comicTitle}',
		{ comicTitle: title, pageTitle: inputValues.title.trim() || '(untitled)' },
		[comic, inputValues.title]
	);

	// Focus comic title input when panel is opened
	useEffect(() => pageTitleRef.current.focus(), []);

	// Update the auto-generated slug when the page title is changed
	useEffect(() => {
		!isCustomSlug &&
			dispatch(
				setInput({
					path: 'addPage/titleSlug',
					value: getSlug(inputValues.title),
				})
			);
	}, [inputValues.title]);

	return (
		<div className="admin-panel">
			<Input
				label="Page title"
				inputRef={pageTitleRef}
				reduxValue="addPage/title"
			/>
			<Input
				label="Page URL"
				onChange={resetSlugGeneration}
				prefixText={`${window.location.host}/comic/${comicTitleSlug}/${nextPageNumber}/`}
				reduxValue="addPage/titleSlug"
				value={inputValues.titleSlug}
			/>
			<FileInput
				label="Panel images"
				dropType="static images"
				onAccept={files =>
					dispatch(addPanelsFromStaticImages(serializeFileList(files)))
				}
			>
				<div className="file-input__animated-helper">
					Add animated versions to each individual panel afterwards.
				</div>
			</FileInput>
			{panelsDisplay}
			<Input
				label="Author comment"
				type="textarea"
				reduxValue="addPage/authorComment"
			/>
			<Input
				label="Release date"
				type="datetime-local"
				reduxValue="addPage/releaseDateTime"
			/>
			<button
				className="dynamic submit"
				onClick={addPage}
				disabled={!isFormValid}
			>
				{isReleaseDateInFuture ? 'Schedule' : 'Post'} page
			</button>
		</div>
	);
};

export default AddPagePanel;

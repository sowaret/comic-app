import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSlug } from '../../../../utils/slug';
import { setBannerImage, setInput } from '../../../features/adminSlice';
import useAuth from '../../../hooks/useAuth';
import usePageTitle from '../../../hooks/usePageTitle';
import { submitUploadForm } from '../../../utils/fileUpload';
import Input from '../../Input';
import FileInput, { serializeFileList } from '../../Input/File';
import { buildInputValues } from '.';

const CreateComicPanel = () => {
	const [token] = useAuth();

	// State
	const [isCustomSlug, setIsCustomSlug] = useState(false);
	const inputValues = buildInputValues(
		'createComic',
		['title', 'titleSlug', 'description'],
		useSelector
	);
	const bannerImage = useSelector(state => state.admin.createComic.bannerImage);

	const comicTitleRef = useRef();
	const dispatch = useDispatch();

	const resetSlugGeneration = value => setIsCustomSlug(!!value.trim());

	const bannerDisplay = bannerImage.src ? (
		<img src={bannerImage.src} />
	) : (
		<FileInput
			label="Banner image"
			maxFiles={1}
			dropType="banner image"
			onAccept={files => dispatch(setBannerImage(serializeFileList(files)[0]))}
		/>
	);

	const createComic = () =>
		submitUploadForm('/comic/create', {
			fileData: bannerImage,
			filesFieldName: 'bannerImage',
			inputValues,
			token,
			success: res => console.log(res),
		});

	usePageTitle(
		'Create comic: ${comicTitle}',
		{ comicTitle: inputValues.title.trim() || '(untitled)' },
		[inputValues.title]
	);

	// Focus comic title input when panel is opened
	useEffect(() => comicTitleRef.current.focus(), []);

	// Update the auto-generated slug when the comic title is changed
	useEffect(() => {
		!isCustomSlug &&
			dispatch(
				setInput({
					path: 'createComic/titleSlug',
					value: getSlug(inputValues.title),
				})
			);
	}, [inputValues.title]);

	return (
		<div className="admin-panel">
			<Input
				label="Comic title"
				inputRef={comicTitleRef}
				reduxValue="createComic/title"
			/>
			<Input
				label="Comic URL"
				onChange={resetSlugGeneration}
				prefixText={`${window.location.host}/comic/`}
				reduxValue="createComic/titleSlug"
				value={inputValues.titleSlug}
			/>
			{bannerDisplay}
			<Input
				label="Description"
				type="textarea"
				reduxValue="createComic/description"
			/>
			<button className="dynamic submit" onClick={createComic}>
				Create comic
			</button>
		</div>
	);
};

export default CreateComicPanel;

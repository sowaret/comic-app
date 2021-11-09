import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addAnimatedVersionToPanel } from '../../features/adminSlice';
import Input from '../Input';
import FileInput, { serializeFileList } from '../Input/File';
import './styles/ComicPanelPreview';

const ComicPanelPreview = ({ filename }) => {
	const panel = useSelector(state => state.admin.addPage.panels[filename]);
	const dispatch = useDispatch();

	const animatedVersionDisplay = panel.animatedSrc ? (
		<img className="animated-verson" src={panel.animatedSrc} />
	) : (
		<FileInput
			className="add-animated"
			dropType="animated version"
			maxFiles={1}
			onAccept={files =>
				dispatch(
					addAnimatedVersionToPanel({
						panelFilename: filename,
						...serializeFileList(files)[0],
					})
				)
			}
		/>
	);

	return (
		<div className="comic-panel-preview">
			<div className="comic-panel-preview__drag" />
			<img className="static-image" src={panel.src} />
			{animatedVersionDisplay}
			<Input
				className="comic-panel-preview__transcript"
				label="Transcript"
				type="textarea"
				reduxValue={`addPage/panels/${filename}/transcript`}
			/>
		</div>
	);
};

export default ComicPanelPreview;

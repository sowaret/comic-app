import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { getSlug } from '../../../utils/slug';
import useClasses from '../../hooks/useClasses';
import Input from './index';
import './styles/File';

export const serializeFileList = files =>
	files.map(file => ({
		filename: file.name,
		src: URL.createObjectURL(file),
	}));

const FileInput = ({
	className,
	dropType,
	label = '', // For Input element
	maxFiles = 0,
	onAccept = () => {},
	children, // Use to display additional information
}) => {
	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		accept: 'image/*',
		maxFiles,
		onDropAccepted: useCallback(files => onAccept(files)),
	});

	const classes = useClasses(
		'file-input-dropzone',
		className,
		isDragActive && 'dragging'
	);
	const name = getSlug(label);

	return React.createElement(
		// e.g. animatedSrc fields do not need label
		label ? Input : React.Fragment,
		label && { label },
		<div className={classes} {...getRootProps()}>
			<input id={name} {...getInputProps()} />
			<div className="file-input__drag-helper">
				{isDragActive ? 'Drop' : 'Drag'} {dropType} here
			</div>
			<div className="file-input__click-helper">
				or <u>click to browse</u>
			</div>
			{children}
		</div>
	);
};

export default FileInput;

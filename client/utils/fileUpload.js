import axios from 'axios';
import API from '../API';

const getFileFromBlobUrl = ({ src, filename }) =>
	axios
		.get(src, { responseType: 'blob' })
		.then(blob => new File([blob.data], filename));

const convertBlobToFile = {
	bannerImage: getFileFromBlobUrl,
	panelFiles: (panels, extraDataObject) => {
		const requests = [];
		Object.entries(panels).map(
			([filename, { src, animatedSrc, animatedFilename }]) => {
				requests.push(getFileFromBlobUrl({ src, filename }));
				extraDataObject[filename] = animatedSrc ? animatedFilename : null;

				if (animatedSrc) {
					requests.push(
						getFileFromBlobUrl({ src: animatedSrc, filename: animatedFilename })
					);
				}
			}
		);

		return Promise.all(requests);
	},
};

export const submitUploadForm = async (
	route,
	{ fileData, filesFieldName, inputValues, token, success, fail }
) => {
	const extraData = {};
	const files = await convertBlobToFile[filesFieldName](fileData, extraData);

	const formData = new FormData();
	Object.keys(inputValues).map(key => formData.append(key, inputValues[key]));
	if (Object.keys(extraData).length)
		formData.append('extraData', JSON.stringify(extraData));
	files.map(file => formData.append(filesFieldName, file));
	API.post(
		route,
		formData,
		{ success, fail },
		{ Authorization: `Bearer ${token}` }
	);
};

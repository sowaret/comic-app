import React from 'react';
import { mediaUrlStyle } from '../../../utils/style';
import './style';

const loadingBackgroundStyle = {
	backgroundImage: mediaUrlStyle('loading.gif'),
};

const Loader = () => <div className="loader" style={loadingBackgroundStyle} />;

export default Loader;

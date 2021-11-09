import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setInput } from '../../../../features/adminSlice';
import useClasses from '../../../../hooks/useClasses';
import QuickTextOption from './QuickTextOption';
import './styles';

const QuickTextPanel = ({ options = [], reduxValue }) => {
	const [hoverInfoText, setHoverInfoText] = useState();
	const dispatch = useDispatch();

	const infoTextClasses = useClasses(
		'quick-text-panel__info-text',
		!hoverInfoText && 'empty'
	);
	const optionsDisplay = options.map(([label, infoText, addText], key) =>
		React.createElement(
			QuickTextOption,
			{
				onMouseDown: e => e.preventDefault(), // Don't blur Input input
				onClick: () =>
					dispatch(setInput({ path: reduxValue, append: addText || label })),
				onMouseEnter: () => setHoverInfoText(infoText),
				onMouseLeave: () => setHoverInfoText(),
				key,
			},
			label
		)
	);

	return (
		<div className="quick-text-panel">
			<div className="quick-text-panel__options">{optionsDisplay}</div>
			<div className={infoTextClasses}>{hoverInfoText || 'Quick text'}</div>
		</div>
	);
};

export default QuickTextPanel;

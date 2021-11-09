import React from 'react';

const AutocompleteOption = ({ children, ...props }) => (
	<div className="quick-text-panel__option" {...props}>
		{children}
	</div>
);

export default AutocompleteOption;

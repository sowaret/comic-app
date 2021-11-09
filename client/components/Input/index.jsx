import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { randomBytes } from 'crypto';
import { getObjectByPath } from '../../../utils/object';
import { getSlug } from '../../../utils/slug';
import { setInput } from '../../features/adminSlice';
import useClasses from '../../hooks/useClasses';
import QuickTextPanel from './features/quick-text';
import './styles/Input';

const Input = ({
	quickTextOptions = [],
	className,
	inputRef,
	label,
	onChange = () => {},
	prefixText,
	reduxValue = '',
	localState = [],
	type = 'input',
	wide = false,
	children,
	...otherProps // e.g. `value`
}) => {
	// Configuration
	const [randomName, setRandomName] = useState(randomBytes(4).toString('hex'));
	const isFileInput = !!children;
	const name = getSlug(label) + '-' + randomName;
	const typeIsTag = type === 'textarea';
	const path = reduxValue;
	const [stateValue, setStateValue] = localState;

	// State
	const [isFocused, setIsFocused] = useState(false);
	const value = path
		? useSelector(state => getObjectByPath(state, 'admin/' + path))
		: stateValue;

	const classes = useClasses(
		'input',
		className,
		prefixText && 'prefix',
		isFileInput && 'file',
		(prefixText || type === 'datetime-local' || value?.trim()) && 'has-text',
		wide && 'wide',
		isFocused && 'focus'
	);
	const dispatch = useDispatch();

	const setInputWithOnChange = e => {
		const { value } = e.target;
		path ? dispatch(setInput({ path, value })) : setStateValue(value);
		onChange(value);
	};

	// FileInput uses children, otherwise create element here
	const inputElement =
		children ||
		React.createElement(typeIsTag ? type : 'input', {
			id: name,
			onBlur: () => setIsFocused(false),
			onChange: setInputWithOnChange,
			onFocus: () => setIsFocused(true),
			value,
			ref: inputRef,
			...(!typeIsTag && { type }),
			...otherProps,
		});

	const prefixElement = prefixText && (
		<label className="input__prefix" htmlFor={name}>
			{prefixText}
		</label>
	);

	return (
		<div className={classes}>
			<label className="input__label" htmlFor={name}>
				{label}
			</label>
			{inputElement}
			{prefixElement}
			<div className="input__focus-indicator" />
			{quickTextOptions.length ? (
				<QuickTextPanel options={quickTextOptions} reduxValue={reduxValue} />
			) : null}
		</div>
	);
};

export default Input;

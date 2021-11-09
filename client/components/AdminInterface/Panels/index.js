export const buildInputValues = (inputType, inputTypeKeys, useSelector) =>
	inputTypeKeys.reduce(
		(obj, key) => ({
			...obj,
			[key]: useSelector(state => state.admin[inputType][key]),
		}),
		{}
	);

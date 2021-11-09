export const getSlug = title =>
	title
		.toLowerCase()
		// Replace spaces with dashes
		.replace(/ /g, '-')
		// Remove consecutive dashes
		.replace(/\-\-+/g, '-')
		// Remove special characters
		.replace(/[!@#$%^&*()_+=\[\]{};':"\\|,.<>\/?]/g, '')
		// Remove any beginning and ending dashes
		.replace(/^-|-$/g, '');

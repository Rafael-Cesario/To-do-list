export const verifyValues = (values: object) => {
	const emptyValues: string[] = [];
	const keys = Object.keys(values);

	keys.forEach((key) => {
		values[key as keyof typeof values] || emptyValues.push(`${key} was not provided`);
	});

	return emptyValues.join(', ');
};

export const verifyValues = (values: object) => {
	const capitalize = (txt: string) => txt[0].toUpperCase() + txt.slice(1);

	const emptyValues: string[] = [];
	const keys = Object.keys(values);

	keys.forEach((key) => {
		values[key as keyof typeof values] || emptyValues.push(`${capitalize(key)} was not provided`);
	});

	return emptyValues.join(', ');
};

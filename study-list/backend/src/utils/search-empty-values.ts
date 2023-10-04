export const searchEmptyValues = (object: object) => {
	const keys = Object.keys(object);
	const errors = [];

	for (const key of keys) {
		const isEmpty = object[key as keyof typeof object] ? false : true;
		if (isEmpty) errors.push(`${key} has no value`);
	}

	return errors.join(", ");
};

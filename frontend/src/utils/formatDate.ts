export const formatDate = (textDate: string) => {
	const date = new Date(Number(textDate));
	const day = String(date.getDay()).padStart(2, "0");
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const subjectDate = `${day}/${month}/${date.getFullYear()}`;
	return subjectDate;
};

import bcrypt from 'bcrypt';

export const encryptPassword = (password: string) => {
	const saltRounds = 10;
	const hash = bcrypt.hashSync(password, saltRounds);
	return hash;
};

export const comparePasswords = (password: string, hash: string) => {
	const isSamePassword = bcrypt.compareSync(password, hash);
	return isSamePassword;
};

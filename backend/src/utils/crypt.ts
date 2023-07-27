import { genSaltSync, hashSync, compareSync } from "bcrypt";

export const encryptPassword = (password: string) => {
	const saltRounds = 10;
	const salt = genSaltSync(saltRounds);
	const hash = hashSync(password, salt);
	return hash;
};

export const decryptPassword = (password: string, hash: string) => {
	const isEqual = compareSync(password, hash);
	return isEqual;
};

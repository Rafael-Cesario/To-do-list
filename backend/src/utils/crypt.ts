import { compareSync, genSaltSync, hashSync } from 'bcrypt';

export const encryptPassword = (password: string) => {
  const saltRounds = 10;
  const salt = genSaltSync(saltRounds);
  const hash = hashSync(password, salt);
  return hash;
};

export const checkPassword = (password: string, hash: string) => {
  return compareSync(password, hash);
};

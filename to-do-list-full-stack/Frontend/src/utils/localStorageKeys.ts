export const localStorageKeys = {
  user: 'user',
  theme: 'theme',
};

export class UserStorage {
  readData() {
    const storage = localStorage.getItem(localStorageKeys.user) || '';
    const { email, token } = JSON.parse(storage) as { email: string; token: string };
    return { email, token };
  }
}

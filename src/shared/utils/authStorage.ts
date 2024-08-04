const ACCESS_TOKEN = 'ACCESS_TOKEN';

interface AuthStorage {
  setToken: (token: string) => void;
  getToken: () => string | null;
  clear: () => void;
}

const authStorage: AuthStorage = {
  setToken: (token: string) => {
    localStorage.setItem(ACCESS_TOKEN, token);
  },
  getToken: () => {
    return localStorage.getItem(ACCESS_TOKEN);
  },
  clear: () => {
    localStorage.removeItem(ACCESS_TOKEN);
  },
};

export default authStorage;
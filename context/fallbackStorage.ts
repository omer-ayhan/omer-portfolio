import createWebStorage from "redux-persist/lib/storage/createWebStorage";

type StorageTypes =
  | string
  | number
  | boolean
  | number[]
  | string[]
  | symbol
  | null;

const createNoopStorage = () => {
  return {
    getItem(_key: string | null) {
      return Promise.resolve(null);
    },
    setItem(_key: string | null, value: StorageTypes) {
      return Promise.resolve(value);
    },
    removeItem(_key: string | null) {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

export default storage;

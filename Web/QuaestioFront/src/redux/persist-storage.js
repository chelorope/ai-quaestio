import { isBrowser } from "@/utils";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";

export function createPersistStorage() {
  // Returns noop (dummy) storage.
  if (!isBrowser) {
    return {
      getItem() {
        return Promise.resolve(null);
      },
      setItem() {
        return Promise.resolve();
      },
      removeItem() {
        return Promise.resolve();
      },
    };
  }

  return createWebStorage("local");
}

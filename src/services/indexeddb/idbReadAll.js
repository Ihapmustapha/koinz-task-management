import { idbConnect } from "./idbConnect";

export const idbReadAll = () => {
  return new Promise((resolve, reject) => {
    idbConnect()
      .then((db) => {
        const request = db
          .transaction(["task-management"], "readonly")
          .objectStore("task-management")
          .getAll();

        request.onsuccess = () => {
          resolve(request.result);
        };

        request.onerror = (error) => {
          reject(error);
        };
      })
      .catch((error) => {
        reject(error);
      });
  });
};

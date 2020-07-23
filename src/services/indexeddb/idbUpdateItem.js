import { idbConnect } from "./idbConnect";

export const idbUpdateItem = (item) => {
  return new Promise((resolve, reject) => {
    idbConnect()
      .then((db) => {
        const request = db
          .transaction(["task-management"], "readwrite")
          .objectStore("task-management")
          .put({ ...item });

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

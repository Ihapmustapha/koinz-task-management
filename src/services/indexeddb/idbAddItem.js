import { idbConnect } from "./idbConnect";

export const idbAddItem = (item) => {
  return new Promise((resolve, reject) => {
    idbConnect()
      .then((db) => {
        const request = db
          .transaction(["task-management"], "readwrite")
          .objectStore("task-management")
          .add({ ...item });

        request.onsuccess = () => {
          resolve("Item Added Successfully!");
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

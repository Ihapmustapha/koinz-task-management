import { idbConnect } from "./idbConnect";

export const idbAddItem = (item) => {
  idbConnect()
    .then((db) => {
      const request = db
        .transaction(["task-management"], "readwrite")
        .objectStore("task-management")
        .add({ ...item });

      request.onsuccess = () => {
        return Promise.resolve("Item Added Successfully!");
      };

      request.onerror = (error) => {
        return Promise.reject(error);
      };
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};

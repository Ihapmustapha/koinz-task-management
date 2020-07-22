import { idbConnect } from "./idbConnect";

export const idbUpdateItem = (item) => {
  idbConnect()
    .then((db) => {
      const request = db
        .transaction(["task-management"], "readwrite")
        .objectStore("task-management")
        .put({ ...item });

      request.onsuccess = () => {
        return Promise.resolve(request.result);
      };

      request.onerror = (error) => {
        return Promise.reject(error);
      };
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};

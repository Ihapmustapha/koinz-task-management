import { idbConnect } from "./idbConnect";

export const idbDeleteItem = (itemId) => {
  idbConnect()
    .then((db) => {
      const request = db
        .transaction(["task-management"], "readwrite")
        .objectStore("task-management")
        .delete(itemId);

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

import { idbConnect } from "./idbConnect";

export const idbReadItem = (itemId, param = null) => {
  idbConnect()
    .then((db) => {
      const request =
        param && param === "getAll"
          ? db
              .transaction(["task-management"], "readwrite")
              .objectStore("task-management")
              .getAll()
          : db
              .transaction(["task-management"], "readwrite")
              .objectStore("task-management")
              .get(itemId);

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

import { idbConnect } from "./idbConnect";

export const idbReadItem = (itemId = null, param = null) => {
  return new Promise((resolve, reject) => {
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

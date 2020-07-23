import { idbConnect } from "./idbConnect";

export const idbUpdateItem = (item) => {
  return new Promise((resolve, reject) => {
    idbConnect()
      .then((db) => {
        const transaction = db.transaction(["task-management"], "readwrite");
        const tasks = transaction.objectStore("task-management");

        // getting item from db
        const idIndex = tasks.index("id");
        const getRequest = idIndex.getKey(item.id);

        // on get success
        getRequest.onsuccess = () => {
          const id = getRequest.result;
          // updating item after get
          const updateRequest = tasks.put(item, id);
          // on update success
          updateRequest.onsuccess = () => {
            resolve(updateRequest.result);
          };
          // on update error
          updateRequest.onerror = (error) => {
            reject(error);
          };
        };

        // on get error
        getRequest.onerror = (error) => {
          reject(error);
        };
      })
      .catch((error) => {
        reject(error);
      });
  });
};

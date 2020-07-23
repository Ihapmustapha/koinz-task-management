import { idbConnect } from "./idbConnect";

export const idbDeleteItem = (key) => {
  return new Promise((resolve, reject) => {
    idbConnect()
      .then((db) => {
        const transaction = db.transaction("task-management", "readwrite");
        const tasks = transaction.objectStore("task-management");

        // getting item from db
        const idIndex = tasks.index("id");
        const getRequest = idIndex.getKey(key);

        // on get success
        getRequest.onsuccess = () => {
          const id = getRequest.result;
          // deleting item after get
          const deleteRequest = tasks.delete(id);
          // on delete success
          deleteRequest.onsuccess = () => {
            resolve(deleteRequest.result);
          };
          // on delete error
          deleteRequest.onerror = (error) => {
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

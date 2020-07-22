import { DATABASE, DB_VERSION } from "./types";

export const idbConnect = () => {
  return new Promise((resolve, reject) => {
    //   opening db with name and version
    const request = indexedDB.open(DATABASE, DB_VERSION);

    // on opening success
    request.onsuccess = () => {
      resolve(request.result);
    };

    // on db upgrade needed
    request.onupgradeneeded = (e) => {
      const db = e.target.result;
      const objectStore = db.createObjectStore("task-management", {
        autoIncrement: true,
      });
      // adding object store indexes
      objectStore.createIndex("description", "description", { unique: false });
      objectStore.createIndex("history", "history", { unique: false });
      objectStore.createIndex("id", "id", { unique: true });
      objectStore.createIndex("taskStatus", "taskStatus", { unique: false });

      resolve(db);
    };

    // on db opening error
    request.onerror = (error) => {
      reject(error);
    };

    // on db opening block
    request.onblocked = (reason) => {
      reject(reason);
    };
  });
};

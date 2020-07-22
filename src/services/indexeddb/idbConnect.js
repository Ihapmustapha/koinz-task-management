import { DATABASE, DB_VERSION } from "./types";

export const idbConnect = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DATABASE, DB_VERSION);
    request.onsuccess = (e) => {
      resolve(request.result);
    };

    request.onupgradeneeded = (e) => {
      const db = e.target.result;
      const objectStore = db.createObjectStore("task-management", {
        autoIncrement: true,
      });
      objectStore.createIndex("description", "description", { unique: false });
      objectStore.createIndex("history", "history", { unique: false });
      objectStore.createIndex("id", "id", { unique: true });
      objectStore.createIndex("taskStatus", "taskStatus", { unique: false });
    };

    request.onerror = (error) => {
      reject(error);
    };

    request.onblocked = (reason) => {
      reject(reason);
    };
  });
};

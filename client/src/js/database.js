// import { openDB } from 'idb';

// const initdb = async () =>
//   openDB('jate', 1, {
//     upgrade(db) {
//       if (db.objectStoreNames.contains('jate')) {
//         console.log('jate database already exists');
//         return;
//       }
//       db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
//       console.log('jate database created');
//     },
//   });

// // TODO: Add logic to a method that accepts some content and adds it to the database
// export const putDb = async (content) => {
//   console.log('Post to the database');

//   // Create a connection to the database database and version we want to use.
//   const jateDb = await openDB('jate', 1);

//   // Create a new transaction and specify the database and data privileges.
//   const tx = jateDb.transaction('jate', 'readwrite');

//   // Open up the desired object store.
//   const store = tx.objectStore('jate');

//   // Use the .add() method on the store and pass in the content.
//   const request = store.put({ id: 1, value: content });

//   // Get confirmation of the request.
//   const result = await request;
//   console.log('🚀 - data saved to the database', result);  
// }

// // TODO: Add logic for a method that gets all the content from the database
// export const getDb = async () => {
//   console.log('GET from the database');

//   // Create a connection to the database database and version we want to use.
//   const jateDb = await openDB('jate', 1);

//   // Create a new transaction and specify the database and data privileges.
//   const tx = jateDb.transaction('jate', 'readonly');

//   // Open up the desired object store.
//   const store = tx.objectStore('jate');

//   // Use the .getAll() method to get all data in the database.
//   const request = store.get(1);

//   // Get confirmation of the request.
//   const result = await request;
//   console.log('result.value', result);
//   return result;
// };  


// initdb();

import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Method that takes some content and adds it to the IndexedDB database using the idb module
export const putDb = async (content) => {
  console.log('PUT to the database');
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  const request = store.put({ id: 1, value: content });
  const result = await request;
  console.log('🚀 - data saved to the database', result.value);
};

// Method that gets content from the IndexedDB database using the idb module
export const getDb = async () => {
  console.log('GET from the database');
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  const request = store.get(1);
  const result = await request;
  result
    ? console.log('🚀 - data retrieved from the database', result.value)
    : console.log('🚀 - data not found in the database');
  // Check if a variable is defined and if it is, return it. See MDN Docs on Optional Chaining (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining)
  return result?.value;
};

initdb();

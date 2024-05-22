import Dexie from 'dexie';

// Create a new Dexie instance and define the database schema
const db = new Dexie('MyDatabase');

// Define your database schema
db.version(1).stores({
  tasks: '++id, title, description, status' // Primary key and indexed props
});

export default db;
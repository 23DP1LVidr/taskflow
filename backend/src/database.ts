import mysql from 'mysql2/promise';
import { readFile } from 'node:fs/promises';
import { env } from './config/env.js';
if (!/^[a-zA-Z0-9_]+$/.test(env.db.database)) throw new Error('Nederīgs datubāzes nosaukums.');
const connection = await mysql.createConnection({ ...env.db,database:undefined,multipleStatements:true });
try {
 if (process.argv[2] === 'schema') {
  await connection.query('CREATE DATABASE IF NOT EXISTS `'+env.db.database+'` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci');
  await connection.query('USE `'+env.db.database+'`');
  await connection.query(await readFile(new URL('../database/schema.sql',import.meta.url),'utf8'));
  console.log('Datubāzes shēma sagatavota.');
 } else if (process.argv[2] === 'seed') {
  await connection.query('USE `'+env.db.database+'`');
  await connection.query(await readFile(new URL('../database/seed.sql',import.meta.url),'utf8'));
  console.log('Demonstrācijas dati pievienoti.');
 } else throw new Error('Izmantojiet schema vai seed.');
} finally { await connection.end(); }


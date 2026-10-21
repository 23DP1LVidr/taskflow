import type { PoolConnection, ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import { pool } from '../config/db.js';
export type DB = typeof pool | PoolConnection;
export async function rows<T = any>(sql: string, params: any[] = [], db: DB = pool): Promise<T[]> {
 const [result] = await db.execute<RowDataPacket[]>(sql, params); return result as T[];
}
export async function run(sql: string, params: any[] = [], db: DB = pool) {
 const [result] = await db.execute<ResultSetHeader>(sql, params); return result;
}
export async function transaction<T>(fn: (db: PoolConnection) => Promise<T>) {
 const db = await pool.getConnection();
 try { await db.beginTransaction(); const value = await fn(db); await db.commit(); return value; }
 catch (error) { await db.rollback(); throw error; } finally { db.release(); }
}


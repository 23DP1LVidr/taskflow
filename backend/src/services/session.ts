import session from 'express-session';
import { rows, run } from '../repositories/db.js';
declare module 'express-session' { interface SessionData { userId?: number; csrf?: string } }
export class MysqlSessionStore extends session.Store {
 get(sid: string, callback: (err: any, session?: session.SessionData | null) => void) {
  rows('SELECT data FROM sessions WHERE sid=? AND expires>?', [sid, Date.now()])
   .then(r => callback(null, r[0] ? JSON.parse(r[0].data) : null)).catch(callback);
 }
 set(sid: string, data: session.SessionData, callback: (err?: any) => void = () => {}) {
  run('INSERT INTO sessions (sid,data,expires,user_id) VALUES (?,?,?,?) ON DUPLICATE KEY UPDATE data=VALUES(data),expires=VALUES(expires),user_id=VALUES(user_id)',
   [sid, JSON.stringify(data), data.cookie.expires ? new Date(data.cookie.expires).getTime() : Date.now()+86400000, data.userId || null])
   .then(() => callback()).catch(callback);
 }
 destroy(sid: string, callback: (err?: any) => void = () => {}) {
  run('DELETE FROM sessions WHERE sid=?', [sid]).then(() => callback()).catch(callback);
 }
 touch(sid: string, data: session.SessionData, callback: (err?: any) => void = () => {}) { this.set(sid, data, callback); }
}


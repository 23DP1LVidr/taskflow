import type { RequestHandler, Request } from 'express';
import bcrypt from 'bcrypt';
import { randomBytes } from 'node:crypto';
import { rows, run } from '../repositories/db.js';
import * as v from '../services/validation.js';
import { HttpError } from '../middleware/errors.js';
async function signIn(req: Request, uid: number) {
 await new Promise<void>((resolve,reject) => req.session.regenerate(err => err ? reject(err) : resolve()));
 req.session.userId = uid; req.session.csrf = randomBytes(32).toString('hex');
 await new Promise<void>((resolve,reject) => req.session.save(err => err ? reject(err) : resolve()));
}
export const register: RequestHandler = async (req,res) => {
 const data = v.register.parse(req.body);
 const hash = await bcrypt.hash(data.password,12);
 const r = await run('INSERT INTO users (name,email,password_hash) VALUES (?,?,?)', [data.name,data.email,hash]);
 await signIn(req,r.insertId);
 res.status(201).json({ data: { id:r.insertId,name:data.name,email:data.email }, csrfToken:req.session.csrf });
};
export const login: RequestHandler = async (req,res) => {
 const data = v.login.parse(req.body);
 const [user] = await rows('SELECT * FROM users WHERE email=?', [data.email]);
 if (!user || !await bcrypt.compare(data.password,user.password_hash)) throw new HttpError(401,'Nepareizs e-pasts vai parole.');
 await signIn(req,user.id);
 res.json({ data: { id:user.id,name:user.name,email:user.email }, csrfToken:req.session.csrf });
};
export const me: RequestHandler = async (req,res) => {
 const [user] = req.session.userId ? await rows('SELECT id,name,email FROM users WHERE id=?',[req.session.userId]) : [];
 res.json({ data:user || null, csrfToken:req.session.csrf });
};
export const logout: RequestHandler = async (req,res) => {
 await new Promise<void>((resolve,reject) => req.session.destroy(err => err ? reject(err) : resolve()));
 res.clearCookie('taskflow.sid',{ path:'/' }); res.json({ data:true });
};
export const profile: RequestHandler = async (req,res) => {
 const data = v.profile.parse(req.body);
 await run('UPDATE users SET name=?,email=? WHERE id=?',[data.name,data.email,req.session.userId]);
 res.json({ data:{ id:req.session.userId,...data } });
};
export const password: RequestHandler = async (req,res) => {
 const data = v.changePassword.parse(req.body), uid = req.session.userId!;
 const [user] = await rows('SELECT password_hash FROM users WHERE id=?',[uid]);
 if (!await bcrypt.compare(data.current_password,user.password_hash)) throw new HttpError(422,'Pašreizējā parole nav pareiza.');
 await run('UPDATE users SET password_hash=? WHERE id=?',[await bcrypt.hash(data.password,12),uid]);
 await run('DELETE FROM sessions WHERE user_id=?',[uid]);
 await signIn(req,uid);
 res.json({ data:true, csrfToken:req.session.csrf });
};


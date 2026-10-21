import express from 'express';
import session from 'express-session';
import helmet from 'helmet';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { env } from './config/env.js';
import { MysqlSessionStore } from './services/session.js';
import { csrf } from './middleware/auth.js';
import { errors, HttpError } from './middleware/errors.js';
import { router } from './routes/index.js';
export function createApp() {
 if (env.secret.length < 32 || env.secret.startsWith('replace-')) throw new Error('SESSION_SECRET jābūt unikālai vismaz 32 rakstzīmju vērtībai.');
 const app = express();
 app.disable('x-powered-by');
 if (env.production) app.set('trust proxy',1);
 app.use(helmet({ contentSecurityPolicy: { directives: { 'style-src': ["'self'","'unsafe-inline'"], 'img-src': ["'self'",'data:'], 'font-src': ["'self'",'data:'] } } }));
 app.use(express.json({ limit:'64kb' }));
 app.use('/api',session({ name:'taskflow.sid',secret:env.secret,store:new MysqlSessionStore(),resave:false,saveUninitialized:false,
 cookie:{ httpOnly:true,secure:env.production,sameSite:'lax',maxAge:86400000 } }));
 app.use('/api',csrf,router);
 app.use('/api',(_req,_res,next) => next(new HttpError(404,'API adrese nav atrasta.')));
 if (env.production) {
  const frontend = path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../../frontend/dist');
  app.use(express.static(frontend));
  app.get('/{*path}',(_req,res) => res.sendFile(path.join(frontend,'index.html')));
 }
 app.use(errors); return app;
}


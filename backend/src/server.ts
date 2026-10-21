import { createApp } from './app.js';
import { env } from './config/env.js';
import { pool } from './config/db.js';
await pool.query('SELECT 1');
const server = createApp().listen(env.port,() => console.log('TaskFlow API: http://localhost:'+env.port));
const cleanup = setInterval(() => { void pool.execute('DELETE FROM sessions WHERE expires<?',[Date.now()]).catch(console.error); },3600000);
cleanup.unref();
for (const signal of ['SIGINT','SIGTERM']) process.on(signal,() => { clearInterval(cleanup); server.close(() => { void pool.end().then(() => process.exit(0)); }); });


import 'dotenv/config';
export const env = {
 port: Number(process.env.PORT || 3000),
 production: process.env.NODE_ENV === 'production',
 secret: process.env.SESSION_SECRET || '',
 db: { host: process.env.DB_HOST || '127.0.0.1', port: Number(process.env.DB_PORT || 3306),
 user: process.env.DB_USER || 'root', password: process.env.DB_PASSWORD || '', database: process.env.DB_NAME || 'taskflow' }
};


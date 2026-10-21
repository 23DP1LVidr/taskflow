import type { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
export class HttpError extends Error { constructor(public status: number, message: string) { super(message); } }
export const errors: ErrorRequestHandler = (err, _req, res, _next) => {
 if (err instanceof ZodError) { res.status(422).json({ error: 'Pārbaudiet ievadītos datus.', details: err.issues.map(i => ({ field: i.path.join('.'), message: i.code === 'custom' ? i.message : 'Nederīga lauka vērtība. Pārbaudiet formātu un garumu.' })) }); return; }
 if (err.code === 'ER_DUP_ENTRY') { res.status(409).json({ error: 'Šāds e-pasts vai dalībnieks jau pastāv.' }); return; }
 if (err.type === 'entity.parse.failed') { res.status(400).json({ error: 'Nederīgs pieprasījums.' }); return; }
 if (!(err instanceof HttpError)) console.error(err);
 res.status(err instanceof HttpError ? err.status : 500).json({ error: err instanceof HttpError ? err.message : 'Servera kļūda. Mēģiniet vēlreiz.' });
};



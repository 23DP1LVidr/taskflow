import { z } from 'zod';
const text = (max: number) => z.string().trim().min(1, 'Lauks ir obligāts.').max(max, 'Teksts ir pārāk garš.');
export const id = z.coerce.number().int().positive();
export const email = z.email('Nederīgs e-pasts.').max(254).transform(v => v.toLowerCase());
export const password = z.string().min(8, 'Parolei vajag vismaz 8 rakstzīmes.').refine(v => Buffer.byteLength(v, 'utf8') <= 72, 'Parole ir pārāk gara.');
const date = z.union([z.iso.date(), z.literal(''), z.null()]).transform(v => v || null);
export const profile = z.object({ name: text(100), email });
export const register = profile.extend({ password, password_confirmation: z.string() }).refine(v => v.password === v.password_confirmation, { message: 'Paroles nesakrīt.', path: ['password_confirmation'] });
export const login = z.object({ email, password: z.string().min(1).max(200) });
export const project = z.object({ name: text(150), description: z.string().max(10000).default(''), start_date: date, deadline: date }).refine(v => !v.start_date || !v.deadline || v.deadline >= v.start_date, { message: 'Termiņš nevar būt pirms sākuma.', path: ['deadline'] });
export const status = z.enum(['todo','in_progress','completed']);
export const task = z.object({ title: text(200), description: z.string().max(10000).default(''), assigned_user_id: id.nullable(), status, priority: z.enum(['low','medium','high']), due_date: date });
export const changePassword = z.object({ current_password: z.string().min(1).max(200), password, password_confirmation: z.string() }).refine(v => v.password === v.password_confirmation, { message: 'Paroles nesakrīt.', path: ['password_confirmation'] });


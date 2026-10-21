import type { RequestHandler } from 'express';
import { randomBytes, timingSafeEqual } from 'node:crypto';
import { rows, type DB } from '../repositories/db.js';
import { HttpError } from './errors.js';
export const authenticated: RequestHandler = (req, _res, next) => {
 if (!req.session.userId) throw new HttpError(401, 'Lūdzu, piesakieties.'); next();
};
export const csrf: RequestHandler = (req, _res, next) => {
 req.session.csrf ||= randomBytes(32).toString('hex');
 if (!['GET','HEAD','OPTIONS'].includes(req.method)) {
  const token = req.get('X-CSRF-Token') || '';
  if (Buffer.byteLength(token) !== Buffer.byteLength(req.session.csrf) || !timingSafeEqual(Buffer.from(token), Buffer.from(req.session.csrf))) throw new HttpError(403, 'Drošības marķieris nav derīgs. Pārlādējiet lapu.');
  if (req.get('Sec-Fetch-Site') === 'cross-site') throw new HttpError(403, 'Pieprasījums nav atļauts.');
 }
 next();
};
export async function projectAccess(id: number, userId: number, owner = false, db?: DB) {
 const [project] = await rows('SELECT p.*,m.role FROM projects p JOIN project_members m ON m.project_id=p.id WHERE p.id=? AND m.user_id=?', [id,userId], db);
 if (!project) throw new HttpError(404, 'Projekts nav atrasts.');
 if (owner && project.owner_id !== userId) throw new HttpError(403, 'Darbība atļauta tikai projekta īpašniekam.');
 return project;
}



import type { RequestHandler } from 'express';
import { rows, run, transaction } from '../repositories/db.js';
import { projectAccess } from '../middleware/auth.js';
import { HttpError } from '../middleware/errors.js';
import * as v from '../services/validation.js';
import * as service from '../services/projects.js';
export const list: RequestHandler = async (req,res) => { res.json({ data: await service.listProjects(req.session.userId!) }); };
export const create: RequestHandler = async (req,res) => {
 const id = await service.createProject(req.session.userId!,v.project.parse(req.body)); res.status(201).json({ data:{id} });
};
export const get: RequestHandler = async (req,res) => {
 const id = v.id.parse(req.params.id); await projectAccess(id,req.session.userId!);
 res.json({ data:(await rows(service.projectQuery+' WHERE p.id=? AND m.user_id=? GROUP BY p.id,m.role',[id,req.session.userId]))[0] });
};
export const update: RequestHandler = async (req,res) => {
 const id = v.id.parse(req.params.id), d = v.project.parse(req.body); await projectAccess(id,req.session.userId!,true);
 await run('UPDATE projects SET name=?,description=?,start_date=?,deadline=? WHERE id=?',[d.name,d.description,d.start_date,d.deadline,id]);
 res.json({ data:true });
};
export const remove: RequestHandler = async (req,res) => {
 const id = v.id.parse(req.params.id); await projectAccess(id,req.session.userId!,true);
 await run('DELETE FROM projects WHERE id=?',[id]); res.json({ data:true });
};
export const members: RequestHandler = async (req,res) => {
 const id = v.id.parse(req.params.id); await projectAccess(id,req.session.userId!);
 res.json({ data:await rows('SELECT u.id,u.name,u.email,m.role,m.joined_at FROM project_members m JOIN users u ON u.id=m.user_id WHERE m.project_id=? ORDER BY m.role,u.name',[id]) });
};
export const addMember: RequestHandler = async (req,res) => {
 const id = v.id.parse(req.params.id), email = v.email.parse(req.body.email);
 await projectAccess(id,req.session.userId!,true);
 const [user] = await rows('SELECT id FROM users WHERE email=?',[email]);
 if (!user) throw new HttpError(404,'Lietotājs ar šo e-pastu nav reģistrējies.');
 await run("INSERT INTO project_members (project_id,user_id,role) VALUES (?,?,'member')",[id,user.id]);
 res.status(201).json({ data:true });
};
export const removeMember: RequestHandler = async (req,res) => {
 const id = v.id.parse(req.params.id), userId = v.id.parse(req.params.userId);
 await transaction(async db => {
  await rows('SELECT id FROM projects WHERE id=? FOR UPDATE',[id],db);
  const p = await projectAccess(id,req.session.userId!,true,db);
  if (userId === p.owner_id) throw new HttpError(422,'Projekta īpašnieku nevar noņemt.');
  await run('UPDATE tasks SET assigned_user_id=NULL WHERE project_id=? AND assigned_user_id=?',[id,userId],db);
  await run('DELETE FROM project_members WHERE project_id=? AND user_id=?',[id,userId],db);
 });
 res.json({ data:true });
};


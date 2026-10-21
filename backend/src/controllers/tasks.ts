import type { RequestHandler } from 'express';
import { rows, run } from '../repositories/db.js';
import { projectAccess } from '../middleware/auth.js';
import * as v from '../services/validation.js';
import * as s from '../services/projects.js';
export const list: RequestHandler = async (req,res) => {
 const id = v.id.parse(req.params.id); await projectAccess(id,req.session.userId!);
 res.json({ data:await rows(s.taskQuery+' WHERE t.project_id=? ORDER BY t.created_at DESC',[id]) });
};
export const my: RequestHandler = async (req,res) => {
 res.json({ data:await rows(s.taskQuery+' JOIN project_members m ON m.project_id=t.project_id AND m.user_id=? WHERE t.assigned_user_id=? ORDER BY t.due_date IS NULL,t.due_date',[req.session.userId,req.session.userId]) });
};
export const create: RequestHandler = async (req,res) => {
 const id = await s.saveTask(req.session.userId!,v.id.parse(req.params.id),v.task.parse(req.body)); res.status(201).json({ data:{id} });
};
export const update: RequestHandler = async (req,res) => {
 const id = v.id.parse(req.params.id), task = await s.accessibleTask(id,req.session.userId!);
 await s.saveTask(req.session.userId!,task.project_id,v.task.parse(req.body),id); res.json({ data:true });
};
export const status: RequestHandler = async (req,res) => {
 const id = v.id.parse(req.params.id), value = v.status.parse(req.body.status);
 await s.accessibleTask(id,req.session.userId!);
 await run('UPDATE tasks SET status=? WHERE id=?',[value,id]); res.json({ data:true });
};
export const remove: RequestHandler = async (req,res) => {
 const id = v.id.parse(req.params.id); await s.accessibleTask(id,req.session.userId!);
 await run('DELETE FROM tasks WHERE id=?',[id]); res.json({ data:true });
};
export const dashboard: RequestHandler = async (req,res) => {
 const uid = req.session.userId!, projects = await s.listProjects(uid);
 const [stats] = await rows(`SELECT COUNT(*) AS assigned_tasks, COALESCE(SUM(t.status='completed'),0) AS completed_tasks,
 COALESCE(SUM(t.status='in_progress'),0) AS in_progress_tasks,
 COALESCE(SUM(t.status<>'completed' AND t.due_date<CURDATE()),0) AS overdue_tasks
 FROM tasks t JOIN project_members m ON m.project_id=t.project_id AND m.user_id=? WHERE t.assigned_user_id=?`,[uid,uid]);
 const upcoming = await rows(s.taskQuery+" JOIN project_members m ON m.project_id=t.project_id AND m.user_id=? WHERE t.status<>'completed' AND t.due_date IS NOT NULL ORDER BY t.due_date LIMIT 8",[uid]);
 const total = projects.reduce((sum,p) => sum+Number(p.total_tasks),0);
 const completed = projects.reduce((sum,p) => sum+Number(p.completed_tasks),0);
 res.json({ data:{ ...stats,total_projects:projects.length,active_projects:projects.filter(p => Number(p.progress)<100).length,
 progress:total ? Math.round(completed/total*100) : 0, recent_projects:projects.slice(0,4),upcoming } });
};


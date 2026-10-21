import { rows, run, transaction } from '../repositories/db.js';
import { projectAccess } from '../middleware/auth.js';
import { HttpError } from '../middleware/errors.js';
import type { z } from 'zod';
import type { project, task } from './validation.js';
export const projectQuery = `SELECT p.*,m.role, COUNT(t.id) AS total_tasks,
 COALESCE(SUM(t.status='completed'),0) AS completed_tasks,
 COALESCE(SUM(t.status<>'completed' AND t.due_date<CURDATE()),0) AS overdue_tasks,
 COALESCE(ROUND(100*SUM(t.status='completed')/NULLIF(COUNT(t.id),0)),0) AS progress
 FROM projects p JOIN project_members m ON m.project_id=p.id LEFT JOIN tasks t ON t.project_id=p.id`;
export const listProjects = (uid: number) => rows(projectQuery+' WHERE m.user_id=? GROUP BY p.id,m.role ORDER BY p.created_at DESC', [uid]);
export async function createProject(uid: number, data: z.infer<typeof project>) {
 return transaction(async db => {
  const r = await run('INSERT INTO projects (owner_id,name,description,start_date,deadline) VALUES (?,?,?,?,?)', [uid,data.name,data.description,data.start_date,data.deadline], db);
  await run("INSERT INTO project_members (project_id,user_id,role) VALUES (?,?,'owner')", [r.insertId,uid], db);
  return r.insertId;
 });
}
export async function saveTask(uid: number, projectId: number, data: z.infer<typeof task>, taskId?: number) {
 return transaction(async db => {
  // Serialize membership removal and task assignment on the project row.
  await rows('SELECT id FROM projects WHERE id=? FOR UPDATE', [projectId], db);
  await projectAccess(projectId,uid,false,db);
  if (data.assigned_user_id && !(await rows('SELECT id FROM project_members WHERE project_id=? AND user_id=?', [projectId,data.assigned_user_id], db)).length)
   throw new HttpError(422, 'Uzdevumu var piešķirt tikai projekta dalībniekam.');
  const values = [data.title,data.description,data.assigned_user_id,data.status,data.priority,data.due_date];
  if (taskId) {
   await run('UPDATE tasks SET title=?,description=?,assigned_user_id=?,status=?,priority=?,due_date=? WHERE id=? AND project_id=?', [...values,taskId,projectId], db);
   return taskId;
  }
  return (await run('INSERT INTO tasks (title,description,assigned_user_id,status,priority,due_date,project_id) VALUES (?,?,?,?,?,?,?)', [...values,projectId], db)).insertId;
 });
}
export const taskQuery = 'SELECT t.*,u.name AS assigned_name,p.name AS project_name FROM tasks t LEFT JOIN users u ON u.id=t.assigned_user_id JOIN projects p ON p.id=t.project_id';
export async function accessibleTask(taskId: number, uid: number) {
 const [t] = await rows('SELECT * FROM tasks WHERE id=?', [taskId]);
 if (!t) throw new HttpError(404, 'Uzdevums nav atrasts.');
 await projectAccess(t.project_id,uid); return t;
}


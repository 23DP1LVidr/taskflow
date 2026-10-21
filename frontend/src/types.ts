export interface User { id:number; name:string; email:string; role?:'owner'|'member' }
export interface Project { id:number; owner_id:number; name:string; description:string; start_date:string|null; deadline:string|null; role:'owner'|'member'; total_tasks:number; completed_tasks:number; overdue_tasks:number; progress:number }
export type Status = 'todo'|'in_progress'|'completed';
export interface Task { id:number; project_id:number; title:string; description:string; assigned_user_id:number|null; assigned_name?:string; project_name?:string; status:Status; priority:'low'|'medium'|'high'; due_date:string|null }
export const statuses = [{ title:'Jāizdara',value:'todo' as Status,color:'slate' },{ title:'Procesā',value:'in_progress' as Status,color:'primary' },{ title:'Pabeigts',value:'completed' as Status,color:'success' }];
export const priorities = [{ title:'Zema',value:'low' },{ title:'Vidēja',value:'medium' },{ title:'Augsta',value:'high' }];
export const dateLabel = (value:string|null) => value ? new Intl.DateTimeFormat('lv-LV',{ day:'numeric',month:'short' }).format(new Date(value+'T12:00:00')) : 'Nav termiņa';
export const overdue = (task:Task) => !!task.due_date && task.status!=='completed' && task.due_date < new Date().toLocaleDateString('sv-SE');


import 'dotenv/config';
import { beforeAll,afterAll,describe,it,expect } from 'vitest';
import mysql from 'mysql2/promise';
import { readFile } from 'node:fs/promises';
import request from 'supertest';
import bcrypt from 'bcrypt';
const database=process.env.TEST_DB_NAME || 'taskflow_test';
if(!/^[a-zA-Z0-9_]+_test$/.test(database)||database===process.env.DB_NAME)throw new Error('Testiem nepieciešama atsevišķa datubāze ar _test galotni.');
process.env.DB_NAME=database;
process.env.SESSION_SECRET='test-only-secret-with-more-than-thirty-two-characters';
process.env.NODE_ENV='test';
let app:any,pool:any,owner:any,member:any,outsider:any;
let ownerToken='',memberToken='',outsiderToken='',projectId=0,taskId=0,ownerId=0,memberId=0,outsiderId=0;
const pass='Testing2026!';
const projectData={name:'Mācību projekts',description:'Reāla datubāze',start_date:'2026-10-01',deadline:'2026-11-01'};
const taskData={title:'Pirmais uzdevums',description:'Pārbaudīt plūsmu',assigned_user_id:null as number|null,status:'todo',priority:'high',due_date:'2026-10-25'};
beforeAll(async()=>{
 const conn=await mysql.createConnection({host:process.env.DB_HOST||'127.0.0.1',port:Number(process.env.DB_PORT||3306),user:process.env.DB_USER||'root',password:process.env.DB_PASSWORD||'',multipleStatements:true});
 try {
  await conn.query('CREATE DATABASE IF NOT EXISTS `'+database+'` CHARACTER SET utf8mb4');
  await conn.query('USE `'+database+'`');
  await conn.query(await readFile(new URL('../database/schema.sql',import.meta.url),'utf8').then(s=>s.replace(/^\uFEFF/,'')));
  await conn.query('DELETE FROM sessions; DELETE FROM tasks; DELETE FROM project_members; DELETE FROM projects; DELETE FROM users;');
 }finally{await conn.end();}
 app=(await import('../src/app.js')).createApp();
 pool=(await import('../src/config/db.js')).pool;
 owner=request.agent(app);member=request.agent(app);outsider=request.agent(app);
},30000);
afterAll(async()=>{await pool?.end();});
async function register(agent:any,name:string,email:string){
 const token=(await agent.get('/api/auth/me')).body.csrfToken;
 return agent.post('/api/auth/register').set('X-CSRF-Token',token).send({name,email,password:pass,password_confirmation:pass});
}
describe('TaskFlow API ar MySQL',()=>{
 it('noraida nesankcionētu piekļuvi',async()=>{expect((await request(app).get('/api/projects')).status).toBe(401);});
 it('noraida mutāciju bez CSRF marķiera',async()=>{expect((await owner.post('/api/auth/register').send({})).status).toBe(403);});
 it('validē reģistrācijas datus',async()=>{
  const token=(await owner.get('/api/auth/me')).body.csrfToken;
  expect((await owner.post('/api/auth/register').set('X-CSRF-Token',token).send({name:'',email:'bad',password:'123',password_confirmation:'321'})).status).toBe(422);
 });
 it('reģistrē lietotājus un glabā bcrypt paroles',async()=>{
  const a=await register(owner,'Anna','anna@test.lv');expect(a.status).toBe(201);ownerId=a.body.data.id;ownerToken=a.body.csrfToken;
  const b=await register(member,'Jānis','janis@test.lv');expect(b.status).toBe(201);memberId=b.body.data.id;memberToken=b.body.csrfToken;
  const c=await register(outsider,'Ieva','ieva@test.lv');expect(c.status).toBe(201);outsiderId=c.body.data.id;outsiderToken=c.body.csrfToken;
  const [users]=await pool.query('SELECT password_hash FROM users WHERE id=?',[ownerId]);
  expect(users[0].password_hash).not.toBe(pass);expect(await bcrypt.compare(pass,users[0].password_hash)).toBe(true);
  expect(a.headers['set-cookie'][0]).toContain('HttpOnly');expect(a.headers['set-cookie'][0]).toContain('SameSite=Lax');
 });
 it('noraida atkārtotu e-pastu',async()=>{expect((await register(request.agent(app),'Anna','ANNA@test.lv')).status).toBe(409);});
 it('piesakās un atjauno sesiju no MySQL citā lietotnes instancē',async()=>{
  const agent=request.agent(app),token=(await agent.get('/api/auth/me')).body.csrfToken;
  expect((await agent.post('/api/auth/login').set('X-CSRF-Token',token).send({email:'anna@test.lv',password:'wrong'})).status).toBe(401);
  const result=await agent.post('/api/auth/login').set('X-CSRF-Token',token).send({email:'anna@test.lv',password:pass});expect(result.status).toBe(200);
  const freshApp=(await import('../src/app.js')).createApp();
  const cookie=result.headers['set-cookie'][0].split(';')[0];
  expect((await request(freshApp).get('/api/auth/me').set('Cookie',cookie)).body.data.id).toBe(ownerId);
 });
 it('izveido projektu ar īpašnieka dalību un 0% progresu',async()=>{
  const result=await owner.post('/api/projects').set('X-CSRF-Token',ownerToken).send(projectData);expect(result.status).toBe(201);projectId=result.body.data.id;
  const p=(await owner.get('/api/projects/'+projectId)).body.data;expect(Number(p.progress)).toBe(0);
  expect((await owner.get('/api/projects/'+projectId+'/members')).body.data[0].role).toBe('owner');
 });
 it('neļauj svešam lietotājam apskatīt vai mainīt projektu',async()=>{
  expect((await outsider.get('/api/projects/'+projectId)).status).toBe(404);
  expect((await outsider.put('/api/projects/'+projectId).set('X-CSRF-Token',outsiderToken).send(projectData)).status).toBe(404);
  expect((await outsider.get('/api/projects')).body.data).toHaveLength(0);
 });
 it('īpašnieks pievieno dalībnieku; dublikāts tiek noraidīts',async()=>{
  expect((await owner.post('/api/projects/'+projectId+'/members').set('X-CSRF-Token',ownerToken).send({email:'janis@test.lv'})).status).toBe(201);
  expect((await owner.post('/api/projects/'+projectId+'/members').set('X-CSRF-Token',ownerToken).send({email:'janis@test.lv'})).status).toBe(409);
  expect((await member.get('/api/projects/'+projectId)).status).toBe(200);
 });
 it('dalībnieks nedrīkst mainīt iestatījumus, dalībniekus vai dzēst projektu',async()=>{
  expect((await member.put('/api/projects/'+projectId).set('X-CSRF-Token',memberToken).send(projectData)).status).toBe(403);
  expect((await member.delete('/api/projects/'+projectId).set('X-CSRF-Token',memberToken)).status).toBe(403);
  expect((await member.post('/api/projects/'+projectId+'/members').set('X-CSRF-Token',memberToken).send({email:'ieva@test.lv'})).status).toBe(403);
 });
 it('dalībnieks izveido un piešķir uzdevumu projekta dalībniekam',async()=>{
  taskData.assigned_user_id=memberId;
  const result=await member.post('/api/projects/'+projectId+'/tasks').set('X-CSRF-Token',memberToken).send(taskData);expect(result.status).toBe(201);taskId=result.body.data.id;
  expect((await member.get('/api/tasks/my')).body.data[0].id).toBe(taskId);
 });
 it('noraida uzdevuma piešķiršanu svešam lietotājam',async()=>{
  expect((await owner.put('/api/tasks/'+taskId).set('X-CSRF-Token',ownerToken).send({...taskData,assigned_user_id:outsiderId})).status).toBe(422);
 });
 it('dalībnieks rediģē uzdevumu un saglabā pārvietošanu datubāzē',async()=>{
  expect((await member.put('/api/tasks/'+taskId).set('X-CSRF-Token',memberToken).send({...taskData,title:'Atjaunināts'})).status).toBe(200);
  expect((await member.patch('/api/tasks/'+taskId+'/status').set('X-CSRF-Token',memberToken).send({status:'completed'})).status).toBe(200);
  const [tasks]=await pool.query('SELECT title,status FROM tasks WHERE id=?',[taskId]);expect(tasks[0]).toMatchObject({title:'Atjaunināts',status:'completed'});
 });
 it('aprēķina projekta progresu 100% un 50% pēc otrā uzdevuma',async()=>{
  expect(Number((await owner.get('/api/projects/'+projectId)).body.data.progress)).toBe(100);
  await owner.post('/api/projects/'+projectId+'/tasks').set('X-CSRF-Token',ownerToken).send({...taskData,assigned_user_id:ownerId});
  expect(Number((await owner.get('/api/projects/'+projectId)).body.data.progress)).toBe(50);
 });
 it('aizsargā uzdevumus un noraida nederīgu statusu',async()=>{
  expect((await outsider.patch('/api/tasks/'+taskId+'/status').set('X-CSRF-Token',outsiderToken).send({status:'todo'})).status).toBe(404);
  expect((await outsider.delete('/api/tasks/'+taskId).set('X-CSRF-Token',outsiderToken)).status).toBe(404);
  expect((await owner.patch('/api/tasks/'+taskId+'/status').set('X-CSRF-Token',ownerToken).send({status:'invalid'})).status).toBe(422);
 });
 it('informācijas panelī atgriež reālus kopsavilkumus',async()=>{
  const data=(await owner.get('/api/dashboard/stats')).body.data;expect(data.total_projects).toBe(1);expect(data.progress).toBe(50);expect(Number(data.assigned_tasks)).toBe(1);
 });
 it('noņemot dalībnieku, atceļ uzdevuma piešķīrumu un piekļuvi',async()=>{
  expect((await owner.delete('/api/projects/'+projectId+'/members/'+ownerId).set('X-CSRF-Token',ownerToken)).status).toBe(422);
  expect((await owner.delete('/api/projects/'+projectId+'/members/'+memberId).set('X-CSRF-Token',ownerToken)).status).toBe(200);
  expect((await member.get('/api/projects/'+projectId)).status).toBe(404);
  const [tasks]=await pool.query('SELECT assigned_user_id FROM tasks WHERE id=?',[taskId]);expect(tasks[0].assigned_user_id).toBeNull();
 });
 it('saglabā profilu un maina paroli, izbeidzot citas sesijas',async()=>{
  expect((await owner.put('/api/profile').set('X-CSRF-Token',ownerToken).send({name:'Anna Jaunā',email:'anna@test.lv'})).status).toBe(200);
  const other=request.agent(app),token=(await other.get('/api/auth/me')).body.csrfToken;
  await other.post('/api/auth/login').set('X-CSRF-Token',token).send({email:'anna@test.lv',password:pass});
  const result=await owner.put('/api/profile/password').set('X-CSRF-Token',ownerToken).send({current_password:pass,password:'NewPassword2026!',password_confirmation:'NewPassword2026!'});
  expect(result.status).toBe(200);ownerToken=result.body.csrfToken;
  expect((await other.get('/api/projects')).status).toBe(401);expect((await owner.get('/api/auth/me')).body.data.name).toBe('Anna Jaunā');
 });
 it('dzēš uzdevumu un projektu ar saistītajiem datiem',async()=>{
  expect((await owner.delete('/api/tasks/'+taskId).set('X-CSRF-Token',ownerToken)).status).toBe(200);
  expect((await owner.delete('/api/projects/'+projectId).set('X-CSRF-Token',ownerToken)).status).toBe(200);
  const [tasks]=await pool.query('SELECT id FROM tasks WHERE project_id=?',[projectId]);expect(tasks).toHaveLength(0);
 });
 it('izrakstīšanās izbeidz sesiju',async()=>{
  expect((await owner.post('/api/auth/logout').set('X-CSRF-Token',ownerToken)).status).toBe(200);
  expect((await owner.get('/api/projects')).status).toBe(401);
 });
});



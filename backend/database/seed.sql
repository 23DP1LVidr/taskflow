-- Tikai demonstrācijai. Visu trīs kontu parole: TaskFlow2026!
-- Atkārtota izpilde esošajiem demonstrācijas kontiem neveido jaunus projektus.
START TRANSACTION;
SET @new_demo = (SELECT COUNT(*)=0 FROM users WHERE email='anna@taskflow.lv');
INSERT IGNORE INTO users (name,email,password_hash) VALUES
('Anna Bērziņa','anna@taskflow.lv','$2b$12$3J5YmN7pQxarMxkoYrF62.WMqCG.puvQ.C6MKPJKyuNRUTwsFK/Be'),
('Mārtiņš Ozols','martins@taskflow.lv','$2b$12$3J5YmN7pQxarMxkoYrF62.WMqCG.puvQ.C6MKPJKyuNRUTwsFK/Be'),
('Elīna Kalniņa','elina@taskflow.lv','$2b$12$3J5YmN7pQxarMxkoYrF62.WMqCG.puvQ.C6MKPJKyuNRUTwsFK/Be');
SET @anna=(SELECT id FROM users WHERE email='anna@taskflow.lv');
SET @martins=(SELECT id FROM users WHERE email='martins@taskflow.lv');
SET @elina=(SELECT id FROM users WHERE email='elina@taskflow.lv');
INSERT INTO projects(owner_id,name,description,start_date,deadline)
SELECT @anna,'Skolas mājaslapas atjaunošana','Mūsdienīga un pieejama vietne mūsu skolas kopienai.',CURDATE()-INTERVAL 10 DAY,CURDATE()+INTERVAL 14 DAY WHERE @new_demo;
SET @p1=IF(@new_demo,LAST_INSERT_ID(),NULL);
INSERT INTO projects(owner_id,name,description,start_date,deadline)
SELECT @anna,'Studentu pasākums 2026','Plānojam iedvesmojošu tikšanos ar darbnīcām un kopīgu ideju apmaiņu.',CURDATE()-INTERVAL 5 DAY,CURDATE()+INTERVAL 25 DAY WHERE @new_demo;
SET @p2=IF(@new_demo,LAST_INSERT_ID(),NULL);
INSERT INTO projects(owner_id,name,description,start_date,deadline)
SELECT @anna,'TaskFlow izstrāde','No prasību analīzes līdz strādājošai projektu vadības sistēmai.',CURDATE()-INTERVAL 20 DAY,CURDATE()+INTERVAL 7 DAY WHERE @new_demo;
SET @p3=IF(@new_demo,LAST_INSERT_ID(),NULL);
INSERT INTO projects(owner_id,name,description,start_date,deadline)
SELECT @anna,'Komandas vizuālā identitāte','Vienots stils prezentācijām un mācību materiāliem.',CURDATE()-INTERVAL 30 DAY,CURDATE()-INTERVAL 2 DAY WHERE @new_demo;
SET @p4=IF(@new_demo,LAST_INSERT_ID(),NULL);
INSERT INTO project_members(project_id,user_id,role)
SELECT p.id,u.id,IF(u.id=@anna,'owner','member') FROM projects p CROSS JOIN users u
WHERE p.id IN (@p1,@p2,@p3,@p4) AND u.id IN (@anna,@martins,@elina);
INSERT INTO tasks(project_id,assigned_user_id,title,description,status,priority,due_date)
SELECT @p1,@anna,'Apkopot lietotāju vajadzības','Intervēt skolēnus un skolotājus.','completed','high',CURDATE()-INTERVAL 3 DAY WHERE @new_demo;
INSERT INTO tasks(project_id,assigned_user_id,title,description,status,priority,due_date)
SELECT @p1,@anna,'Izstrādāt sākumlapas dizainu','Sagatavot mobilā un datora skata maketu.','in_progress','high',CURDATE()+INTERVAL 2 DAY WHERE @new_demo;
INSERT INTO tasks(project_id,assigned_user_id,title,description,status,priority,due_date)
SELECT @p1,@martins,'Izveidot navigāciju','Pārbaudīt tastatūras vadību un izvēlni telefonā.','todo','medium',CURDATE()+INTERVAL 5 DAY WHERE @new_demo;
INSERT INTO tasks(project_id,assigned_user_id,title,description,status,priority,due_date)
SELECT @p1,@elina,'Sagatavot jaunumu saturu','Apkopot aktuālākos notikumus.','todo','low',CURDATE()+INTERVAL 6 DAY WHERE @new_demo;
INSERT INTO tasks(project_id,assigned_user_id,title,description,status,priority,due_date)
SELECT @p2,@anna,'Rezervēt pasākuma telpu','Saskaņot pieejamību ar administrāciju.','completed','high',CURDATE()-INTERVAL 1 DAY WHERE @new_demo;
INSERT INTO tasks(project_id,assigned_user_id,title,description,status,priority,due_date)
SELECT @p2,@elina,'Sagatavot afišu','Izveidot drukas un sociālo tīklu versijas.','in_progress','medium',CURDATE()+INTERVAL 3 DAY WHERE @new_demo;
INSERT INTO tasks(project_id,assigned_user_id,title,description,status,priority,due_date)
SELECT @p2,@anna,'Saskaņot programmu','Apstiprināt darbnīcu vadītājus.','todo','high',CURDATE()+INTERVAL 4 DAY WHERE @new_demo;
INSERT INTO tasks(project_id,assigned_user_id,title,description,status,priority,due_date)
SELECT @p3,@anna,'Pabeigt prasību analīzi','Definēt funkcionālās prasības.','completed','high',CURDATE()-INTERVAL 9 DAY WHERE @new_demo;
INSERT INTO tasks(project_id,assigned_user_id,title,description,status,priority,due_date)
SELECT @p3,@martins,'Izveidot datubāzes shēmu','Tabulas, ārējās atslēgas un indeksi.','completed','high',CURDATE()-INTERVAL 5 DAY WHERE @new_demo;
INSERT INTO tasks(project_id,assigned_user_id,title,description,status,priority,due_date)
SELECT @p3,@anna,'Pārbaudīt piekļuves tiesības','Pārbaudīt īpašnieka, dalībnieka un sveša lietotāja darbības.','in_progress','high',CURDATE()-INTERVAL 1 DAY WHERE @new_demo;
INSERT INTO tasks(project_id,assigned_user_id,title,description,status,priority,due_date)
SELECT @p3,@elina,'Sagatavot demonstrāciju','Izveidot gala prezentācijas scenāriju.','todo','medium',CURDATE()+INTERVAL 7 DAY WHERE @new_demo;
INSERT INTO tasks(project_id,assigned_user_id,title,description,status,priority,due_date)
SELECT @p4,@anna,'Apstiprināt krāsu paleti','Indigo, balts un tumši zils.','completed','medium',CURDATE()-INTERVAL 4 DAY WHERE @new_demo;
INSERT INTO tasks(project_id,assigned_user_id,title,description,status,priority,due_date)
SELECT @p4,@elina,'Izveidot prezentācijas veidni','Koplietojama veidne visai komandai.','completed','low',CURDATE()-INTERVAL 2 DAY WHERE @new_demo;
COMMIT;

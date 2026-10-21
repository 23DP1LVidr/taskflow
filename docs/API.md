# REST API
Bāze: /api. Atbildes: { "data": ... }; kļūdas: { "error": "Latvisks teksts", "details": [...] }. details ir pieejams validācijas kļūdām. Sesijas cookie: taskflow.sid. Visām POST/PUT/PATCH/DELETE darbībām vajag X-CSRF-Token, ko saņem no GET /auth/me. Pēc pieteikšanās un paroles maiņas izmanto jauno atbildes marķieri.

| Metode | Adrese | Piekļuve |
|---|---|---|
| GET | /auth/me | Publiska; lietotājs vai null un csrfToken |
| POST | /auth/register | Publiska, CSRF, mēģinājumu limits |
| POST | /auth/login | Publiska, CSRF, mēģinājumu limits |
| POST | /auth/logout | Pieteicies |
| GET, POST | /projects | Pieteicies |
| GET | /projects/:id | Projekta dalībnieks |
| PUT, DELETE | /projects/:id | Īpašnieks |
| GET | /projects/:id/members | Dalībnieks |
| POST | /projects/:id/members | Īpašnieks, body: email |
| DELETE | /projects/:id/members/:userId | Īpašnieks |
| GET, POST | /projects/:id/tasks | Dalībnieks |
| PUT, DELETE | /tasks/:id | Attiecīgā projekta dalībnieks |
| PATCH | /tasks/:id/status | Dalībnieks, body: status |
| GET | /tasks/my | Pieteicies |
| GET | /dashboard/stats | Pieteicies |
| PUT | /profile | Pieteicies |
| PUT | /profile/password | Pieteicies, mēģinājumu limits |

Reģistrācija: name, email, password, password_confirmation. Pieteikšanās: email, password.
Profils: name, email. Paroles maiņa: current_password, password, password_confirmation.
Projekts: name, description, start_date, deadline. Datumi: YYYY-MM-DD, tukša virkne vai null.
Uzdevums: title, description, assigned_user_id (ID vai null), status (todo/in_progress/completed), priority (low/medium/high), due_date.
PUT sagaida pilnu rediģējamo objektu. Izveidošana atgriež 201; citas veiksmīgas operācijas 200.
Statusi: 401 nav sesijas, 403 neatļauta darbība/CSRF, 404 objekts nav pieejams, 409 dublikāts, 422 nederīga ievade, 429 pārsniegts limits, 500 neparedzēta servera kļūda.


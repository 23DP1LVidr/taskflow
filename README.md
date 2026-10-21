# TaskFlow
Pilnvērtīga projektu vadības lietotne studentiem un mazām komandām. Saskarne un projekta dokumentācija ir latviešu valodā.

## Iespējas
- Reģistrācija, pieteikšanās, izrakstīšanās, profila un paroles maiņa.
- MySQL saglabātas sesijas, HttpOnly sīkdatnes, CSRF marķieri un bcrypt paroles.
- Projektu izveide, labošana, dzēšana, datumi un progresa aprēķins.
- Īpašnieks pievieno reģistrētus lietotājus pēc e-pasta un noņem dalībniekus. Pievienošana uzreiz piešķir piekļuvi; e-pasts netiek sūtīts.
- Uzdevumu izveide, labošana, dzēšana, piešķiršana, prioritātes un termiņi.
- Trīs kolonnu Kanban ar vilkšanu datorā; telefonā un ar tastatūru statusu maina uzdevuma dialogā.
- Meklēšana un filtri, personīgie uzdevumi, komanda, datubāzes statistika.
- Adaptīvs izkārtojums, gaišā/tumšā tēma ar pārlūkā saglabātu izvēli.

## Tehnoloģijas
Vue 3 Composition API, TypeScript, Vite, Vuetify 3, Pinia, Vue Router, Axios.
Node.js, Express 5, TypeScript, mysql2, bcrypt, express-session, Zod, Vitest, Supertest.
Dati tiek glabāti MySQL. XAMPP piegādātā MariaDB ir saderīga ar izmantoto shēmu.

## Priekšnosacījumi Windows datorā
1. Node.js 24 LTS ar npm.
2. XAMPP ar palaistu MySQL moduli (Apache nav nepieciešams).
3. Git.
4. Brīvi porti 3000 (API) un 5173 (Vite).

Visas tālākās komandas izpilda PowerShell. Ja sistēma bloķē npm.ps1, izmantojiet npm.cmd.

## Uzstādīšana
Atveriet projekta mapi:

```powershell
cd D:\nobeiguma_darbs\taskflow
npm.cmd install
Copy-Item backend\.env.example backend\.env
Copy-Item frontend\.env.example frontend\.env
```

Ja backend/.env jau ir konfigurēts, nekopējiet tam pāri. Atveriet backend/.env un norādiet savus MySQL parametrus:

```dotenv
PORT=3000
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=taskflow
SESSION_SECRET=šeit-jāievieto-unikāla-nejauša-vērtība
NODE_ENV=development
TEST_DB_NAME=taskflow_test
```

Drošu sesijas noslēpumu ģenerē ar:

```powershell
node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
```

Iegūto vērtību ievietojiet SESSION_SECRET. .env faili ir ignorēti Git. Noklusētais paraugs netiek pieņemts servera palaišanai.

### Datubāzes sagatavošana
XAMPP vadības panelī palaidiet MySQL un izpildiet:

```powershell
npm.cmd run db:init
npm.cmd run db:seed
```

db:init izveido datubāzi un tabulas no backend/database/schema.sql. Nepieciešamas datubāzes izveides tiesības. db:seed importē backend/database/seed.sql. Tas pievieno demonstrācijas projektus tikai pirmajā izpildē, ja Anna vēl nav reģistrēta.

Alternatīva manuālai SQL importēšanai:

```powershell
C:\xampp\mysql\bin\mysql.exe -u root -p
```

MySQL konsolē:

```sql
CREATE DATABASE taskflow CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE taskflow;
SOURCE D:/nobeiguma_darbs/taskflow/backend/database/schema.sql;
SOURCE D:/nobeiguma_darbs/taskflow/backend/database/seed.sql;
```

### Palaišana
Abi serveri vienā terminālī:

```powershell
cd D:\nobeiguma_darbs\taskflow
npm.cmd run dev
```

Atveriet http://127.0.0.1:5173. Apturēšana: Ctrl+C.

Atsevišķos termināļos, ja nepieciešams:

```powershell
cd D:\nobeiguma_darbs\taskflow\backend
npm.cmd install
npm.cmd run dev
```

```powershell
cd D:\nobeiguma_darbs\taskflow\frontend
npm.cmd install
npm.cmd run dev
```

Frontend izmanto relatīvu /api adresi. Vite starpniekserveris pārsūta pieprasījumus uz API_TARGET (pēc noklusējuma http://127.0.0.1:3000). Nelieciet frontend Axios konfigurācijā atsevišķu domēnu; vienas izcelsmes pieeja saglabā sesiju un CSRF plūsmu.

### Demonstrācijas konti
Visiem demonstrācijas kontiem parole: **TaskFlow2026!**
- anna@taskflow.lv — četru projektu īpašniece.
- martins@taskflow.lv — dalībnieks.
- elina@taskflow.lv — dalībniece.

Demonstrācijas paroles nav paredzētas publiskai videi.

### Šajā datorā sagatavotā pārbaudes vide
Izstrādes laikā izveidota atsevišķa XAMPP MariaDB datu mape **.local/mysql**, ports **3307**, bez esošo XAMPP datu maiņas. Pašreizējais backend/.env ir tai pielāgots. Ja izolētais serveris nav palaists:

```powershell
Start-Process -FilePath 'C:\xampp\mysql\bin\mysqld.exe' -ArgumentList '--defaults-file=D:\nobeiguma_darbs\taskflow\.local\mysql\my.ini','--bind-address=127.0.0.1','--console' -WindowStyle Hidden
npm.cmd run dev
```

Šī .local mape nav repozitorija daļa. Citā datorā izmantojiet parasto XAMPP MySQL ar 3306 portu un iepriekšējās uzstādīšanas darbības. Lai apturētu tikai izolēto datubāzi:

```powershell
C:\xampp\mysql\bin\mysqladmin.exe -h 127.0.0.1 -P 3307 -u root shutdown
```

## Pārbaudes
```powershell
npm.cmd test
npm.cmd run build
npm.cmd audit
```

Testi izmanto reālu MySQL savienojumu un atsevišķu TEST_DB_NAME datubāzi. Nosaukumam jābeidzas ar _test un jāatšķiras no DB_NAME. **Pirms testiem šīs testa datubāzes tabulu saturs tiek dzēsts.** Neizmantojiet datubāzi ar vajadzīgiem datiem. Ja serveris nav sasniedzams, testi beidzas ar kļūdu; aizstāšana ar imitētiem datiem nenotiek.

## Produkcijas būvējums
npm run build pārbauda TypeScript un izveido backend/dist un frontend/dist. Backend produkcijas režīmā apkalpo arī frontend un Vue Router adreses.

```powershell
npm.cmd run build
cd backend
$env:NODE_ENV='production'
npm.cmd start
```

Produkcijai vajadzīgs HTTPS reverse proxy, kas pievieno X-Forwarded-Proto. Lietotne uzticas vienam proxy līmenim un lieto Secure sīkdatni. Ierobežojiet tiešu piekļuvi API portam un izmantojiet MySQL lietotāju ar konkrētās datubāzes tiesībām. Izstrādei ar HTTP atstājiet NODE_ENV=development.

## Struktūra
- frontend/src/components — atkārtoti izmantojami dialogi, kartītes, Kanban, navigācija.
- frontend/src/views — maršrutu skati.
- frontend/src/stores — autentifikācija un paziņojumi.
- backend/src/routes — API maršruti.
- backend/src/controllers — HTTP pieprasījumu apstrāde.
- backend/src/services — validācija, sesijas, projektu un uzdevumu loģika.
- backend/src/repositories — parametrizēta SQL izpilde un transakcijas.
- backend/src/middleware — autentifikācija, autorizācija, CSRF un kļūdas.
- backend/database — shēma un demonstrācijas SQL.
- backend/tests — integrācijas testi.
- docs — SDLC, API un pārbaudes rezultāti.
- TEAM_WORKFLOW.md — komandas darbs un GitHub process.

## Biežākās problēmas
- ECONNREFUSED: palaidiet MySQL un pārbaudiet DB_PORT.
- Access denied: pārbaudiet DB_USER un DB_PASSWORD.
- 403 pēc ilgas dīkstāves: pārlādējiet lapu un piesakieties atkārtoti.
- 3000 ports aizņemts: mainiet PORT un frontend API_TARGET kopā.
- PowerShell skriptu politika bloķē npm: lietojiet npm.cmd.
- Pieteikšanās HTTPS vidē nedarbojas: pārbaudiet proxy un Secure sīkdatnes konfigurāciju.


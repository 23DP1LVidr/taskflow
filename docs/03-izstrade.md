# 3. Izstrāde
## Izmantotās tehnoloģijas
Frontend: Vue 3 Composition API un TypeScript, Vuetify 3 komponentes un Material Design ikonas, Pinia, Vue Router, Axios, Vite.
Backend: Node.js un Express, TypeScript, mysql2/promise, bcrypt, express-session, Zod, helmet un express-rate-limit.
Testēšana: Vitest un Supertest pret atsevišķu reālu MySQL datubāzi.

## Ieviešanas secība
1. Tukšas darba mapes pārbaude un npm darbvietu izveide.
2. Shēma, konfigurācija, SQL vaicājumu palīgfunkcijas un transakcijas.
3. Sesiju glabātuve, autentifikācija, CSRF, validācija.
4. Projekti, dalība un atļaujas.
5. Uzdevumi un piešķiršanas validācija.
6. Vue skati, atkārtoti lietojamas kartītes/dialogi un Kanban.
7. Statistika, filtri, tēmas un adaptīvie stili.
8. Demonstrācijas dati, integrācijas testi un dokumentācija.
9. Kompilācijas un integrācijas kļūdu novēršana.

## Galvenie lēmumi
- SQL ir parametrizēts; vairāki SQL teikumi atļauti tikai uzticamajiem shēmas/sēklas importiem.
- Pievienojot projektu, īpašnieka dalība izveidojas tajā pašā transakcijā.
- Dalībnieka noņemšana un uzdevuma piešķiršana bloķē projekta rindu, lai novērstu savstarpēju sacensību.
- Kanban izmaiņu atbilde tiek sagaidīta pirms datu atjaunošanas; kļūdas gadījumā lietotājs neredz nepersistētu statusu kā veiksmīgu.
- Progress tiek aprēķināts vaicājumā, nevis saglabāts dublētā kolonnā.
- Statusi un prioritātes API ir stabili kodi, bet saskarnē tiek tulkoti.
- Tēma glabājas localStorage; autentifikācijas dati netiek glabāti localStorage.

## Koda organizācija
Kontrolieri pārveido HTTP pieprasījumus atbildēs, servisi satur atkārtoto biznesa loģiku, repozitorija palīgfunkcijas nodrošina vienotu SQL un transakciju izpildi. Nelielā projektā nav papildu ORM vai nevajadzīgu abstrakciju.


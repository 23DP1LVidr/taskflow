# Pārbaudes rezultāti
Pārbaudes datums: 2026. gada 19. oktobris.

## Izpildīts
- npm install: atkarības instalētas, package-lock.json izveidots.
- npm audit pēc Vitest atjaunināšanas: 0 ievainojamību.
- npm run db:init: shēma izveidota reālā XAMPP MariaDB 10.4.32 instancē.
- npm run db:seed: izveidoti 3 demonstrācijas konti, 4 projekti un 13 uzdevumi.
- npm test: **20 no 20 integrācijas testiem izpildīti sekmīgi**. Pēdējais izpildes ilgums: 6,98 sekundes.
- npm run build: backend TypeScript, frontend vue-tsc un Vite produkcijas būvējums sekmīgi.
- HTTP pārbaude: frontend / un caur Vite proxy /api/auth/me atbild ar 200.
- Caur Vite proxy: Annas demonstrācijas pieteikšanās, dashboard datu lasīšana un izrakstīšanās sekmīga. Kopsavilkums: 4 projekti, 46% progress.
- Galvenā frontend JavaScript pakotne pēc izmantoto Vuetify komponentu atlases: aptuveni 430 kB, gzip 148 kB. Būvējums bez lielas JavaScript pakotnes brīdinājuma.

## Vide
Windows, Node.js 24.13.0, npm 11.6.2. Izolēta datubāze .local/mysql, 127.0.0.1:3307. Lietotnes datubāze taskflow, integrācijas testu datubāze taskflow_test. Esošā XAMPP datu mape netika mainīta.

## Ierobežojumi
Pārlūka rīks ziņoja, ka iebūvētais pārlūks nav pieejams, un pieejamo pārlūku saraksts bija tukšs. Tādēļ vizuāla pārbaude, vilkšana ar peli un mobilā izkārtojuma interaktīva pārbaude nav izpildīta. Šīs pārbaudes ir aprakstītas 04-testesana.md. HTTP/API un produkcijas kompilācijas pārbaudes ir izpildītas.

MySQL 8 GitHub Actions darbplūsma ir pievienota, bet GitHub vidē nav palaista. Šajā datorā pārbaudīts XAMPP MySQL saderīgais MariaDB dzinējs. HTTPS produkcijas izvietojums nav veikts.


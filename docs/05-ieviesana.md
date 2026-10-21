# 5. Ieviešana
Detalizētas Windows komandas ir README.md.

## Lokāla ieviešana
1. Uzstāda Node.js 24, npm, Git un XAMPP.
2. Palaid MySQL; pārbauda portu, lietotāju un paroli.
3. Instalē npm darbvietu atkarības projekta saknē.
4. Kopē .env.example un ģenerē unikālu SESSION_SECRET.
5. Izpilda db:init un vajadzības gadījumā db:seed.
6. Palaid npm run dev un atver Vite adresi.
7. Pārbauda pieteikšanos, projekta izveidi, Kanban statusu un pārlādes persistenci.

## API savienojums
Frontend izmanto /api ar cookies. Vite proxy adresi nosaka API_TARGET. API izmaiņu pieprasījumi izmanto X-CSRF-Token no /api/auth/me vai pieteikšanās atbildes. CORS atvēršana nav nepieciešama.

## Produkcijas ieviešana
Izveido būvējumu, nodrošina MySQL un HTTPS reverse proxy, nosaka NODE_ENV=production. Express apkalpo kompilēto Vue un API vienā izcelsmē. Secure cookies prasa HTTPS un pareizu X-Forwarded-Proto. API nav tieši jāpublicē ārpus uzticamā proxy.

Produkcijā neimportē publiski zināmus demo kontus. Lieto atsevišķu datubāzes lietotāju un noslēpumu pārvaldību, regulāras rezerves kopijas, procesu uzraudzību un piekļuves žurnālus. Arhitektūra pašreiz uzticas vienam proxy līmenim.

## Pieņemšana
Atbildīgais demonstrē lietotāja galveno plūsmu un pārbauda testu rezultātus. Šīs piegādes ietvaros hostings un GitHub publicēšana nav veikta; projekts paredzēts vietējai palaišanai.


# 4. Testēšana
## Automātiskā pārbaude
No projekta saknes: npm.cmd test. Integrācijas testu fails: backend/tests/api.test.ts. Pirms palaišanas jābūt sasniedzamam MySQL serverim, TEST_DB_NAME jābeidzas ar _test. Testa datubāzes tabulas tiek iztīrītas, tāpēc tai jābūt tikai testiem.

Testi nav SQL imitācijas: tie sūta īstus HTTP pieprasījumus Express lietotnei un izmanto MySQL tabulas. Secīgie testi pārbauda pilnu lietotāja darba gaitu.

| Scenārijs | Sagaidāmais rezultāts |
|---|---|
| Pieprasījums bez sesijas | 401 |
| Mutācija bez CSRF | 403 |
| Nederīga reģistrācija | 422 |
| Reģistrācija | 201, bcrypt parole, HttpOnly un SameSite |
| Atkārtots e-pasts | 409 |
| Pareiza/nepareiza pieteikšanās | 200/401 |
| Sesijas lasīšana citā API instancē | Tas pats lietotājs no MySQL |
| Projekta izveide | Īpašnieka dalība un 0% |
| Sveša projekta piekļuve | 404 |
| Dalībnieka pievienošana | 201; dublikāts 409 |
| Dalībnieks labo īpašnieka iestatījumus | 403 |
| Dalībnieks izveido uzdevumu | 201 un piešķīrums |
| Uzdevums piešķirts svešam lietotājam | 422 |
| Uzdevuma rediģēšana/statuss | 200, izmaiņas MySQL |
| Progresa aprēķins | 100% ar vienu pabeigtu, 50% ar vienu no diviem |
| Sveša uzdevuma maiņa | 404 |
| Nederīgs statusa kods | 422 |
| Informācijas panelis | Kopsavilkumi atbilst DB |
| Dalībnieka noņemšana | Piešķīrums NULL, piekļuve atņemta |
| Profils un paroles maiņa | Dati saglabāti, citas sesijas anulētas |
| Dzēšana | Saistītie dati kaskādē dzēsti |
| Izrakstīšanās | Turpmākais aizsargātais pieprasījums 401 |

## Manuālā regresija
1. Pieteikties ar demonstrācijas kontu.
2. Izveidot projektu ar nosaukumu, sākumu un termiņu.
3. Pievienot martins@taskflow.lv; otrā pārlūkā pārbaudīt dalībnieka piekļuvi.
4. Izveidot uzdevumu, piešķirt dalībniekam, izvēlēties prioritāti.
5. Pārvilkt uz Procesā un Pabeigts; pārlādēt lapu un pārbaudīt statusu.
6. Pārbaudīt meklēšanu, prioritātes/atbildīgā filtrus un personīgos uzdevumus.
7. Dialogā ar tastatūru mainīt statusu.
8. Pārslēgt tēmu, pārlādēt un pārbaudīt izvēles saglabāšanos.
9. Pārbaudīt 390 px, 768 px un 1440 px platumu; mobilajā izvēlni atver galvenes poga.
10. Pārbaudīt tukšus stāvokļus, kļūdu paziņojumus un dzēšanas apstiprinājuma atcelšanu.
11. Izrakstīties un mēģināt atvērt aizsargātu adresi.

## Pārbaudes ierobežojumi
API integrācijas testi neaizstāj vizuālo pārbaudi pārlūkā. Konkrētās piegādes izpildīto pārbaužu rezultāti un ierobežojumi ir docs/VERIFICATION.md.


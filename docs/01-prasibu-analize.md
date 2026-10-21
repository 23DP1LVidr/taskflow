# 1. Prasību analīze
## Problēma un mērķis
Studentu grupās uzdevumi bieži izkaisīti sarakstēs un failos. Nav skaidrs atbildīgais, termiņš un progress. TaskFlow nodrošina kopīgu projektu darba vietu, kur projekta īpašnieks organizē komandu, bet dalībnieki pārvalda uzdevumus.

Mērķauditorija: skolēnu un studentu komandas, nelielas darba grupas, pasākumu organizētāji. Galvenais scenārijs: izveidot projektu, pievienot komandu, sadalīt uzdevumus, sekot izpildei.

## Funkcionālās prasības
| ID | Prasība | Pieņemšanas kritērijs |
|---|---|---|
| F01 | Konta reģistrācija un pieteikšanās | Derīgi dati izveido lietotāju; sesija saglabājas pēc API restartēšanas |
| F02 | Projektu CRUD | Īpašnieks izveido, labo un dzēš projektu |
| F03 | Dalībnieku pārvaldība | Tikai īpašnieks pievieno/noņem reģistrētu lietotāju |
| F04 | Uzdevumu CRUD | Projekta dalībnieks veido, labo, piešķir un dzēš uzdevumu |
| F05 | Kanban | Statusa maiņa saglabājas datubāzē un pēc pārlādes |
| F06 | Progress | Pabeigtie / visi × 100; bez uzdevumiem 0% |
| F07 | Statistika un filtri | Statistika no DB; uzdevumi filtrējami pēc statusa/prioritātes/atbildīgā atbilstošajā skatā |
| F08 | Profils un parole | Profils mainās; vecā parole jāpārbauda pirms jaunas saglabāšanas |
| F09 | Tēmas | Gaišā/tumšā izvēle saglabājas pārlūkā |

## Nefunkcionālās prasības
- Drošība: bcrypt, parametrizēti SQL vaicājumi, CSRF, HttpOnly sīkdatne, autorizācija katrā aizsargātā API darbībā.
- Datu integritāte: ārējās atslēgas, unikāli e-pasti un dalība, transakcijas savstarpēji saistītām izmaiņām.
- Lietojamība: latviešu valoda, tukšie stāvokļi, ielādes indikatori, kļūdu paziņojumi, dzēšanas apstiprinājumi.
- Pieejamība: formu etiķetes, fokusa indikatori, tastatūras alternatīva kartīšu vilkšanai.
- Adaptivitāte: mobilais navigācijas panelis un vienas kolonnas izkārtojums šauros ekrānos.
- Uzturamība: TypeScript, slāņota API struktūra, atkārtoti izmantojamas komponentes, reproducējamas npm komandas.

## Robežas un pieņēmumi
Pievienošana pēc e-pasta uzreiz pievieno jau reģistrētu lietotāju. E-pasta vēstules, paziņojumi reāllaikā, failu pielikumi un aizmirstas paroles atjaunošana nav šīs versijas funkcijas. Dati nav aizstāti ar frontend demonstrācijas masīviem.


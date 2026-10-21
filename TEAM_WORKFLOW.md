# Komandas darba organizācija
## Atbildības
| Loma | Atbildība | Darba rezultāts |
|---|---|---|
| Projekta vadītājs | Prioritātes, termiņi, risku novēršana, sprinta sapulces | Sakārtots darbu saraksts un pieņemšanas kritēriji |
| UI/UX dizainers | Lietotāju plūsmas, mobilais skats, krāsas, pieejamība | Maketi un komponentu vadlīnijas |
| Frontend izstrādātājs | Vue skati, Vuetify komponentes, API integrācija | Lietojama latviešu saskarne |
| Backend izstrādātājs | API, MySQL, sesijas, autorizācija | Droša datu apstrāde un SQL skripti |
| Testētājs | Scenāriji, regresija, atļauju pārbaude | Testu rezultāti un kļūdu ziņojumi |

Mazā komandā viens cilvēks var pildīt vairākas lomas, bet citas personas pārskats jāsaņem pirms apvienošanas.

## GitHub plūsma
1. Izveido GitHub repozitoriju un issue katram darbam; issue satur mērķi, pieņemšanas kritērijus un atbildīgo.
2. No atjaunināta main izveido feature/uzdevuma-nosaukums vai fix/kludas-nosaukums.
3. Veido nelielus, saprotamus commit, piemēram, feat: pievienota uzdevumu filtrēšana.
4. Atver pull request ar problēmu, risinājumu un izpildīto pārbaužu rezultātiem.
5. Otrs komandas dalībnieks pārbauda izmaiņas. CI izpilda integrācijas testus un būvējumu.
6. Pēc apstiprinājuma izmanto squash merge, dzēs pabeigto zaru un aizver issue.
7. main saglabā palaižamu; gala demonstrācijai izmanto versijas tagu v1.0.0.

Lokāla Git sagatavošana:
```powershell
git init
git add .
git commit -m "feat: TaskFlow sākotnējā versija"
git branch -M main
git remote add origin <jūsu-GitHub-repozitorija-adrese>
git push -u origin main
```

.env, node_modules, dist un .local nav jāpievieno Git. Paroles un personu dati nedrīkst būt commit saturā. Šī piegāde automātiski neizveido un nepublicē GitHub repozitoriju.

## Divu nedēļu sprinta piemērs
| Diena | Darbs | Atbildīgais |
|---|---|---|
| 1–2 | Prasības, datu modelis, saskarņu plūsmas | Vadītājs, dizainers, backend |
| 3–4 | Sesijas, reģistrācija, navigācija | Backend, frontend |
| 5–6 | Projekti, komanda, autorizācija | Backend, frontend |
| 7–8 | Kanban, filtri, statistika | Frontend, backend |
| 9 | Drošības un integrācijas testi, mobilais skats | Testētājs, dizainers |
| 10 | Kļūdu labojumi, dokumentācija, demonstrācija | Visa komanda |

Ikdienas 10 minūšu sapulcē apspriež paveikto, nākamo soli un šķēršļus. Sprinta beigās demonstrē darbojošās funkcijas un retrospektīvā vienojas par vienu procesa uzlabojumu.

## Gatavības kritēriji
Funkcija strādā ar datubāzi, atļaujas pārbauda serveris, teksti ir latviski, kļūdas ir saprotamas, vajadzīgie testi izpildīti, dokumentācija atjaunināta un pārskatītājs apstiprinājis izmaiņas.


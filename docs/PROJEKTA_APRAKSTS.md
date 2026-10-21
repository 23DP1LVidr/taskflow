# TaskFlow projekta izstrādes dokumentācija

**Projekts:** TaskFlow — projektu un uzdevumu pārvaldības tīmekļa lietotne  
**Dokumenta sagatavošanas datums:** 2026. gada 21. oktobris  
**Mērķauditorija:** skolēni, studenti un nelielas komandas

Dokumentā aprakstīta projekta ideja, plānošana, risināmā problēma, līdzīgu produktu izpēte un īstenotā izstrāde. Tas balstīts projekta prasībās, izveidotajā lietotnē un reģistrētajos pārbaudes rezultātos. Tirgus salīdzinājums papildināts dokumentācijas sagatavošanas laikā; tas nav lietotāju aptaujas vai pirms izstrādes veiktu interviju rezultāts.

## 1. Ideja

TaskFlow ideja bija izveidot vienotu darba vidi, kurā neliela komanda varētu organizēt projektu, sadalīt pienākumus un sekot uzdevumu izpildei. Par pamatu tika izmantota vajadzība skaidri redzēt trīs lietas: kas ir jāpaveic, kurš par to atbild un līdz kuram datumam darbs jāpabeidz.

Lietotne tika iecerēta kā mācību projekts, kas praktiski demonstrē programmatūras izstrādes dzīves ciklu. Bija svarīgi izstrādāt gan lietotāja saskarni, gan servera daļu un datubāzi, lai lietotāju darbības saglabātos un būtu pārbaudāmas.

Galvenā lietošanas situācija ir grupas mācību darbs. Viens lietotājs izveido projektu, pievieno reģistrētus komandas dalībniekus un kopā ar viņiem izveido uzdevumus. Katram uzdevumam var norādīt atbildīgo, prioritāti un termiņu. Darba gaitā uzdevumu pārvieto starp statusiem “Jāizdara”, “Procesā” un “Pabeigts”.

Tika noteikti šādi projekta mērķi:

- nodrošināt pārskatāmu projektu un uzdevumu uzskaiti;
- padarīt pienākumu sadali redzamu visai projekta komandai;
- automātiski aprēķināt projekta izpildes progresu;
- aizsargāt projektu datus no nepiederošiem lietotājiem;
- izveidot saskarni latviešu valodā;
- iegūt praktisku pieredzi pilna cikla tīmekļa lietotnes izstrādē.

**Posma rezultāts:** formulēta lietotnes iecere, mērķauditorija un galvenais darbības scenārijs.

## 2. Plānošana

Plānošanā sākotnējā ideja tika sadalīta konkrētās funkcijās un izstrādes darbos. Vispirms bija jānodrošina datu glabāšana un lietotāju piekļuve, pēc tam projektu, komandu un uzdevumu pārvaldība. Saskarnes pilnveidošana un dokumentēšana balstījās uz šīm pamatfunkcijām.

### 2.1. Darbu secība

| Solis | Plānotais darbs | Sagaidāmais rezultāts |
|---|---|---|
| 1. | Pārbaudīt darba mapi un sagatavot struktūru | Atsevišķas frontend, backend un docs mapes |
| 2. | Izveidot datubāzes modeli un savienojumu | Saistītas lietotāju, projektu, dalības, uzdevumu un sesiju tabulas |
| 3. | Īstenot autentifikāciju | Reģistrācija, pieteikšanās un aizsargāta piekļuve |
| 4. | Izveidot projektu un komandas pārvaldību | Projekti ar īpašnieku un dalībniekiem |
| 5. | Īstenot uzdevumus un Kanban | Uzdevumu izveide, piešķiršana un statusu maiņa |
| 6. | Pievienot pārskatus un iestatījumus | Statistika, personīgie uzdevumi, profils un tēmas |
| 7. | Sagatavot demonstrācijas datus un testus | Atkārtojama funkciju un atļauju pārbaude |
| 8. | Novērst konstatētās kļūdas un dokumentēt | Palaižama lietotne un uzstādīšanas apraksts |

Šī tabula apraksta darbu secību, nevis faktiski uzskaitītas darba dienas. Precīzs katram posmam patērētais laiks netika reģistrēts.

### 2.2. Tehnoloģiju izvēle

Lietotāja saskarnei tika izvēlēts Vue 3 ar Composition API un TypeScript. Vuetify 3 nodrošina formas, dialogus, navigāciju un citas atkārtoti izmantojamas komponentes. Vue Router pārvalda lapu adreses, Pinia — kopīgo lietotāja stāvokli, savukārt Axios nodrošina saziņu ar serveri. Izstrādei un būvēšanai izmantots Vite.

Servera daļa izveidota ar Node.js, Express un TypeScript. Datu glabāšanai izvēlēta MySQL datubāze un mysql2 bibliotēka. Lokālajā pārbaudē izmantots XAMPP piegādātais MariaDB dzinējs, kas ir saderīgs ar projektā izmantotajiem SQL vaicājumiem.

Atkarību pārvaldībai izmantots npm. Projektā sagatavots Git repozitorijs un GitHub Actions pārbaudes darbplūsma. PHP, Laravel un Composer netika izmantoti.

### 2.3. Datu un piekļuves plānošana

Tika paredzētas piecas galvenās tabulas: users, projects, project_members, tasks un sessions. Šāds sadalījums ļauj vienam lietotājam piedalīties vairākos projektos, bet katram projektam saturēt vairākus uzdevumus un dalībniekus.

Tika noteiktas divas projekta lomas. Īpašnieks pārvalda projekta informāciju un dalībniekus. Dalībnieks var apskatīt projektu un pārvaldīt tā uzdevumus. Nepiederošs lietotājs projektam piekļūt nevar.

**Posma rezultāts:** izveidots funkciju saraksts, izvēlētas tehnoloģijas, noteikta izstrādes secība un datu struktūra.

## 3. Problēmas analīze

Projekta prasībās tika pieņemts, ka nelielas komandas darbā informācija var būt izkaisīta sarakstēs, dokumentos un individuālos pierakstos. Šādā situācijā ir grūtāk pārbaudīt aktuālo darba stāvokli un saprast katra dalībnieka pienākumus. Šis ir projektēšanas pieņēmums, nevis ar aptauju pierādīts secinājums par visām studentu komandām.

### 3.1. Identificētās problēmas un risinājumi

| Problēma | Iespējamās sekas | TaskFlow risinājums |
|---|---|---|
| Uzdevumi atrodas dažādās vietās | Kāds darbs tiek aizmirsts vai izpildīts atkārtoti | Vienots projekta uzdevumu dēlis |
| Nav norādīts atbildīgais | Pienākumi paliek nesadalīti | Uzdevuma piešķiršana projekta dalībniekam |
| Nav skaidra izpildes stadija | Komanda nevar novērtēt, kas vēl jāizdara | Trīs uzdevumu statusi un Kanban skats |
| Termiņi nav pārskatāmi | Palielinās nokavētu darbu risks | Termiņi un nokavētu uzdevumu atzīmes |
| Progress jāaprēķina manuāli | Informācija var kļūt neaktuāla | Automātisks progresa aprēķins |
| Nav nodalītas lietotāju tiesības | Datus var mainīt neatbilstoša persona | Sesijas un autorizācija serverī |
| Personīgie darbi izkaisīti pa projektiem | Grūti saprast savu nākamo uzdevumu | Sadaļa “Mani uzdevumi” |

### 3.2. Prasības risinājumam

Lietotnei bija jānodrošina ne tikai ērts izskats, bet arī datu integritāte un piekļuves kontrole. Piemēram, uzdevumu drīkst piešķirt tikai konkrētā projekta dalībniekam. Noņemot dalībnieku, viņam jāzaudē piekļuve projektam un jānoņem viņa uzdevumu piešķīrumi.

Tika noteikts, ka paroles nedrīkst glabāt atklātā tekstā, SQL vaicājumiem jābūt parametrizētiem un piekļuves tiesības jāpārbauda servera pusē. Pogas paslēpšana saskarnē pati par sevi nenodrošina datu aizsardzību.

Lietojamības prasībās ietverta latviešu valoda, saprotami kļūdu paziņojumi, ielādes indikatori, tukšu sarakstu skaidrojumi un dzēšanas apstiprinājumi. Uzdevuma statusu var mainīt arī dialogā, lai darbība būtu pieejama bez kartītes vilkšanas.

### 3.3. Darba apjoma robežas

Šajā versijā netika paredzēta failu pievienošana, komentāri, e-pasta paziņojumi, paroles atjaunošana pa e-pastu vai tūlītēja datu sinhronizācija starp vairākiem atvērtiem pārlūkiem. Komandas dalībnieka pievienošana notiek pēc jau reģistrēta lietotāja e-pasta; uzaicinājuma vēstule netiek nosūtīta.

**Posma rezultāts:** problēmas sasaistītas ar konkrētām funkcijām un noteiktas projekta robežas.

## 4. Tirgus izpēte

Dokumentācijas sagatavošanas laikā tika veikts trīs līdzīgu risinājumu publisko aprakstu salīdzinājums: Trello, Notion un Asana. Izpētes mērķis bija izvērtēt uzdevumu attēlošanas un darba organizēšanas principus. Netika veikti šo produktu veiktspējas testi, lietotāju aptaujas vai maksas plānu salīdzinājums.

### 4.1. Trello

Trello organizē darbu ar dēļiem, sarakstiem un kartītēm. Šāda struktūra palīdz attēlot uzdevumu pāreju starp darba posmiem. TaskFlow prasībās izmantots līdzīgs Kanban princips: katrs uzdevums ir kartīte, bet kolonnas apzīmē izpildes statusu. TaskFlow sākotnējā versijā ir trīs fiksēti statusi, kas vienkāršo darba plūsmu. Avots: [Trello — Boards & Cards](https://trello.com/guide/trello-101).

### 4.2. Notion

Notion uzdevumu datubāzes un “My Tasks” skats ļauj vienuviet apkopot lietotājam piešķirtos darbus. Uzdevumiem tiek izmantots statuss, atbildīgais un termiņš; skats atbalsta arī filtrēšanu. Šis piemērs pamato personīgā uzdevumu saraksta lietderību arī TaskFlow, kur lietotājs var redzēt savus darbus no vairākiem projektiem. Avots: [Notion — Give your to-dos a home with Task databases](https://www.notion.com/help/guides/give-your-to-dos-a-home-with-task-databases).

### 4.3. Asana

Asana piedāvā vairākus darba attēlošanas veidus, tostarp sarakstu, kalendāru, laika skalu un Kanban dēli. TaskFlow mācību projekta apjomā izvēlēti divi skati: projekta Kanban dēlis un personīgo uzdevumu saraksts. Tas ļauj demonstrēt gan kopējā darba organizēšanu, gan individuālo pienākumu pārskatīšanu. Avots: [Asana — Features](https://asana.com/features).

### 4.4. Salīdzinājuma secinājumi

| Apskatītais risinājums | Šim projektam nozīmīgs princips | Atbilstošā TaskFlow funkcija |
|---|---|---|
| Trello | Uzdevumu vizuāla sadalīšana darba posmos | Kanban ar trim statusu kolonnām |
| Notion | Vienots lietotājam piešķirto darbu pārskats | “Mani uzdevumi” ar meklēšanu un filtriem |
| Asana | Dažādi uzdevumu pārskatīšanas veidi | Projekta dēlis un personīgais saraksts |

Salīdzinājums rāda, ka projektu pārvaldības pamatvajadzībām jau ir pieejami risinājumi. Tāpēc TaskFlow izstrādes pamatojums ir mācību mērķis, skaidri ierobežots funkciju apjoms, latviska saskarne un iespēja pašiem pārvaldīt lietotnes kodu un datubāzi.

Vērtējums, ka šāds ierobežots funkciju apjoms var būt piemērots nelielam mācību projektam, ir projekta ietvaros izdarīts secinājums. Tas nepierāda TaskFlow pārākumu pār salīdzinātajiem produktiem vai komerciālu pieprasījumu.

**Posma rezultāts:** salīdzināti līdzīgu rīku darbības principi un pamatota TaskFlow izvēlētā funkcionalitāte. Avoti pārbaudīti 2026. gada 21. oktobrī.

## 5. Implementēšana

Implementēšanas laikā tika izveidoti lietotnes faili, datubāzes skripti, servera API, saskarne un automatizētie testi. Darbs notika pakāpeniski, pievienojot funkcijas un novēršot pārbaudēs konstatētās problēmas.

### 5.1. Projekta struktūra un datubāze

Sākotnēji tukšajā darba mapē tika izveidota taskflow mape ar frontend, backend un docs apakšmapēm. Tika sagatavoti npm iestatījumi un vides konfigurācijas paraugi.

Datubāzei izveidots schema.sql ar lietotāju, projektu, dalības, uzdevumu un sesiju tabulām. Izmantotas primārās un ārējās atslēgas, indeksi un unikāli ierobežojumi. Demonstrācijai sagatavots seed.sql ar trim lietotājiem, četriem projektiem un trīspadsmit uzdevumiem.

Tā kā sākotnēji XAMPP datubāzes serveris nebija palaists, pārbaudei tika sagatavota atsevišķa MariaDB datu mape projekta ietvaros un izmantots ports 3307. Esošā XAMPP datu mape netika mainīta.

### 5.2. Servera daļa un drošība

Izveidots REST API reģistrācijai, pieteikšanās un izrakstīšanās darbībām, projektiem, dalībniekiem, uzdevumiem, statistikai un profilam. Kods sadalīts maršrutos, kontrolieros, servisos, repozitorija palīgfunkcijās un starpprogrammatūrā.

Paroles tiek apstrādātas ar bcrypt. Autentifikācijas sesijas glabājas MySQL, bet pārlūkā tiek izmantota HttpOnly sīkdatne. Datus mainošos pieprasījumus aizsargā CSRF marķieris. Ievade tiek validēta, bet kļūdas apstrādātas centralizēti.

Projektu piekļuves tiesības tiek pārbaudītas serverī. Projekta izveide un īpašnieka dalības pievienošana notiek vienā transakcijā. Dalībnieka noņemšana arī atceļ viņam piešķirtos uzdevumus konkrētajā projektā.

### 5.3. Lietotāja saskarne

Izveidotas reģistrācijas un pieteikšanās lapas, informācijas panelis, projektu saraksts, projekta darba telpa, personīgo uzdevumu sadaļa, komandas skats un iestatījumi.

Projekta darba telpā uzdevumi sadalīti kolonnās “Jāizdara”, “Procesā” un “Pabeigts”. Statusa maiņa tiek nosūtīta serverim un saglabāta datubāzē. Uzdevumu izveidei un rediģēšanai izmantots dialogs.

Informācijas panelī tiek attēlots projektu skaits, lietotājam piešķirtie uzdevumi, pabeigtie un procesā esošie darbi, termiņi un progresa statistika. Projekta progress tiek aprēķināts pēc formulas:

**Progress = pabeigto uzdevumu skaits / visu uzdevumu skaits × 100%.**

Ja projektam nav uzdevumu, progress ir 0%. Tika pievienota gaišā un tumšā tēma; izvēle saglabājas pārlūkā. Izkārtojums pielāgots dažādiem ekrānu platumiem.

### 5.4. Pārbaudes un kļūdu novēršana

Ar Vitest un Supertest tika izveidoti integrācijas testi pret atsevišķu reālu datubāzi. Tie pārbauda autentifikāciju, CSRF, projektu piekļuvi, dalībnieku tiesības, uzdevumu izveidi un maiņu, piešķiršanu, progresu, profilu un sesiju izbeigšanu.

Saskaņā ar 2026. gada 19. oktobra pārbaudes protokolu sekmīgi izpildīti 20 no 20 integrācijas testiem. Veiksmīgi izveidoti arī frontend un backend produkcijas būvējumi. Atkarību audits pēc testēšanas bibliotēkas atjaunināšanas tajā pārbaudē uzrādīja nulli ievainojamību.

Izstrādes laikā tika novērsta Windows UTF-8 kodējuma atzīmes radīta SQL un JSON failu nolasīšanas kļūda, pielāgots tests atjauninātajai Vitest versijai un samazināts frontend JavaScript apjoms, atlasot izmantotās Vuetify komponentes.

Caur Vite starpniekserveri tika pārbaudīta demonstrācijas lietotāja pieteikšanās, statistikas saņemšana un izrakstīšanās. Vizuālā pārbaude ar pieslēgtu pārlūku netika veikta, jo pieejamais pārlūka rīks nebija savienots. Tāpēc nav pamata apgalvot, ka kartīšu vilkšana un mobilais izkārtojums ir interaktīvi pārbaudīti visās ierīcēs. Detalizēts protokols: [VERIFICATION.md](VERIFICATION.md).

### 5.5. Papildinājumi pēc lietotāja atsauksmēm

Pēc sākotnējās izstrādes lietotājs izveidoja jaunu kontu un “Testa projektu”. Šim projektam tika pievienoti demonstrācijas dalībnieki Mārtiņš un Elīna. Ar API pieprasījumiem pārbaudīts, ka abi var piekļūt projektam ar dalībnieka lomu.

Pēc nākamās atsauksmes informācijas paneļa kartīte “Mani uzdevumi” tika padarīta klikšķināma. Tā atver jau izveidoto lietotājam piešķirto uzdevumu sarakstu ar meklēšanu, statusa un prioritātes filtriem. Pēc izmaiņas veiksmīgi izpildīts produkcijas būvējums.

Tika sagatavota arī palaišanas instrukcija, API apraksts, sešu SDLC posmu dokumentācija un komandas darba organizācijas apraksts. Šis piecu posmu dokuments apkopo paveikto vienotā projekta aprakstā.

**Posma rezultāts:** izveidota lokāli palaižama TaskFlow lietotne ar datubāzi, aizsargātu API, latvisku saskarni un automatizēti pārbaudītām pamatfunkcijām. Publiska produkcijas izvietošana un GitHub Actions izpilde attālinātā repozitorijā nav veikta.


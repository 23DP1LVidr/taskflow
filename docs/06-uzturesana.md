# 6. Uzturēšana
## Kļūdu apstrādes process
Kļūdu reģistrē GitHub issue ar soļiem, sagaidāmo un faktisko rezultātu, pārlūka/Node versiju un anonimizētu kļūdas informāciju. Neiekļauj paroles, sesiju sīkdatnes vai CSRF marķierus. Kritisku piekļuves kļūdu labo vispirms, pievienojot regresijas testu.

## Regulārie darbi
- Katru sprintu palaist npm audit, testus un būvējumu.
- Atkarības atjaunināt atsevišķā zarā, pārbaudot galveno plūsmu.
- Pārbaudīt datubāzes rezerves kopiju atjaunošanu.
- Pārskatīt servera kļūdas un SQL veiktspēju.
- Mainot shēmu, pievienot versētu migrāciju; db:init ir sākotnējās shēmas izveide, nevis automātiska esošu kolonnu migrācija.
- Pārbaudīt sesiju tīrīšanu un HTTPS/proxy konfigurāciju.
- No jauna palaist manuālos mobilā skata un tastatūras scenārijus pēc UI izmaiņām.

## Rezerves kopijas
XAMPP mysqldump ar --result-file saglabā SQL bez PowerShell izvades kodējuma problēmām:
```powershell
C:\xampp\mysql\bin\mysqldump.exe -u root -p --single-transaction --result-file=taskflow-backup.sql taskflow
```
Kopiju glabā drošā vietā ārpus publiskā repozitorija. Atjaunošanu vispirms izmēģina izolētā datubāzē.

## Nākamie uzlabojumi
E-pasta uzaicinājumu pieņemšana, paroles atjaunošana, auditēšanas žurnāls, lapošana lielām datu kopām, komentāri, failu pielikumi, WebSocket atjauninājumi, automatizēti pārlūka testi un vairāku API instanču kopīgs mēģinājumu ierobežotājs. Pašreizējā versijā atkārtotas pieteikšanās limits ir viena procesa atmiņā; autentifikācijas sesijas ir MySQL.


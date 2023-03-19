# subconverter

converter .ass to .srt for dubers

### Converting .ass to .srt

1. Put your .ass files in ass directory
2. Open convertToSrtOnly.bat file or run `node calculete/convertToSrtOnly.js` in terminal
3. Your files with [**[With Roles]**yor_file_name].srt extension will be in srt directory
4. Enjoy your srt files!

### Converting .ass to .srt and mark all roles in srt

1. Put your .ass files in ass directory
2. Open writeRoles.bat file or run `node calculete/writeRoles.js` in terminal
3. Your files with [**[Only Your Roles]**yor_file_name].srt extension will be in srt directory. Role will be indicated above each row.
4. Enjoy your srt files!

### Converting .ass to .srt leave only rows with your roles

1. Put your .ass files in ass directory
2. Write all roles, that you want to leave in roles.txt (make if there no such file) in root directory, separate it by rows.
3. Open writeRoles.bat file or run `node calculete/getRoles.js` in terminal
4. Your files with [**[With Roles]**yor_file_name].srt extension will be in srt directory. Role will be indicated above each row.
5. Enjoy your srt files!

# subconverter (па-беларуску):

Канвертар файлаў .ass у .srt для дабераў

### Сканвретаваць наўпрост .ass to .srt

1. Пакладзіце усе свае .ass файлы, якія хаціце сканвертаваць у папку **ass**
2. Адкрыйце файл convertToSrtOnly.bat файл або запусціце ў тэрмінале наступную каманду: `node calculete/convertToSrtOnly.js`
3. Вашыя файлы **назва файла сабаў**.srt будуць у папцы **srt**
4. Карыстайцеся сваімі srt сабамі!

### Сканвертаваць .ass to .srt і пазначыць ролі ў srt

1. Пакладзіце усе свае .ass файлы, якія хаціце сканвертаваць у папку **ass**
2. Адкрыйце файл writeRoles.bat або запусціце ў тэрмінале наступную каманду: `node calculete/writeRoles.js`
3. Вашыя файлы **[With Roles]\*\***назва файла сабаў**.srt будуць у папцы **srt\*\*. Ролі будуць зверху над кожным радком.
4. Карыстайцеся сваімі srt сабамі!

### Сканвертаваць .ass у .srt і пакінуць толькі патрэбныя ролі

1. Пакладзіце усе свае .ass файлы, якія хаціце сканвертаваць у папку **ass**
2. Напішыце ўсе ролі, якія хочаце пакінуць у файле roles.txt (стварыце, калі няма) у карневой папцы, кожная роля на новым радку.
3. Адкрыйце файл writeRoles.bat або запусціце ў тэрмінале наступную каманду: `node calculete/getRoles.js`
4. Вашыя файлы **[Only Your Roles]\*\***назва файла сабаў**.srt будуць у папцы **srt\*\*. Ролі будуць зверху над кожным радком.
5. Карыстайцеся сваімі srt сабамі!

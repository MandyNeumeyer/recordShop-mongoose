//----------------Start Setup für lowdb: npm i lowdb (eine kleine Datenbank)-------------
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('meineDatenBank.json');
const meineDatenBank = low(adapter)
//in der Datenbank ein Array speichern, unter der Eigenschaft 'recordShop':
meineDatenBank.defaults({ recordsShop: [] }).write();
///----------------Ende Setup für lowbd--------------------------------------------------
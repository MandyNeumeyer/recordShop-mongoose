const express = require('express');
const router = express.Router();
//Express Validator installieren, dieser ist auf Validator aufgebaut, welcher auch ohne Express verwendet werden kann
// npm install --save express-validator
//wir importieren die Check Funktion von Express Validator
const {check} = require('express-validator');

//wie sieht ein gültiger Datensatz für RecordItem aus?
//die Dokumentation erwartet ein Array, wo ich jedes Schema definiere
//Dokumentation: https://express-validator.github.io/docs/
//Übersicht der Methoden auf: https://npmjs.com/package/validator
//dieses Array übergebe ich als Variable an die Route wo ich es verwenden möchte als erstes Argument
let validDataRecord =[
  //interpret:darf nicht leer sein, message, wenn es fehlt, muss string sein
  check('interpret').not().isEmpty().withMessage('interpret needs to be entered'),
  //album: darf nicht leer sein, fehlermeldung kann auch gleich als zweiter Parameter eingegeben werden, ist kürzer
  check('album','album must be entered').not().isEmpty(),
  //year:soll Typ Number sein
  check('year', 'must be entered as Number').isNumeric(),
  //picture:
  check('picture', 'pls enter url for your pic').isURL()
]





//// BIG PROJECTS VARIANTE CONTROLLER AUSLAGERN ZUR BESSEREN ÜBERSICHT UND ZUR HILFE BEI DER FEHLERSUCHE-----------------

//importiere die Funktionen hier
const { recordsGetController, recordsPostController, recordsDeleteController, recordsPutController, recordsGetOneController } = require('../controller/records-controller');

//übersichtlichere Schreibweise - auf einen Blick, auf welcher Route, werden welche HTTP Methoden verarbeitet
router
  .route('/')
  .get(recordsGetController)
  .post(validDataRecord, recordsPostController)


//Bsp: dann mit Parameter usw..
router
  .route('/:id')
  .put(recordsPutController)
  .delete(recordsDeleteController)
  .get(recordsGetOneController)


module.exports=router



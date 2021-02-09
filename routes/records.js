const express = require('express');
const router = express.Router();



//// BIG PROJECTS VARIANTE CONTROLLER AUSLAGERN ZUR BESSEREN ÜBERSICHT UND ZUR HILFE BEI DER FEHLERSUCHE-----------------

//importiere die Funktionen hier
const { recordsGetController, recordsPostController, recordsDeleteController, recordsPutController, recordsGetOneController } = require('../controller/records-controller');

//übersichtlichere Schreibweise - auf einen Blick, auf welcher Route, werden welche HTTP Methoden verarbeitet
router
  .route('/')
  .get(recordsGetController)
  .post(recordsPostController)


//Bsp: dann mit Parameter usw..
router
  .route('/:id')
  .put(recordsPutController)
  .delete(recordsDeleteController)
  .get(recordsGetOneController)


module.exports=router



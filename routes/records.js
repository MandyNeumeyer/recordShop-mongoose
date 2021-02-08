const express = require('express');
const router = express.Router();


//----------------Start Setup für lowdb: npm i lowdb (eine kleine Datenbank)-------------
// const low = require('lowdb');
// const FileSync = require('lowdb/adapters/FileSync');
// const adapter = new FileSync('meineDatenBank.json');
// const meineDatenBank = low(adapter)
//in der Datenbank ein Array speichern, unter der Eigenschaft 'recordShop':
// meineDatenBank.defaults({recordsShop:[]}).write();
///----------------Ende Setup für lowbd--------------------------------------------------



/* GET records listing. */


// router.get('/', function(req, res, next) {
//   // res.send('respond with the records available in the shop');
//   let recordsShop= meineDatenBank.get('recordsShop').value();
//   res.send(recordsShop)
//   //schick das bitte im Body der Antwort als JSON zurück
//   // res.json(recordsShop)
// });

// module.exports = router;


// router.post('/:interpret/:album', function(req, res, next){
//   let newItem={
//     interpret:req.params.interpret,
//     album:req.params.album,
//   }
//   meineDatenBank.get('recordsShop').push(newItem).write()
//   res.status(201).send(`new records have been added:${newItem.interpret} with ${newItem.album}`)
// })




//Unterschied post im body und router.post????????????????????? url?


// Body Postman x-www.form-url-encoded (heißt wir werden JSON hin und her schicken) Interpreter und Album einsetzen auf Postman
//damit wir Post-requests mit body machen können - muss Middleware von der Express Bibliothek verwenden 
//app.use(express.urlencoded(extended:true))
//ist im Boilerplate von Express npx express-generator NAME --no-view --git

// router.post('/', function(req, res, next){
//   console.log(req.body) 
//   let newItem={
//     interpret:req.body.interpret,
//     album:req.body.album
//   }

//   meineDatenBank.get('recordsShop').push(newItem).write()
//   res.status(200).send(newItem)
// })

//// BIG PROJECTS VARIANTE CONTROLLER AUSLAGERN ZUR BESSEREN ÜBERSICHT UND ZUR HILFE BEI DER FEHLERSUCHE-----------------

//importiere die Funktionen hier
const { recordsGetController, recordsPostController, recordsDeleteController, recordsPutController, recordsGetOneController } = require('../controller/records-controller');

// router.get('/',recordsGetController)
// router.post('/',recordsPostController)

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



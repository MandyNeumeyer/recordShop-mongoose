const express = require('express');
const router = express.Router();

//----------------Start Setup für lowdb: npm i lowdb (eine kleine Datenbank)-------------
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('meineDatenBank.json');
const meineDatenBank = low(adapter)
//in der Datenbank ein Array speichern, unter der Eigenschaft 'users':
meineDatenBank.defaults({ users: [] }).write();
///----------------Ende Setup für lowbd--------------------------------------------------



/* GET users listing. */
// router.get('/', function(req, res, next) {
//   let users=meineDatenBank.get('users').value();
//   res.send(users)
// });

//Users get one by ID
// router.get('/:id',function(req, res, next){
//   const {id} = req.params;
//   const userRecordsShop = meineDatenBank.get('users')
//   .filter({id})
//   .value()
//   res.status(200).send(userRecordsShop)
// })


//create new user
// router.post('/', function(req, res, next){
//   console.log(req.body) 
//   let newUser={
//     vorname:req.body.vorname,
//     nachname:req.body.nachname,
//     eMail:req.body.eMail,
//     password:req.body.password,
//   }
//   meineDatenBank.get('users').push(newUser)
//   .last()
//   //aus dem aktuellen Datum wir eine eindeutige ID für den Eintrag
//   .assign({ id: Date.now().toString() })
//   .write()
//   res.status(200).send(newUser)
// })




//change some parts of existing user
// router.put('/:id', function(req, res, next){
//   const {id} =req.params;
//   const valuesToChange =req.body;
//   const usersAvailable=meineDatenBank
//   .get('users')
//   .find({id})
//   .assign(valuesToChange)
//   .write()
//   res.status(200).send(usersAvailable)
// })




//delete user by id
// router.delete('/:id', function(req, res, next){
//   const { id } = req.params;
//   const userToDelete = meineDatenBank
//   .get('users')
//   .remove({ id })
//   .write()
//   res.send('I have deleted the user with the ID'+id)
// })


///Funktionen in einem Ordner Controllers ausgelagert - kein muss, aber übersichtlicher bei großen Projekten und zur Fehlersuche

const { usersGetController, usersPostController, usersPutController, usersDeleteController,usersGetOneController } = require('../controller/users-controller');

router
  .route('/')
  .get(usersGetController)
  .post(usersPostController)

router
  .route('/:id')
  .put(usersPutController)
  .delete(usersDeleteController)
  .get(usersGetOneController)



module.exports = router
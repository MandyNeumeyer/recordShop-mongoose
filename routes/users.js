const express = require('express');
const router = express.Router();


///Funktionen in einem Ordner Controllers ausgelagert - kein muss, aber übersichtlicher bei großen Projekten und zur Fehlersuche

const { usersGetController, usersGetOneController, usersPostController, usersPutController, usersDeleteController } = require('../controller/users-controller');

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
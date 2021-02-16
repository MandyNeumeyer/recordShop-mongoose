const express = require('express');
const router = express.Router();
//Validation entweder in den Schemas selbst mit Mongoose oder mit z.b. einem Packet wie Express Validator
// npm install --save express-validator
//wir importieren die Check Funktion von Express Validator
const {check} = require('express-validator');

//Express Validator für Users auf POST
const validUser =[
  check('nachname')
  .not()
  .isEmpty()
  .withMessage('name must be entered')
  .trim(),
  check('eMail')
  .isEmail()
  .not()
  .isEmpty()
  .withMessage('pls enter a valid email')
  .trim()
  .normalizeEmail(),
  check('password')
  .not()
  .isEmpty()
  .isStrongPassword()
  .withMessage('pls enter your password')
  .trim()

]

//Express Validator für Users von PUT auf users/id mit der Methode optional

const validUserPut =[
  check('nachname')
  .not()
  .isEmpty()
  .optional()
  .withMessage('name must be entered')
  .trim(),
  check('eMail')
  .isEmail()
  .withMessage('pls enter a valid email')
  .trim()
  .normalizeEmail(),
  check('password')
  .not()
  .isEmpty()
  .optional()
  .isStrongPassword()
  .withMessage('pls enter your password')
  .trim()

]


///Funktionen in einem Ordner Controllers ausgelagert - kein muss, aber übersichtlicher bei großen Projekten und zur Fehlersuche

const { usersGetController, usersGetOneController, usersPostController, usersPutController, usersDeleteController, userLogin } = require('../controller/users-controller');

//die mit Express Validator festgelegte Validierung wird an die router => controller übergeben
router
  .route('/')
  .get(usersGetController)
  .post(validUser,usersPostController)

router
  .route('/:id')
  .put(validUserPut,usersPutController)
  .delete(usersDeleteController)
  .get(usersGetOneController)

//Route wenn der user einloggt
router
  .route('/login')
  .post(userLogin)


module.exports = router
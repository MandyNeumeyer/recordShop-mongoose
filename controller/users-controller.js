//npm packet um codesparender (1 Zeile) Fehler zu schreiben
const createError = require('http-errors')
//importiere das Model für Records (RecordItem)
const User = require('../models/user')


//Users noch schreiben mit Promises!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


const usersGetController = (req, res, next) => {

};


const usersGetOneController = ('/:id',function(req, res, next){

})





const usersPostController = (req, res, next) => {
    console.log(req.body)
   
    
}

const usersPutController = ('/:id', function(req, res, next){

})

const usersDeleteController = ('/:id', function(req, res, next){

})




module.exports = { usersGetController, usersPostController, usersPutController, usersDeleteController, usersGetOneController }
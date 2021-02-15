/** Externe Abhängigkeiten */
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
/**npm install mongoose und binde Mongoose aus den node modules ein */
const mongoose = require('mongoose');

/** Routen */
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const recordsRouter = require('./routes/records')
const ordersRouter = require('./routes/orders');



/** Initialisierung */
const app = express();
///////////////////////////SET UP DATENBANK///////////////////////////////////////////////////////////////////////////
/**Verbindung zu einer Datenbank aufbauen mit */
/**options sind Configurations for Mongoose Paket */
/**falls es die Datenbank noch nicht gibt, wird diese automatisch beim connecten erstellt */
mongoose.connect("mongodb://localhost:27017/myDatabase", {
    useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
})
//**die bestehende Verbindung in einer Variable speichern */
const db = mongoose.connection;
//**Erreignishändler für die db */
db.on('error', (fehler)=>console.error(fehler))
db.once('open', ()=>{
    //hier weiß ich, ich bin mit der Datenbank verbunden
    console.log('mit der Datenbank verbunden')
})
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/** Protokollierung */
app.use(logger('dev'));

/** Anfrage (Request) Parser */
//diese Middleware ist dazu da, damit POST im Body JSON Objekte vorhanden sein können////
//1. ist da damit es bei Postman funkt dort muss ich auch urlencoded im Body einstellen
//2. senden aus dem Browser
app.use(express.urlencoded({ extended: false }));
app.use(express.json())
///////////////////////////////////////////////////////////////////////////////////
app.use(cookieParser());
/** Statisch ausgelieferte Dateien */
app.use(express.static(path.join(__dirname, 'public')));
/* Middleware für CORS Cross origin Resources Sharing*/
//meta daten welche die Kommunikation zwischen Browser und Webserver regeln ('Headers')
//bei Middleware, die wir selbst hinzufügen, brauchen wir next, das heißt bin fertig, ruf die nächtse Funktion auf
// app.use((req, res, next)=>{
//     //hier werden Header gesetzt, von wo, können wir auf Anfragen antworten "*", das heißt in dem Fall Anfragen dürfen hier von überall
//     //her kommen (name:wert)// was darf gemacht werden HTTP Methoden
//     res.header("Access-Control-Allow-Origin", "*");
//     //welche header sind ok vom Browser? wir listen header auf, dieses hilft uns dann z.b. bei der Antwort, von weg kam die Frage, welchen Content type antworten wir
//     res.header("Access-Control-Allow-Headers", "Origin, x-Requested-With, Content-Type, Accept");
//     //welche Methoden sind ok:
//     res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT, OPTIONS");
//     next()
// })

//oder CORS Header auslagern
const corsHeader = require("./middleware/cors")
app.use(corsHeader)

/** Routen */
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/records', recordsRouter);
app.use('/users',usersRouter);
app.use('/orders',ordersRouter)



//Fehlerbehandlung muss als letztes stehen, nach den Pfaden
//einen Fehler werfen für alle von uns nicht definierten Pfade
app.get('*', (req, res, next) => {
    //Fehler werfen mit dem Fehlerobjekt welches einen Parameter nimmt
    let myError = new Error('This path does not exist');
    //auf diesem Fehlerobject gibt es die Eigenschaft statusCode, diesen setzen wir
    myError.statusCode = 404;
    //weitergeben an die nächste Middleware nimm den Fehler und der nächste Block Code soll sich darum kümmern
    next(myError)
})


//unsere Fehler middleware nimmt immer 4 Parameter
app.use((error,req,res,next)=>{
    //fehlermeldung auf der Console ausgeben:
    console.log('Unsere FehlerMiddleware', error);
    //fehlermeldung senden:
    //status im Header setzen als Antwort vom Server:
    res.status(error.statusCode)
    //wir senden ein Error objekt zurück zum Frontend, welches noch gestylt werden kann, wenn nicht, dann gibts Fallback Fehlerseite vom Browser

    res.send({
        error:{
            status:error.statusCode,
            message:error.message
        }
    })
    //oder nur Fehler Code schicken, als Alternative - aber besser das Objekt für mehr Info 
    //res.sendStatus(404)
})


/** Export */
module.exports = app;


// git remote add origin https://github.com/MandyNeumeyer/recordShop-mongoose.git
// git branch -M main
// git push -u origin main


//----------------Start Setup für lowdb: npm i lowdb (eine kleine Datenbank)-------------
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('meineDatenBank.json');
const meineDatenBank = low(adapter)
//in der Datenbank ein Array speichern, unter der Eigenschaft 'recordShop':
meineDatenBank.defaults({ recordsShop: [] }).write();
///----------------Ende Setup für lowbd--------------------------------------------------



const recordsPostController = (req, res, next) => {
    let newItem = {
        interpret: req.body.interpret,
        album: req.body.album
    }
    //prüfen ob Eingaben vollständig sind, sonst Fehler werfen
    if (newItem.interpret && newItem.album) {
        meineDatenBank.get('recordsShop').push(newItem)
            //als letzten Eintrag hinzufügen
            .last()
            //aus dem aktuellen Datum wir eine eindeutige ID für den Eintrag
            .assign({ id: Date.now().toString() })
            .write()
        res.status(200).send(newItem)
    } else {
        //wenn die Daten fehlen, wirf einen Fehler
        let error = new Error('Interpret und Album müssen definiert sein')
        //Status code heißt Server understands request, but incomplete Info send
        error.statusCode = 422;
        //wir schmeißen den Fehler, welcher von der Middleware in app.js gefangen wird
        throw error

    }
}

const recordsGetController = (req, res, next) => {
    const recordsShop = meineDatenBank.get('recordsShop').value();
    res.status(200).send(recordsShop)
}


const recordsGetOneController = (req, res, next) => {
    const {id} = req.params;
    const recordsShop = meineDatenBank.get('recordsShop')
    .filter({id})
    .value()
    res.status(200).send(recordsShop)
}



const recordsDeleteController = (req, res, next) => {
    const { id } = req.params;
    const recordToDelete = meineDatenBank
    .get('recordsShop')
    .remove({ id })
    .write()
    res.send('I have deleted the album with the ID'+id)
}

const recordsPutController = (req, res, next) =>{
    const {id} =req.params;
    const valuesToChange =req.body;
    const recordsAvailable=meineDatenBank
    .get('recordsShop')
    .find({id})
    .assign(valuesToChange)
    .write()
    res.status(200).send(recordsAvailable)
}



module.exports = { recordsPostController, recordsGetController, recordsDeleteController, recordsPutController, recordsGetOneController }




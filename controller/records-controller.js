//npm packet um codesparender (1 Zeile) Fehler zu schreiben
const createError = require('http-errors')
//importiere das Model für Records (RecordItem)
const RecordItem = require('../models/recordItem')


//RecordsPostController mit MongoDB/ Mongoose and async await and save
// const recordsPostController = async(req, res, next)=>{
//     try{ 
//         const neueDaten = new RecordItem(req.body) ;
//         await neueDaten.save()
//         res.status(201).send(neueDaten)
//     }catch(error){ 
//         //dieser Fehler wird mit next an die Fehlerbehandlungsfunktion weitergegen
//         next(error)
//     }
// }   

//Post Controller mit MongoDB und create()
const recordsPostController = async(req, res, next)=>{
    try{
        const myNewRecord = await RecordItem.create(req.body)
        res.status(201).send(myNewRecord)
    }catch(error){
        next(error)
    }
}

//RecordsPostController mit MongoDB/ Mongoose and call back and create

// const recordsPostController =(req, res, next)=>{
//     const neueDaten = req.body;
//     RecordItem.create(neueDaten, (err, ergebnis)=>{
//         if(err){
//             res.status(500).send('Error by creating the new entry'+err)
//         }else{
//             //http status code für erfolgreiches anlegen einer resource 201
//             res.status(201).send(ergebnis)
//         }
//     })
// }


//RecordsGetController mit MongoDB/ Mongoose
const recordsGetController = async(req, res, next)=>{
    try{
        const myRecordlist = await RecordItem.find({})
        res.status(200).send(myRecordlist)
    }catch(error){
        next(error)
    }
}



//RecordsGetOneController mit MongoDB/ Mongoose
const recordsGetOneController = async(req, res, next) => {
    try{ 
        const {id} = req.params;
        const recordWithId = await RecordItem.find({_id:id});
        //hier können wir auch unsere eigenen Fehler einbauen, da wenn es eine gültige ID ist, wir
        //von der Datenbank keinen Fehler zurück bekommen, sondern ein leeres Array - das wollen wir nicht unbedingt
        //wir bekommen den selben Fehler nun auch, wenn die ID falsch ist
        if(recordWithId.length<1) throw new Error
        res.status(200).send(recordWithId)

    }catch(error){
        let myError = createError(404, `die CD mit der ${req.params.id} gibt es nicht.`)
        next(myError)
    }
}

//RecordsDeleteController mit MongoDB/ Mongoose
const recordsDeleteController = async (req, res, next) => {
    try{ 
    const {id} =req.params
    const recordToDelete = await RecordItem.deleteOne({_id:id})
    res.status(200).send(recordToDelete)
    }catch(error){ 
        next(error)
    }
}

//RecordsPutController mit MongoDB/ Mongoose
const recordsPutController = async (req, res, next) =>{
    try {
    const {id} =req.params;
    const valuesToChange =req.body;
    const updatedRecordEntry = await RecordItem.findOneAndUpdate({_id:id}, valuesToChange)
    res.status(200).send(updatedRecordEntry)
    }catch(error){
        next(error)
    }
}



module.exports = { recordsPostController, recordsGetController, recordsDeleteController, recordsPutController, recordsGetOneController }




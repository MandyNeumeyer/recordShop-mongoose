const express = require('express');
const router = express.Router();

//importiere mir das RecordItem Modell aus models
const RecordItem = require("../models/recordItem")

//Datenmodell von Mongoose nehmen und Daten ausgeben lassen find hat Parameter error und docs (Datendokumente)
//als Callback Funktion um andere Sachen nicht zu blockieren
//Datenbank ist asyncroner code entweder mit Callback (mit err und ergebnis), Promise (mit .then und catch ) oder async/ await (mit try & catch)
//Merhoden auf dem Modell sind z.b. save, find, updateOne, deleteOne

router.get('/', function(req, res, next){
    RecordItem.find((err, docs)=>{
        if(err){
            res.status(500).send('error bei GET auf /recordItem/:'+err);
        }else{
            res.status(200).send(docs)
        }
    })
  
})




router.post('/', function(req, res, next){
    const neueDaten = req.body;
    RecordItem.create(neueDaten, (err, ergebnis)=>{
        if(err){
            res.status(500).send('Error by creating the new entry'+err)
        }else{
            //http status code für erfolgreiches anlegen einer resource 201
            res.status(201).send(ergebnis)
        }
    })
})



router.put('/:_id', function(req, res, next){ 
    const aenderung = req.body;
    const {_id} = req.params.id
    if(!_id){
        res.status(402).send('ID fehlt')
    }else{ 
        RecordItem.updateOne(aenderung, (err, ergebnis)=>{
            res.status(200).send(ergebnis)
        })
   
    }
})

router.delete('./:_id', function(req, res, next){
    const {_id} =req.params.id
    if(!_id){
        res.status(402).send('ID missing')
    }else{
        RecordItem.deleteOne((err, result)=>{
            res.status(200).send('following record was deleted', result)
        })
    }
})


module.exports = router

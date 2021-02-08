const express = require('express');
const router = express.Router();

//----------------Start Setup für lowdb: npm i lowdb (eine kleine Datenbank)-------------
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('meineDatenBank.json');
const meineDatenBank = low(adapter)
//in der Datenbank ein Array speichern, unter der Eigenschaft 'users':
meineDatenBank.defaults({ orders: [] }).write();
///----------------Ende Setup für lowbd--------------------------------------------------




router.get('/', function (req, res, next) {
    let orders = meineDatenBank.get('orders').value();
    res.send(orders)
});

router.get('/:id',function(req, res, next){
    const {id} = req.params;
    const orderRecordsShop = meineDatenBank.get('orders')
    .filter({id})
    .value()
    res.status(200).send(orderRecordsShop)
})




router.post('/', function (req, res, next) {
    console.log(req.body)
    let newOrder = {
        productID: req.body.productID,
        amount: req.body.amount,
    }
    meineDatenBank.get('orders').push(newOrder)
        .last()
        //aus dem aktuellen Datum wir eine eindeutige ID für den Eintrag
        .assign({ id: Date.now().toString()})
        .write()
    res.status(200).send(newOrder)
})




router.put('/:id', function (req, res, next) {
    const { id } = req.params;
    const valuesToChange = req.body;
    const orderAvailable = meineDatenBank
        .get('orders')
        .find({ id })
        .assign(valuesToChange)
        .write()
    res.status(200).send(orderAvailable)
})


router.delete('/:id', function (req, res, next) {
    const { id } = req.params;
    const orderToDelete = meineDatenBank
        .get('orders')
        .remove({ id })
        .write()
    res.send('I have deleted the order with the ID' + id)
})









module.exports = router
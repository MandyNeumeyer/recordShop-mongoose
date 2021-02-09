//importiere das Model für Records (RecordItem)
const Order = require('../models/order')
//npm packet um codesparender (1 Zeile) Fehler zu schreiben
const createError = require('http-errors')

//Anfragen mit Callback///////////////////////////////////////////////////////////////////////////////////////

// const ordersGetController = (req, res, next) => {
//     Order.find((err, ergebnis)=> {
//     if (err){
//         res.status(500).send('Fehler bei GET auf /orders/:'+err)
//     }else{
//         res.status(200).send(ergebnis)
//     }
// })
// }

// const ordersPostController = (req, res, next)=>{
//    const newOrder = req.body
// //    console.log(newOrder)
// //    //1. Parameter ein Object - 2 Paramenter callback Funktion, die ausgeführt wird, wenn er fertig ist
//    Order.create(newOrder, (err, ergebnis)=>{
//        if(err){
//            res.status(500).send('Fehler bei POST auf /orders/:'+err)
//        }else{
//            res.status(201).send(ergebnis)
//        }
//    }) 

// }
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//eleganter mit Async / Await

const ordersPostController = async (req, res, next) => {
    try {
        const neueDaten = new Order(req.body);
        await neueDaten.save()
        res.status(201).send(neueDaten)
    } catch (error) {
        //dieser Fehler wird mit next an die Fehlerbehandlungsfunktion weitergegen
        next(error)
    }
}


const ordersGetController = async (req, res, next) => {
    try {
        const myOrderlist = await Order.find({})
        res.status(200).send(myOrderlist)
    } catch (error) {
        next(error)
    }
}


const ordersGetOneController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const myOneOrder = await Order.find({ _id: id })
        if(!id || myOneOrder.length<1) throw new Error
       
    
        res.status(200).send(myOneOrder)
    } catch (error) {
        //wenn wir keinen eigenen error spezifizieren und mit next(myError weitergeben) übernimmt unsere Error Middleware 
        //die Fehlermeldung mit Standards
        let myError=createError(404, 'bitte gebe eine gültige ID an')
        next(myError)
        // next(error)

    }
}

////////// Why is PUT not working???????????????????????????????????????????????????????????????????????????????????????



const ordersPutController = async (req, res, next) =>{
    try {
    const {id} =req.params;
    const valuesToChange =req.body;
    const updatedOrderEntry = await RecordItem.updateOne({_id:id}, {valuesToChange})
    res.status(200).send(updatedOrderEntry)
    }catch(error){
        next(error)
    }
}









module.exports = { ordersPostController, ordersGetController, ordersGetOneController, ordersPutController }
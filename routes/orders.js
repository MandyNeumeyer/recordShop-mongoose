const express = require('express');
const router = express.Router();




// //// BIG PROJECTS VARIANTE CONTROLLER AUSLAGERN ZUR BESSEREN ÜBERSICHT UND ZUR HILFE BEI DER FEHLERSUCHE-----------------

// //importiere die Funktionen hier
const { ordersPostController, ordersGetController, ordersGetOneController, ordersPutController } = require('../controller/orders-controller');

// //übersichtlichere Schreibweise - auf einen Blick, auf welcher Route, werden welche HTTP Methoden verarbeitet
router
    .route('/')
    .get(ordersGetController)
    .post(ordersPostController)


// //Bsp: dann mit Parameter usw..
router
    .route('/:id')
    .put(ordersPutController)
    // //   .delete(ordersDeleteController)
    .get(ordersGetOneController)


module.exports = router









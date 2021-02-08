const mongoose = require('mongoose');
//hole mir die Eigenschaft Schema mit Destructuring aus dem Mongoose Object const Schema = moongose.Schema
const {Schema} = mongoose;

//wir bauen ein Datenschema auf aus der Klasse Schema
const RecordItem = new Schema({
        interpret:String,
        album:String,

});



//wir geben das Schema in eine Mongoose Funktion rein, die uns ein verbundenes Object macht, das mit der Datenbankkomponente 
//zusammenarbeitet 
//2 Parameter, das erste ist die Mongodatenbank (Collection), zweite ist das Schema, wenn man als drittes Argument nochmal die 
//Collection mit rein gibt, verhindert man ein automatisch kreiertes "Mehrzahl s" beim erstellen der Collection
module.exports = mongoose.model('records', RecordItem, 'records')

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//weitere Options zum Datenschema anlegen bspw.
// nachname:{
//     type:String,
//     required:true,
//     trim:true,
// }
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
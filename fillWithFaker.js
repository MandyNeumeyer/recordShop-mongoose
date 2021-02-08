//Zufallsgenerator für Namen, Passwörter, E-Mails etc.
const faker = require('faker');
//das ist das Paket für die Verbindung mit MongoDB
const mongoose = require('mongoose');
//hier holen wir das vorbereitete Modell für User
const User = require('./models/user.js')

mongoose.connect("mongodb://localhost:27017/myDatabase", {
    useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
})

const db = mongoose.connection;
db.on('error', (fehler)=>console.error(fehler))
db.once('open', ()=>{
    console.log('mit der MongoDB verbunden')
    User.deleteMany({})
    .then(()=>{console.log('Nutzer sind gelöscht')})
    .catch((error)=>{console.log('etwas ging schief', error)});

    const zufallsNutzer = [];

    for(index=0; index<10; index++){
        const newUser={
            vorname:faker.name.firstName(),
            nachname:faker.name.lastName(),
            eMail:faker.internet.email(),
            password:faker.internet.password(),
        }
        zufallsNutzer.push(newUser);
    }
    User.insertMany(zufallsNutzer, (error, ergebnis)=>{
        if(error){
            console.log(error);
        }else{(ergebnis)
            console.log('erfolgreich, random useres were added to database',ergebnis );
            //die Datenbank muss manuell geschlossen werden, damit Event-Loop für Mongoose endet
            db.close()
        }
    })
})
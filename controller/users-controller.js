//npm packet um codesparender (1 Zeile) Fehler zu schreiben
const createError = require('http-errors')
//importiere das Model für User (User)
const User = require('../models/user')
//npm paket für validation als Alternative zu Mongoose Schemas
const { validationResult } = require('express-validator')
//npm install bcrypt
const bcrypt = require('bcrypt')




/////Beispiel mit Promises///////////////////////////////////////////////////////////////////////////////////////////
// const usersGetController = (req, res, next) => {
//     User.find().then((ergebnis)=>{
//         res.status(200).send(ergebnis)
//     }).catch((error)=>{
//         res.status(500).send(error)
//     });

// };

const usersGetController = async (req, res, next) => {
    try {
        let myUsers = await User.find();
        res.status(200).send(myUsers)
    } catch (error) {
        next(error)
    }
}


const usersGetOneController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userWithId = await User.find({ _id: id });
        //hier können wir auch unsere eigenen Fehler einbauen, da wenn es eine gültige ID ist, wir
        //von der Datenbank keinen Fehler zurück bekommen, sondern ein leeres Array - das wollen wir nicht unbedingt
        //wir bekommen den selben Fehler nun auch, wenn die ID falsch ist
        if (userWithId.length < 1) throw new Error
        res.status(200).send(userWithId)

    } catch (error) {
        let myError = createError(404, `den User mit der ${req.params.id} gibt es nicht.`)
        next(myError)
    }
}



const usersPostController = async (req, res, next) => {
    try {
        let newUser = req.body
        const errors = validationResult(req)
        console.log(errors);
        if (!errors.isEmpty()) {
            return res.status(422).json({
                validUser: errors.array(),
            })
        }
        //optionaler check - gibt es schon einen Nutzer mit dieser E-Mail Adresse?
        let alreadyExists = await User.find({ eMail: newUser.eMail });
        if (alreadyExists.length >= 1) {
            return res.status(409).send('A user already exists with this email-adress')
        }

        //bevor wir speichern muss das Passwort verschlüsselt werden!!!
        let passwordGehashed = await bcrypt.hash(newUser.password, 10)
        let createUser = await User.create({ ...newUser, password: passwordGehashed })
        res.status(201).send(createUser)
    } catch (error) {

        //dieser Fehler wird mit next an die Fehlerbehandlungsfunktion weitergegeben
        next(error)
    }


}

const usersDeleteController = async (req, res, next) => {
    try {
        const { id } = req.params
        const userToDelete = await User.deleteOne({ _id: id })
        res.status(200).send(userToDelete)
    } catch (error) {
        next(error)
    }
}

//RecordsPutController mit MongoDB/ Mongoose
// {new:true} zeigt bei Postman den upgedateten Eintrag, ohne zeigt es den alten als Fallback, muss erst wieder aufrufen, um Update zu sehen
const usersPutController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const valuesToChange = req.body;
        //validate input with Express validator rules defined in users.js
        const errors = validationResult(req)
        console.log(errors);
        if (!errors.isEmpty()) {
            return res.status(422).json({
                validUser: errors.array(),
            })
        }

        let passwordGehashed = await bcrypt.hash(valuesToChange.password, 10)
        const updatedUserEntry = await User.findOneAndUpdate({ _id: id }, { ...valuesToChange, password: passwordGehashed }, { new: true })
        res.status(200).send(updatedUserEntry)
    } catch (error) {
        next(error)
    }
}

const userLogin = async (req, res, next) => {
    //dort sind dann alle Nutzerangaben enthalten - diese Angabe kommt vom Frontend
    let userLoggingIn = req.body
    console.log('User send from frontend',userLoggingIn)
    //gibt es diesen Nutzer überhaupt? wir suchen nach der E-mail in der Datenbank
    try {
        //Angaben in der Datenbank
        let userAlready = await User.findOne({eMail: userLoggingIn.eMail})
        console.log(userAlready)
        if (userAlready===null) {
            console.log(userAlready)
            //bei der Fehlermeldung nicht so spezifisch sein, was nicht stimmt, um den Hackern das Leben nicht zu einfach zu machen
            //nur return braucht kein else!!!!!!!!
            return res.status(401).send('You could not be logged in here.')
        }
        //das angegebene Passwort des users mit dem hinterlegten in der Datenbank vergleichen
        //die Methode compare kommt aus der bcrypt Bibliothek (welche Möglichkeietn hat hashed and salted passwords wieder miteinander zu vergleichen)
        let passwordCompared = await bcrypt.compare(userLoggingIn.password, userAlready.password)
        console.log(passwordCompared)
        //wenn Vergleich des Passwords erfolgreich ist
        if (passwordCompared) {
            res.status(200).json({
                message: 'You are logged in'
            })
        }
     } 
     catch (error) {
        res.status(401).send('You could not be logged in.')
        console.log(error)
    }
}






module.exports = { usersGetController, usersGetOneController, usersPostController, usersDeleteController, usersPutController, userLogin}


//npm packet um codesparender (1 Zeile) Fehler zu schreiben
const createError = require('http-errors')
//importiere das Model für User (User)
const User = require('../models/user')


//???????????????????????????????????????????????????????????????????????????????????????????????????????????????
//why do I dont get fake users???????????????????????????????????????????????????????????????????????????????????


/////Beispiel mit Promises///////////////////////////////////////////////////////////////////////////////////////////
// const usersGetController = (req, res, next) => {
//     User.find().then((ergebnis)=>{
//         res.status(200).send(ergebnis)
//     }).catch((error)=>{
//         res.status(500).send(error)
//     });

// };

const usersGetController = async (req, res, next)=>{
    try{
        let myUsers = await User.find();
        res.status(200).send(myUsers)
    }catch(error){
        next(error)
    }
}


const usersGetOneController = async (req, res, next)=> {
    try{ 
        const {id} = req.params;
        const userWithId = await User.find({_id:id});
        //hier können wir auch unsere eigenen Fehler einbauen, da wenn es eine gültige ID ist, wir
        //von der Datenbank keinen Fehler zurück bekommen, sondern ein leeres Array - das wollen wir nicht unbedingt
        //wir bekommen den selben Fehler nun auch, wenn die ID falsch ist
        if(userWithId.length<1) throw new Error
        res.status(200).send(userWithId)

    }catch(error){
        let myError = createError(404, `den User mit der ${req.params.id} gibt es nicht.`)
        next(myError)
    }
}



const usersPostController = async(req, res, next) => {
    try {
        const neueDaten = new User(req.body);
        await neueDaten.save()
        res.status(201).send(neueDaten)
    } catch (error) {
        //dieser Fehler wird mit next an die Fehlerbehandlungsfunktion weitergegen
        next(error)
    }


}

const usersDeleteController = async (req, res, next) => {
    try{ 
    const {id} =req.params
    const userToDelete = await User.deleteOne({_id:id})
    res.status(200).send(userToDelete)
    }catch(error){ 
        next(error)
    }
}

//RecordsPutController mit MongoDB/ Mongoose
// {new:true} zeigt bei Postman den upgedateten Eintrag, ohne zeigt es den alten als Fallback, muss erst wieder aufrufen, um Update zu sehen
const usersPutController = async (req, res, next) =>{
    try {
    const {id} =req.params;
    const valuesToChange =req.body;
    const updatedUserEntry = await User.findOneAndUpdate({_id:id}, valuesToChange, {new:true})
    res.status(200).send(updatedUserEntry)
    }catch(error){
        next(error)
    }
}






module.exports = { usersGetController, usersGetOneController, usersPostController, usersDeleteController, usersPutController }


//----------------Start Setup für lowdb: npm i lowdb (eine kleine Datenbank)-------------
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('meineDatenBank.json');
const meineDatenBank = low(adapter)
//in der Datenbank ein Array speichern, unter der Eigenschaft 'users':
meineDatenBank.defaults({ users: [] }).write();
///----------------Ende Setup für lowbd--------------------------------------------------





const usersGetController = (req, res, next) => {
    const users = meineDatenBank.get('users').value();
    res.send(users)
};


const usersGetOneController = ('/:id',function(req, res, next){
  const {id} = req.params;
  const user = meineDatenBank.get('users')
  .filter({id})
  .value()
  res.status(200).send(user)
})





const usersPostController = (req, res, next) => {
    console.log(req.body)
    let newUser = {
        vorname: req.body.vorname,
        nachname: req.body.nachname,
        eMail: req.body.eMail,
        password: req.body.password,
    }
    if (newUser.vorname && newUser.nachname && newUser.eMail && newUser.password) {
        meineDatenBank.get('users').push(newUser)
            .last()
            //aus dem aktuellen Datum wir eine eindeutige ID für den Eintrag
            .assign({ id: Date.now().toString() })
            .write()
        res.status(200).send(newUser)
    }else{
        let error = new Error('Pls enter all data.')
        error.statusCode = 422;
        throw error
    }
}

const usersPutController = ('/:id', function(req, res, next){
  const {id} =req.params;
  const valuesToChange =req.body;
  const usersAvailable=meineDatenBank
  .get('users')
  .find({id})
  .assign(valuesToChange)
  .write()
  res.status(200).send(usersAvailable)
})

const usersDeleteController = ('/:id', function(req, res, next){
  const { id } = req.params;
  const userToDelete = meineDatenBank
  .get('users')
  .remove({ id })
  .write()
  res.send('I have deleted the user with the ID'+id)
})




module.exports = { usersGetController, usersPostController, usersPutController, usersDeleteController, usersGetOneController }
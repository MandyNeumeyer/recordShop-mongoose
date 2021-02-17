//middleware Funktion für authorisation ausgelagert, um sie auf mehreren Pfaden wiederzuverwenden (PUT / DELETE/ POST etc.)
//das Token soll im Header der Anfrage mitgeschickt werden
//wir wollen Zugriff auf das Token in den Funktionen haben im req 
const jwt = require('jsonwebtoken')

const auth =(req, res, next)=>{
    try{
        //token aus dem Header holen
        //im header authorization: Bearer unserToken
        let token = req.headers.authorization.split(' ')[1];
        //token dekodieren und verifizieren
        let tokenReadable = jwt.verify(token, process.env.JWT || 'ein Geheimniss')
        console.log(tokenReadable)
        //fügen dem Req Object noch eine Eigenschaft hinzu
        req.tokenUser = tokenReadable
        //nächste Funktion aufrufen (in diesem Fall den Controller)
        //wo wir unter req.tokenUser Zugriff auf den Token haben
        next()
    }catch(error){
        return res.status(401).send('You could not be logged in, pls try again')
    }
}

module.exports=auth

// den Token den ich bekomme bei Postman im Header mitschicken
//Key ist authorization (req.headers.authorization) value: Bearer copy/paste token
//    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlTWFpbCI6Im1ydGVzdDNAZ214LmNvbSIsInVzZXJJZCI6IjYwMmQxMmY2OWFlYTZiMThhYTY1ZmM0NyIsImlhdCI6MTYxMzU2NjcyNCwiZXhwIjoxNjEzNTc3NTI0fQ.rhklZAHZ2iXVWomemoGi_nH8DRJi_Qj4dsUkbzgBo6M"

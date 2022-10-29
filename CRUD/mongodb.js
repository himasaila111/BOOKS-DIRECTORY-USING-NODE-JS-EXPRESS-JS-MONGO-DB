const { MongoClient } = require('mongodb');
let dbconnection;
let uri = 'mongodb+srv://hima:MongoDb123@cluster0.97rnt.mongodb.net/?retryWrites=true&w=majority';

module.exports = {
    createdb :(cb)=>{
        MongoClient.connect(uri).then((client)=>{
            dbconnection = client.db();
            return cb();
        }).catch((err)=>{
            console.log(err);
            return cb(err);
            
        })
    },

    getdb : ()=> dbconnection
}

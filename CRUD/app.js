const express = require('express');
const {ObjectId} = require('mongodb');
const {createdb, getdb} = require('./mongodb');

const app = express();
app.use(express.json())

let db;
createdb ((err) => {
    if(!err){
    app.listen(3000, ()=>{
        console.log("listening on 3000");
    })
    db = getdb()
}
})
app.get('/books', (req,res)=>{
    let books = [];

    db.collection('books').find() // practically that find method doesnot return all the documents which we ususally see in mongoshell it will returns a cursor method where that cursor method has 2 other mthods one is toArray and forEach pratically mongodb divides all the documents into diff sections to avoid the memory consumption if we call foreach method by cursor method then first we can get a section of documents and when they gonna reach to the end then it will call next section 
    .forEach((book)=> books.push(book))
    .then(()=>{res.status(200).json(books)})
    .catch(()=>{res.status(500).json({err: "could not fetch docs"})})
})

app.get('/books/:id', (req,res)=>{
    const parm = req.params.id;

    db.collection('books')
    .findOne({_id: ObjectId(parm)})
    .then(doc => {
        res.status(200).json(doc)
    })
    .catch((err)=> {
        console.log(err)
        res.status(500).json(err)
    })
})

app.post('/books', (req,res)=>{
    const book = req.body;
    db.collection('books')
    .insertOne(book)
    .then( (resp) => {
        res.status(200).json(resp)
    })
    .catch(()=>{
        res.status(500).json({err: "can't insert this document"})
    })
})

app.post('/multiplebooks', (req,res)=>{
    const book = req.body;
    db.collection('books')
    .insertMany(book)
    .then( (resp) => {
        res.status(200).json(resp)
    })
    .catch(()=>{
        res.status(500).json({err: "can't insert this document"})
    })
})
app.delete('/books/:id', (req,res)=>{
    const parm = req.params.id;
    db.collection('books')
    .deleteOne({_id: ObjectId(parm)})
    .then( (resp) => {
        res.status(200).json(resp)
    })
    .catch(()=>{
        res.status(500).json({err: "can't delete this document"})
    })
})
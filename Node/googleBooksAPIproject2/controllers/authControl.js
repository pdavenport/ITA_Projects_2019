const axios = require('axios')
const sAuthor = require('../models/authors')
const sBook = require('../model/books')

//possible data structure for JSON

//first db request
async function addToDB(req, res, next){
    const books = await getBooks(req.query.author);
    addBooks(books);
};

async function getBooks(author){
    const dcall = `https://www.googleapis.com/books/v1/volumes?q=author:"${author}"&fields=items(volumeInfo(title,authors,subtitle,description,publisher),id)`//googleuri here
    try {
        return await axios.get(dcall);
    } catch(error) {
        return error;
    }
}

async function addBooks(books) {
    const Books = [];
    /// for adding things to book struct
    for(b = 0; c < books.data.items[b].length; b++) {
        for(a = 0; books.data.items...) // for loop to pop authors
            for(p = 0) // for loop
    }
}
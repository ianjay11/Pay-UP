const express = require('express') 
const bodyParser = require('body-parser'); 

const app = express(); 
const port = 3000; 

// Where we will keep books  
let books = []; 

// Configuring body parser middleware 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); 

app.get('/', (req, res) => {
	res.send('Hello World!')
  })

app.post('/', (req, res) => {
	res.send('Got a POST request')
  })

app.post('/book', (req, res) => { 
	const book = req.body; 
		// Output the book to the console for debugging  
		console.log(book); 
		books.push(book); 
		res.send('Book is added to the database'); 
	});

app.get('/books', (req, res) => { res.json(books); });

app.get('/book/:id', (req, res) => { 

    // Reading idfrom the URL  
    const id = req.params.id;
    
    res.json(books[id]) 
});

app.delete('/book/:id', (req, res) => { 
    // Reading id from the URL  
    const id = req.params.id; 
    // Remove item from the books array 
    books = books.filter(i => { 
    if (i.id !== id) { 
	    return  true; 
    } 
	    return  false; 
    }); 
    res.send('Book is deleted'); 
});



 app.listen(port, () =>  
     console.log(`Hello world app listening on port ${port}!`)
 );
 
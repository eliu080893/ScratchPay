const express = require('express');
const app = express();
const path = require('path');
const { filter } = require('rxjs');
const filterController = require('./filterController');
const PORT = 3000;

// Allows for proper parsing of incoming JSON objects
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../dist/')));

// While in development, this should just serve the index.html entry point file
// app.get('/', (req,res) => {
//     return res.status(200).sendFile(path.join(__dirname,'../src/index.html'))
// });

app.post('/',
    filterController.fetchResults,
    filterController.convertResults,
    filterController.filterResults,
    (req, res) => {
        return res.status(200).json(res.locals.searchResults)
    }
);

// Global error handler
app.use((err, req, res, next) => {
    const defaultErr = {
      log: 'Express error handler caught unknown middleware error',
      status: 500,
      message: { err: 'An error occurred' },
    };
    const errorObj = Object.assign({}, defaultErr, err);
    console.log(errorObj.log);
    return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
    console.log('Server listening on Port 3000')
});
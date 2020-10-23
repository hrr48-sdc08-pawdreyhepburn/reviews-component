const express = require('express');
const bodyParser = require('body-parser');
const reviews = require('../database/controllers/reviews.js');
const path = require('path');
const app = express();
const port = 3004;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, '../Public')));

app.get('/:productid', (req, res) => {
  const fileName = 'index.html';
  const options = {
    root: path.join(__dirname, '../Public')
  };
  res.sendFile(fileName, options, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log('success');
    }
  })
});


//rename properties createdAt and author to match front end properties
app.get('/api/reviews/:productid', (req, res) => {
  reviews.getAll(req.params.productid, (results) => {
    results.rows.forEach((result) => {
      result.createdAt = result.createdat.toISOString().substring(0, 10);
      result.author = result.username;
    })
    res.send(results.rows)
  });
})

app.post('/api/reviews/:productid', (req, res) => {
  reviews.addReview(req.params.productid, req.body, () => {
    res.send('Product Review Added')
  })
})

app.listen(port, () => {
  console.log(`Listening on PORT ${port}`)
});
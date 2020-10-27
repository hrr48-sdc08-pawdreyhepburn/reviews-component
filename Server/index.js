require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');
const reviews = require('../database/controllers/reviews.js');
const path = require('path');
const cors = require('cors');
const app = express();
const port = 3004;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, '../Public')));
app.use(cors());

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
      result.wouldRecommend = result.wouldrecommend;
      result.stars = result.overall;
      result.helpfulVotes = result.helpfulvotes
    })
    console.log('GET', req.params.productid);
    res.send(results.rows);
  });
})

app.post('/api/reviews/:productid', (req, res) => {
  const d = new Date();
  req.body.createdAt = d.toISOString().substring(0, 10);
  reviews.addReview(req.params.productid, req.body, () => {
    console.log('POST', req.params.productid)
    res.send('Product Review Added')
  })
})

app.listen(port, () => {
  console.log(`Listening on PORT ${port}`)
});
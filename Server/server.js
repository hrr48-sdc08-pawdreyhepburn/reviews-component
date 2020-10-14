const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
var path = require('path');

const Reviews = require('../DB/Reviews');

const app = express();
const port = 3004;

const whitelist = ['http://localhost:3004'];

var corsOptions = {
  origin: (origin, cb) => {
    var originCheck = whitelist.indexOf(origin) !== -1;
    cb(null, originCheck);
  },
  credentials: true
}
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.use(express.static(__dirname + '/../Public'));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.get('/api/reviews', (req, res) => {
  Reviews.find({})
  .then(function(results) {
    res.send(results);
  })
})

app.get('/:id', (req, res) => {
  Reviews.find({ productId : ` ${req.params.id} ` }, function(err, result) {
    if (err) {
      console.log('ERROR')
      throw new Error();
    } else {
      res.sendFile(path.resolve('./Public/index.html'))
    }
  })
});

app.get('/api/reviews/:id', (req, res) => {
  Reviews.find({ productId : ` ${req.params.id} ` }, function(err, result) {
    if (err) {
      console.log('ERROR')
      throw new Error();
    } else {
      res.send(result);
    }
  })
});

//Post request adds a new review to a specific product
app.post('/api/reviews/:id', (req, res) => {
  var postData = req.body
  postData.productId = req.params.id;
  Reviews.create(postData, function(err, result) {
    if (err) {
      console.error(err)
      return;
    } else {
      Reviews.find({ productId : ` ${req.params.id} `}, function(err, result) {
        if (err) {
          console.error(err);
          return;
        } else {
          res.redirect(`/${req.params.id}`)
        }
      })
    }
  })
})

// app.post('/api/reivews')
// app.put - updating
// app.delete - deletes a review
var express = require('express');
const Stocks = require('./models/stocks');

mongoose.connect('mongodb://localhost/stocks', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

const db = mongoose.connection;
	
db.on('connected', function() {
  console.log(`Connected to MongoDB at ${db.host}:${db.port}`);
});

let p = new Stocks ({
    name: 'John',

})

p.save()
var express = require('express');
var router = express.Router();
const Stocks = require('../models/stocks');
const stocksCtrl = require('../controllers/stocks');
const { findById } = require('../models/stocks');
const token = process.env.GITHUB_TOKEN;

router.get('/', isLoggedIn ,stocksCtrl.index)

router.get('/search', isLoggedIn, stocksCtrl.search)

router.post('/watch', stocksCtrl.postWatch)
router.post('/portfolio', stocksCtrl.postPortfolio)


function isLoggedIn(req, res, next) {
    if ( req.isAuthenticated() ) return next();
    res.redirect('/auth/google');
  }

module.exports = router;

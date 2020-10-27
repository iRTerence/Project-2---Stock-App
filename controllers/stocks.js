var express = require('express');
var router = express.Router();
const Stocks = require('../models/stocks');
const axios = require('axios');
const request = require('request');
const token = process.env.FINNHUB_TOKEN;
const rootURL = `https://financialmodelingprep.com/api/v3/quote/`;


function search(req, res) {
    let ticker = req.query.ticker    
    request(`${rootURL+ticker}?apikey=${token}`, (err, response, body) => {
        const tickerData = JSON.parse(body);
        res.render('stocks/search', {tickerData})

    })
}

function index(req, res) {
    console.log(req.user.watch)
    console.log(req.user)
    res.render('stocks/index', {
        user: req.user,
        name: req.query.name,
    })
}

async function post (req,res ) {
    console.log(req.body.ticker)

    // await req.user.watch.deleteMany({ ticker: req.body.ticker }, function(err, result) {
    //     if (err) {
    //       res.send(err);
    //     } else {
    //       res.send(result);
    //     }
    //   });

    req.user.watch.push(req.body)
    req.user.save(function(err) {
        console.log(err)
    })

}

module.exports = {
    search,
    index,
    post
}
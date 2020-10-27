var express = require('express');
var router = express.Router();
const Stocks = require('../models/stocks');
const axios = require('axios');
const request = require('request');
const { watch } = require('../models/stocks');
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

    res.render('stocks/index', {
        user: req.user,
        name: req.query.name,
    })
}

// async function postWatch (req,res ) {
//     console.log(req.body.ticker)
//     req.user.watch.push(req.body)
//     req.user.save(function(err) {
//         console.log(err)
//     })

// }

async function postWatch (req,res ) {
  let stuff = req.body.ticker
  try {
  let a = await Stocks.find({'watch.ticker':req.body.ticker})
  if (a.length !== 0) {
  console.log(a)
  let tempArr = []
    console.log(a[0].watch)
    a[0].watch.forEach(w => {
        tempArr.push(w.ticker)
      })
      console.log(tempArr)
    if(tempArr.includes(stuff)) {
        return console.log('This is already on the watch list!')
    } else {
        req.user.watch.push(req.body)
        req.user.save(function(err) {
        console.log(err)
        })
    }} else {
        req.user.watch.push(req.body)
        req.user.save(function(err) {
        console.log(err)
        })
    }
} catch (err) {
    console.log(err)
}


}


// async function postWatch (req,res ) {
//     let x = req.body.ticker
//     let a = await Stocks.find({'watch.ticker':req.body.ticker})
//   //   console.log(a[0].watch[0].ticker)
// // a[0].watch.forEach( i => {
// //     if (i.ticker === x) {
// //         return console.log('this is already on the watch list')
        
// //     } else {
// //         req.user.watch.push(req.body)
// //         req.user.save(function(err) {
// //             // console.log(err)
// //     })
// // }
// // })

// // }



async function postPortfolio (req,res ) {
    console.log(req.body.ticker)
    req.user.portfolio.push(req.body)
    req.user.save(function(err) {
        console.log(err)
    })

}

module.exports = {
    search,
    index,
    postWatch,
    postPortfolio
}
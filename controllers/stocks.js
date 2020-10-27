var express = require('express');
var router = express.Router();
const Stocks = require('../models/stocks');
const axios = require('axios');
const request = require('request');
const { watch } = require('../models/stocks');
const stocks = require('../models/stocks');
const token = process.env.FINNHUB_TOKEN;
const rootURL = `https://financialmodelingprep.com/api/v3/quote/`;


function search(req, res) {
    //ticker data 
    let ticker = req.query.ticker   
    //requesting the API 
    request(`${rootURL+ticker}?apikey=${token}`, (err, response, body) => {
        const tickerData = JSON.parse(body);
        res.render('stocks/search', {tickerData})

    })
}

function index(req, res) {
    //set two variables for duplicate array and API data
    let dupeArr = []
    let apiData = []
    //push what the user has saved in their watchlist/portfolio into a single array
    req.user.watch.forEach(t => {
        dupeArr.push(t.ticker)
    })
    req.user.portfolio.forEach(t => {
        dupeArr.push(t.ticker)
    })
    //remove any dupes from watchlist/portoflio and set it to a new array Final
    finalArr = [...new Set(dupeArr)]
    console.log(finalArr)
    //for loop to loop over a API request to get all the json data required that were in the FinalARR
    
    // request(`${rootURL+ticker}?apikey=${token}`, (err, response, body) => {
        // const tickerData = JSON.parse(body);
        res.render('stocks/index', {
            user: req.user,
            name: req.query.name,
            // tickerData
        })  
    // })
}


async function postWatch (req,res ) {
    //set variable stuff to ticker id from body
  let stuff = req.body.ticker
  try {
      //Set a variable to find the requested item
    let a = await Stocks.find({'watch.ticker':req.body.ticker})
    //if I do NOT find the item the array would be empty [], so if the array.length is = 0 there were NO results
    if (a.length !== 0) {
        // console.log(a)
        let tempArr = []
        // console.log(a[0].watch)
        //push what the user has as ticker in a temp array
        a[0].watch.forEach(w => {
        tempArr.push(w.ticker)
      })
      // if the temp array includes the ticker info, it will NOT be added
    if(tempArr.includes(stuff)) {
        return console.log('This is already on the watch list!')
        //otherwise push to users watchlist
    } else {
        req.user.watch.push(req.body)
        req.user.save(function(err) {
        console.log(err)
        })
        //I needed two if statements. I ran the code without it and it didn't work.
    }} else {
        console.log(req.user)
        req.user.watch.push(req.body)
        req.user.save(function(err) {
        console.log(err)
            })
        }
    } catch (err) {
        console.log(err)
    }

}


//this function is the same as postWatch so the explanation is the same
async function postPortfolio (req,res ) {
    let stuff = req.body.ticker
    try { 
      let a = await Stocks.find({'portfolio.ticker':req.body.ticker})
      if (a.length !== 0) {
          console.log(a)
          let tempArray = []
          console.log(a[0].portfolio)
          a[0].portfolio.forEach(w => {
          tempArray.push(w.ticker)
        })
          console.log(tempArray)
      if(tempArray.includes(stuff)) {
          return console.log('This is already on the watch list!')
      } else {
          req.user.portfolio.push(req.body)
          req.user.save(function(err) {
          console.log(err)
          })
      }} else {
          req.user.portfolio.push(req.body)
          req.user.save(function(err) {
          console.log(err)
              })
          }
      } catch (err) {
          console.log(err)
      }
  
  }



module.exports = {
    search,
    index,
    postWatch,
    postPortfolio
}
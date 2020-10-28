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

async function index(req, res) {
    //set two variables for the symbols in the watchlist and the API info
    let initWatch = []
    let initPort = []
    let apiWatch = []
    let apiPort = []
    //push what the user has saved in their watchlist/portfolio into initWatch or initPort
    req.user.watch.forEach(t => {
        initWatch.push(t.ticker)
    })
    req.user.portfolio.forEach(t => {
        initPort.push(t.ticker)
    })

    //for loop to get all the API info for both the watchlist and portfolio and place it in the 2 info arrays
    for(let api of initWatch ) {
      let a = await axios.get(`${rootURL+api}?apikey=${token}`)
      apiWatch.push(a.data[0])
    }
    for(let api of initPort ) {
        let a = await axios.get(`${rootURL+api}?apikey=${token}`)
        apiPort.push(a.data[0])
      }      
      console.log(apiWatch[0].symbol)
        res.render('stocks/index', {
            user: req.user,
            name: req.query.name,
            apiPort,
            apiWatch,
        })  
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
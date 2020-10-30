var express = require('express');
var router = express.Router();
const Stocks = require('../models/stocks');
const axios = require('axios');
const request = require('request');
const token = process.env.FINNHUB_TOKEN;
const rootURL = `https://financialmodelingprep.com/api/v3/quote/`;
const newsURL = `https://financialmodelingprep.com/api/v3/stock_news?limit=50&apikey=${token}`
const tickerURL =  `https://financialmodelingprep.com/api/v3/stock_news?tickers=`

async function removeTickerWatch(req,res) {
    const id = req.params
    try{
        //Checks to see if stock is there 
        const remove = await Stocks.findOne({'watch._id': id.id })
        //if stock is there remove it that matches the id
        remove.watch.id(id.id).remove()
        remove.save(err => {
            res.redirect('/stocks')
        })
    } catch (err) {
        console.log(err)
    }

}

async function removeTickerPort(req,res) {
    const id = req.params
    try{
        //Checks to see if stock is there 
        const remove = await Stocks.findOne({'portfolio._id': id.id })
        //if stock is there remove it that matches the id
            remove.portfolio.id(id.id).remove()
            remove.save(err => {
            res.redirect('/stocks')
            })
    } catch (err) {
        console.log(err)
    }

}

async function search(req, res) {
    //ticker data 
    let ticker = req.query.ticker
    let news = await axios.get(newsURL)
    try {
    //getting the stock news API
    let tickerNews = await axios.get(`${tickerURL+ticker}&limit=50&apikey=${token}`)
    //requesting the API for stock tracking(I started using axios afterwards instead of request)
    request(`${rootURL+ticker}?apikey=${token}`, (err, response, body) => {
        const tickerData = JSON.parse(body);
        res.render('stocks/search', {
            tickerData,
            user: req.user,
            tickerNews: tickerNews.data,
            stockNews: news.data,
        })

    }) } catch (err){
        console.log(err)
    }
}

async function index(req, res) {
    //set all variables
    let initWatch = []
    let initPort = []
    let apiWatch = []
    let apiPort = []
    let news = await axios.get(newsURL)


    //This if statement is to check if the user is logged in or not and depending on if they are, will render differently
    if(req.user !== undefined) {
    //push what the user has saved in their watchlist/portfolio into initWatch or initPort
        req.user.watch.forEach(t => {
            initWatch.push(t.ticker)
        })
        req.user.portfolio.forEach(t => {
            initPort.push(t.ticker)
        })
        //for loop to get all the API info for both the watchlist and portfolio and place it in the 2 api arrays
        for(let api of initWatch ) {
          let a = await axios.get(`${rootURL+api}?apikey=${token}`)
          apiWatch.push(a.data[0])
        }
        for(let api of initPort ) {
            let a = await axios.get(`${rootURL+api}?apikey=${token}`)
            apiPort.push(a.data[0])
          } 
        res.render('stocks/index', {
             user: req.user,
             name: req.query.name,
             apiPort,
             apiWatch,
             stockNews: news.data,
            })  
    // this else is nescesarry so that I don't get an error for searching undefined data in my API if the user isn't logged
    } else {
        res.render('stocks/index', {
            user: req.user,
            stockNews: news.data
        })
    }
}

async function postWatch (req,res ) {
    //set variable stuff to ticker id from body
  let bodyticker = req.body.ticker
  try {
      //Set a variable to find the requested item
    let a = await Stocks.find({'watch.ticker':req.body.ticker})
    //if I do NOT find the item the array would be empty [], so if the array.length is = 0 there were NO results
    if (a.length !== 0) {
        let tempArr = []
        //push what the user has as ticker in a temp array
        a[0].watch.forEach(w => {
        tempArr.push(w.ticker)
      })
      // if the temp array includes the ticker info, it will NOT be added
        if(tempArr.includes(bodyticker)) {
            return console.log('This is already on the watch list!')
            //otherwise push to users watchlist
    } else {
        req.user.watch.push(req.body)
        req.user.save(function(err) {
        console.log(err)
        })
        //I needed two if statements. I ran the code without it and it didn't work.
    }} else {
        req.user.watch.push(req.body)
        req.user.save(function(err) {
        console.log(err)
        res.render('back')
            })
        }
    } catch (err) {
        console.log(err)
    }

}

//this function is the same as postWatch so the explanation is the same
async function postPortfolio (req,res ) {
    let bodyticker = req.body.ticker
    try { 
      let a = await Stocks.find({'portfolio.ticker':req.body.ticker})
      if (a.length !== 0) {
          let tempArray = []
          a[0].portfolio.forEach(w => {
          tempArray.push(w.ticker)
        })
      if(tempArray.includes(bodyticker)) {
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
          res.render('back')
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
    postPortfolio,
    removeTickerWatch,
    removeTickerPort,
}
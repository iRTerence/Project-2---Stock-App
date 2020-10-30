
let $portfolio = $('#portfolio').on('click', postRequest)
let $watchlist = $('#watchlist').on('click', watchRequest)
let symbol = document.getElementById('symbol').innerText


async function watchRequest() {
    try {
      await axios.post('https://t-stockwatcher.herokuapp.com/stocks/watch', {ticker: symbol,})
      console.log(req.user)

    } catch (error) {
      console.log(error)
    }

}

async function postRequest() {
  try {
    await axios.post('https://t-stockwatcher.herokuapp.com/stocks/portfolio', {ticker: symbol,})
    console.log(req.user)

  } catch (error) {
    console.log(error)
  }

}
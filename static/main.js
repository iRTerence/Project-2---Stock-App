
let $portfolio = $('#portfolio').on('click', postRequest)
let $watchlist = $('#watchlist').on('click', watchRequest)
let symbol = document.getElementById('symbol').innerText


async function watchRequest() {
    try {
      await axios.post('https://t-stockwatcher.herokuapp.com/stocks/watch', {ticker: symbol,})
      await window.location.replace("https://t-stockwatcher.herokuapp.com/stocks");

    } catch (error) {
      console.log(error)
    }

}

async function postRequest() {
  try {
    await axios.post('https://t-stockwatcher.herokuapp.com/stocks/portfolio', {ticker: symbol,})
    await window.location.replace("https://t-stockwatcher.herokuapp.com/stocks");

  } catch (error) {
    console.log(error)
  }

}
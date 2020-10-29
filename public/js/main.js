//Dom selection for all of the Day's gains
let change = document.querySelectorAll('.change')
let $portfolio = $('#portfolio').on('click', postRequest)
let $watchlist = $('#watchlist').on('click', watchRequest)

change.forEach((a) => {
    if(a.textContent.includes("-")) {
        a.style.color = "red"
    } else {
        a.style.color = "green"
    }
})


let symbol = document.getElementById('symbol').innerText

async function watchRequest() {
    try {
     await axios.post('http://localhost:3000/stocks/watch', {ticker: symbol})
    } catch (error) {
      console.log(error)
    }
    window.location.reload();

}

async function postRequest() {
  try {
    await axios.post('http://localhost:3000/stocks/portfolio', {ticker: symbol,})
  } catch (error) {
    console.log(error)
  }
  window.location.reload();

}


//Dom selection for all of the Day's gains
let change = document.querySelectorAll('.change')
let $portfolio = $('#portfolio').on('click', portRequest)
let $watchlist = $('#watchlist').on('click', watchRequest)
let $change = $('.change').on('click', refresh)

function refresh () {
     window.location.reload();
}

change.forEach((a) => {
    if(a.textContent.includes("-")) {
        a.style.color = "red"
    } else {
        a.style.color = "green"
    }
})


let symbol = document.getElementById('symbol').innerText

function watchRequest() {
  axios.post('http://localhost:3000/stocks/watch', {
    ticker: symbol,
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
}

// async function watchRequest() {
//     try {
//       await axios.post('http://localhost:3000/stocks/watch', {ticker: symbol})
//     } catch (error) {
//       console.log(error)
//     }

// }

async function portRequest() {
  try {
    await axios.post('http://localhost:3000/stocks/portfolio', {ticker: symbol,})
  } catch (error) {
    console.log(error)
  }
  window.location.reload();

}


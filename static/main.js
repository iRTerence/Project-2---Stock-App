
let $portfolio = $('#portfolio').on('click', postRequest)
let symbol = document.getElementById('symbol').innerText


async function postRequest() {
    try {
      const res = await axios.post('http://localhost:3000/stocks/', {ticker: symbol,})
      console.log(req.user)

    } catch (error) {
      console.log(error)
    }


}
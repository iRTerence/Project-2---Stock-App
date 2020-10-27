//api variables 
let $portfolio = $('#portfolio').on('click', postRequest)
let symbol = document.getElementById('symbol').innerText


function postRequest() {
    axios.post('/stocks', {
        ticker: symbol,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

}
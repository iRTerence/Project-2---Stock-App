//Dom selection for all of the Day's gains
let change = document.querySelectorAll('.change')

change.forEach((a) => {
    if(a.textContent.includes("-")) {
        a.style.color = "red"
    } else {
        a.style.color = "green"
    }
})


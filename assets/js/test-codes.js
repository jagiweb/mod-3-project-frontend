const caloriesForm = document.querySelector('#calories-form')
caloriesForm.addEventListener('submit', function _listener(e) {
    // debugger
    e.preventDefault()
    // let food = document.querySelector('input[name="food"]').value
    let caloriesd = document.querySelector('input[name="calories"]').value
    if (caloriesd) {
        let caloriesID = document.querySelector("#calories-number")
        // let totalCalories = user.days[user.days.length - 1].calories - caloriesd
        caloriesID.innerText = parseInt(caloriesID.innerText) - caloriesd

        let configurationObject = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                calories: caloriesID.innerText
            })
        }

        // debugger
        fetch(daysURL + user.days[user.days.length - 1].id, configurationObject)
            .then(resp => resp.json())
        // .then(totalCalories = 0)
        caloriesForm.removeEventListener("click", _listener, true);

    }
    // e.target.parentNode.remove()

    e.target.reset()
    //  renderUser()

    // debugger
    // renderItem()
})
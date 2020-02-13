const caloriesForm = document.querySelector('#calories-form')
caloriesForm.addEventListener('submit', function _listener(e) {
    e.preventDefault()
    let caloriesd = document.querySelector('input[name="calories"]').value
    if (caloriesd) {
        let caloriesID = document.querySelector("#calories-number")
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
        fetch(daysURL + user.days[user.days.length - 1].id, configurationObject)
            .then(resp => resp.json())
        caloriesForm.removeEventListener("click", _listener, true);

    }
    e.target.reset()
})
//// SIGNUP TEST ////////

const formSign = document.querySelector('#signin-form')
formSign.addEventListener('submit', function (e) {
    e.preventDefault()
    console.log('getting in')
    const email = document.querySelector('#email-signin').value
    const password = document.querySelector('#password-signin').value
    let obj = {
        email: email,
        password_digest: password
    }
    let configurationObject = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(obj)
    }

    fetch(authenticationURL, configurationObject)
        .then(resp => resp.json())
        .then(data => console.log(data))
})



   // function showBMR(user) {
   //     // Calculate BMR
   //     let calories = 0
   //     if (user.sex === "female" || user.sex === "Female") {
   //         calories = 447.593 + (9.247 * user.weight) + (3.098 * user.height) - (5.677 * user.age)
   //     } else {
   //         calories = 88.362 + (13.397 * user.weight) + (4.799 * user.height) - (6.8 * user.age)
   //     }
   //     let totalCalories = calories.toFixed(1)
   //     results.innerHTML = `Your basal metabolic rate is: ${user.calories}!!!! ${(totalCalories)} calories a day.`;
   //     results.style.display = ''

   // }

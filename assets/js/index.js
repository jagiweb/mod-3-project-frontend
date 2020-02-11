const usersURL = 'http://localhost:3000/users/'
const foodsURL = 'http://localhost:3000/foods/'
const daysURL = 'http://localhost:3000/days/'

addEventListener('DOMContentLoaded', function(){
    fetch(usersURL)
        .then(resp => resp.json())

    const form = document.querySelector('form')
    form.addEventListener('submit', function(e){
        e.preventDefault()
        let username = document.querySelector('input[name="username"]').value
        let email = document.querySelector('input[name="email"]').value
        let password = document.querySelector('input[name="password"]').value
        let age = document.querySelector('input[name="age"]').value
        let sex = document.querySelector('input[name="sex"]').value
        let weight = document.querySelector('input[name="weight"]').value
        let height = document.querySelector('input[name="height"]').value

        const newObj = {
            username: username,
            email: email,
            password_digest: password,
            age: age,
            sex: sex,
            weight: weight,
            height: height
        }
        
        let configurationObject = {
            method: "POST",
            headers: {
                "Content-Type":"application/json",
                "Accept":"application/json"
            },
            body: JSON.stringify(newObj)
        }

        fetch(usersURL, configurationObject)
            .then(resp => resp.json())
            .then(data => console.log(data))

            e.target.reset()

    })
    








}) /// END OF CONTENT LOADED
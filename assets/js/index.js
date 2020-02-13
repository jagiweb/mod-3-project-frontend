const usersURL = 'http://localhost:3000/users/'
const foodsURL = 'http://localhost:3000/foods/'
const daysURL = 'http://localhost:3000/days/'

addEventListener('DOMContentLoaded', function(){
    function fetchAllUsers() {
        return fetch(usersURL)
            .then(resp => resp.json())
    } 

    const formSignUp = document.querySelector('#signup-form')
    formSignUp.addEventListener('submit', function(e){
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

    const formSignIn = document.querySelector('#signin-form')
    formSignIn.addEventListener('click', function (e) {
        e.preventDefault()
        return fetchAllUsers()
            .then(function (users) {
                const email = document.querySelector('#email-signin').value
                const password = document.querySelector('#password-signin').value
                for (let i = 0; i < users.length; i++) {
                    if (users[i].email === email && users[i].password_digest === password) {
                    // renderUser(users[i])
                    let h1 = document.createElement('h1')
                    h1.innerText = users[i].username
                    let bodies = document.querySelector('body')
                    bodies.append(h1)
                    const logOut = document.querySelector(".mariola")
                    logOut.innerHTML = ""
                } else {
                    
                }
                
            }
        })
    })


    








}) /// END OF CONTENT LOADED
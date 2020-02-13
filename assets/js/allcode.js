const usersURL = 'http://localhost:3000/users/'
const foodsURL = 'http://localhost:3000/foods/'
const daysURL = 'http://localhost:3000/days/'
const authenticationURL = 'http://localhost:3000/users/authenticate'

addEventListener('DOMContentLoaded', function () {
    function fetchAllUsers() {
        return fetch(usersURL)
            .then(resp => resp.json())
    }

    //New User
    const formSignUp = document.querySelector('#signup-form')
    formSignUp.addEventListener('submit', function (e) {
        e.preventDefault()
        let username = document.querySelector('input[name="username"]').value
        let email = document.querySelector('input[name="email"]').value
        let password = document.querySelector('input[name="password"]').value
        let age = document.querySelector('input[name="age"]').value
        let sex = document.querySelector('input[name="sex"]').value
        let weight = document.querySelector('input[name="weight"]').value
        let height = document.querySelector('input[name="height"]').value

        let bmr = 0
        if (sex === "female" || sex === "Female") {
            bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (5.677 * age)
        } else {
            bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (6.8 * age)
        }
        let totalBMR = bmr.toFixed(1)

        // debugger
        const newObj = {
            username: username,
            email: email,
            password_digest: password,
            age: age,
            sex: sex,
            weight: weight,
            height: height,
            bmr: parseInt(totalBMR)
        }

        let configurationObject = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(newObj)
        }

        fetch(usersURL, configurationObject)
            .then(resp => resp.json())
            .then(user => postDayForUser(user))

        e.target.reset()


    })

    function postDayForUser(user) {

        let creationDay = {
            // date: Date.now(),
            calories: user.bmr,
            user_id: user.id
        }

        let array = []
        array.push(creationDay)
        let configurationObject = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(creationDay)
        }

        fetch(daysURL, configurationObject)
            .then(resp => resp.json())
            .then(day => renderUser(user))
    }

    //Existing User 
    // const formSignIn = document.querySelector('#signin-form')
    // formSignIn.addEventListener('submit', function (e) {
    //     e.preventDefault()
    //     return fetchAllUsers()
    //         .then(function (users) {
    //             const email = document.querySelector('#email-signin').value
    //             const password = document.querySelector('#password-signin').value
    //             for (let i = 0; i < users.length; i++) {
    //                 debugger
    //                 if (users[i].email === email && users[i].password_digest === password) {
    //                 renderUser(users[i])
    //             } else {
    //                 console.log('works')
    //             }

    //         }
    //     })
    // })

    const formSign = document.querySelector('#signin-form')
    formSign.addEventListener('submit', function (e) {
        e.preventDefault()
        // console.log('getting in')
        const email = document.querySelector('#email-signin').value
        const password = document.querySelector('#password-signin').value
        let login = {
            email: email,
            password_digest: password
        }
        let configurationObject = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(login)
        }

        fetch(authenticationURL, configurationObject)
            .then(resp => resp.json())
            .then(user => renderUser(user[0]))
    })

    function renderUser(user) {
        const mainPage = document.querySelector('.top-div')
        const mainBackground = document.querySelector('.modal-backdrop')
        mainBackground.remove()
        mainPage.remove()
        // Display results
        // showBMR(user);

        renderUserPage(user)

    }


    function renderUserPage(user) {
        const menuBar = document.createElement('div')
        menuBar.id = 'wrapper'
        menuBar.classList.add('menuDisplayed')
        const sideBarWrapper = document.createElement('div')
        sideBarWrapper.id = 'sidebar-wrapper'
        const ulMenu = document.createElement('ul')
        ulMenu.classList.add('sidebar-nav')
        const bmrLi = document.createElement('li')
        const aBmr = document.createElement('a')
        bmrLi.append(aBmr)
        aBmr.innerText = "Update BMR"
        aBmr.href = "#"
        const caloriesLi = document.createElement('li')
        const aCalories = document.createElement('a')
        aCalories.href = "#"
        caloriesLi.append(aCalories)
        aCalories.innerText = "Update Calories"
        sideBarWrapper.append(ulMenu)
        ulMenu.append(bmrLi, caloriesLi)

        const pageContentDiv = document.createElement('div')
        pageContentDiv.id = 'page-content-wrapper'
        const containerDiv = document.createElement('div')
        containerDiv.classList = 'container-fluid all-content'
        const rowDiv = document.createElement('div')
        rowDiv.classList = 'row rowDiv'
        const colDiv = document.createElement('div')
        colDiv.classList = 'col-lg-12 text-center'
        const buttonToggle = document.createElement('a')
        buttonToggle.id = 'menu-toggle'
        buttonToggle.classList.add('btn')
        const spanTag = document.createElement('span')
        spanTag.classList = "glyphicon glyphicon-menu-hamburger"
        buttonToggle.append(spanTag)
        /// maybe another function here
        const introTag = document.createElement('h1')
        introTag.innerText = `Hello ${user.username},`
        const welcomeTag = document.createElement('h2')
        welcomeTag.innerText = "Welcome to MyCalories!"
        const infoTag = document.createElement('p')
        infoTag.innerText = "Basal Metabolic Rate (BMR) is the number of calories required to keep your body functioning at rest. This is the amount of calories your body burns even if you did nothing all day."
        const sideBarDiv = document.querySelector('#sidebar-menu')
        menuBar.append(sideBarWrapper, pageContentDiv)
        pageContentDiv.append(containerDiv)
        containerDiv.append(rowDiv)
        rowDiv.append(colDiv)
        colDiv.append(buttonToggle, introTag, welcomeTag, infoTag)
        sideBarDiv.append(menuBar)
        renderBmrBox(user)
        caloriesTrackers(user)
    }

    function renderBmrBox(user) {
        const boxesDiv = document.createElement('div')
        boxesDiv.classList = 'row'
        const allContent = document.querySelector('.all-content')
        allContent.append(boxesDiv)

        const bmrDiv1 = document.createElement('div')
        bmrDiv1.classList = 'col-lg-6 text-center'
        let bmrTitle = document.createElement('p')
        bmrTitle.innerText = 'My Daily Calorie Allowance: '
        let bmrNumber = document.createElement('h4')
        bmrNumber.innerText = user.bmr
        // debugger
        const bmrDiv2 = document.createElement('div')
        bmrDiv2.classList = 'col-lg-6 text-center'
        let caloriesTitle = document.createElement('p')
        caloriesTitle.innerText = 'Remaining Calories:  '
        let caloriesNumber = document.createElement('h4')
        caloriesNumber.id = "calories-number"
        // debugger

        caloriesNumber.innerText = user.days[user.days.length - 1].calories

        bmrDiv2.append(caloriesTitle, caloriesNumber)
        bmrDiv1.append(bmrTitle, bmrNumber)
        boxesDiv.append(bmrDiv1, bmrDiv2)
    }

    function caloriesTrackers(user) {
        const allContentDiv = document.querySelector('.all-content')

        const breakfastLunchDiv = document.createElement('div')
        breakfastLunchDiv.classList = 'row'
        const dinnerSnackDiv = document.createElement('div')
        dinnerSnackDiv.classList = 'row'
        allContentDiv.append(breakfastLunchDiv, dinnerSnackDiv)

        const breakfastDiv = document.createElement('div')
        breakfastDiv.classList = 'col-lg-6 text-center'
        let breakfastTitle = document.createElement('p')
        breakfastTitle.innerText = 'Breakfast'
        let breakfastButton = document.createElement('button')
        breakfastButton.setAttribute('type', 'button')
        breakfastButton.setAttribute('data-toggle', 'modal')
        breakfastButton.setAttribute('id', 'add-calories')
        breakfastButton.setAttribute('data-target', '#calories-form')
        breakfastButton.innerText = 'Add calories'
        breakfastDiv.append(breakfastTitle, breakfastButton)

        const lunchDiv = document.createElement('div')
        lunchDiv.classList = 'col-lg-6 text-center'
        let lunchTitle = document.createElement('p')
        lunchTitle.innerText = 'Lunch'
        let lunchButton = document.createElement('button')
        lunchButton.setAttribute('type', 'button')
        lunchButton.setAttribute('data-toggle', 'modal')
        lunchButton.setAttribute('id', 'add-calories')
        lunchButton.setAttribute('data-target', '#calories-form')
        lunchButton.innerText = 'Add calories'
        lunchDiv.append(lunchTitle, lunchButton)

        breakfastLunchDiv.append(breakfastDiv, lunchDiv)

        const dinnerDiv = document.createElement('div')
        dinnerDiv.classList = 'col-lg-6 text-center'
        let dinnerTitle = document.createElement('p')
        dinnerTitle.innerText = 'Dinner'
        let dinnerButton = document.createElement('button')
        dinnerButton.setAttribute('type', 'button')
        dinnerButton.setAttribute('data-toggle', 'modal')
        dinnerButton.setAttribute('id', 'add-calories')
        dinnerButton.setAttribute('data-target', '#calories-form')
        dinnerButton.innerText = 'Add calories'
        dinnerDiv.append(dinnerTitle, dinnerButton)

        const snackDiv = document.createElement('div')
        snackDiv.classList = 'col-lg-6 text-center'
        let snackTitle = document.createElement('p')
        snackTitle.innerText = 'Snack'
        let snackButton = document.createElement('button')
        snackButton.setAttribute('type', 'button')
        snackButton.setAttribute('data-toggle', 'modal')
        snackButton.setAttribute('id', 'add-calories')
        snackButton.setAttribute('data-target', '#calories-form')
        snackButton.innerText = 'Add calories'
        snackDiv.append(snackTitle, snackButton)

        dinnerSnackDiv.append(dinnerDiv, snackDiv)

        snackButton.addEventListener("click", function (e) {
            e.preventDefault()
            createFormCalories()
        })


        clickEventCaloriesForm(user)

    }

    function clickEventCaloriesForm(user) {
        const caloriesForm = document.querySelector('#calories-form')
        caloriesForm.addEventListener('submit', function (e) {
            e.preventDefault()
            patchCaloriesSnack(user)
            // e.target.parentNode.remove()
            caloriesForm.removeEventListener('submit', listener, true)
            // e.target.reset()
        }, true);
    }

    function patchCaloriesSnack(user) {
        // let food = document.querySelector('input[name="food"]').value
        let caloriesd = document.querySelector('#calories').value

        let totalCalories = user.days[user.days.length - 1].calories - caloriesd

        let caloriesID = document.querySelector("#calories-number")
        caloriesID.innerText = totalCalories

        let configurationObject = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                calories: totalCalories
            })
        }

        // debugger
        fetch(daysURL + user.days[user.days.length - 1].id, configurationObject)
            .then(resp => resp.json())
        // .then(totalCalories = 0)


        renderUser(user)

        // debugger
        // renderItem()
    }

    function createFormCalories() {
        let formContent = document.querySelector('.modal-content')
        let formBody = document.createElement('div')
        formBody.classList = 'modal-body'
        formContent.append(formBody)
        let form = document.createElement('form')
        form.id = 'calories-form'
        formBody.append(form)
        let food = document.createElement('input')
        food.innerText = "Add Meal"
        food.setAttribute('name', 'food')
        food.setAttribute('placeholder', 'Add Meal')
        food.setAttribute('id', 'food')
        food.setAttribute('type', 'text')
        let cal = document.createElement('input')
        cal.innerText = "Add Calories"
        cal.setAttribute('name', 'text')
        cal.setAttribute('placeholder', 'Add Calories')
        cal.setAttribute('id', 'calories')
        cal.setAttribute('type', 'text')
        let submit = document.createElement('button')
        submit.innerText = "Submit"
        submit.setAttribute('type', 'submit')
        submit.setAttribute('value', 'Submit')
        form.append(food, cal, submit)
    }

    // })

    //New Meal


    // function renderItem() {
    //     // console.log('i am here')
    //     // const mainPage = document.querySelector('.calories-div')
    //     // const mainBackground = document.querySelector('.modal-backdrop')


    //     // renderUserPagne(user)
    // }





    /// END OF CONTENT LOADED
})
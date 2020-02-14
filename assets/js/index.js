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
            .then(user => renderUser(user))
            // renderUser(user)
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
        aBmr.id = 'brm-update'
        // aBmr.setAttribute('type', 'button')
        aBmr.setAttribute('data-toggle', 'modal')
        aBmr.setAttribute('data-target', '#bmr-form')
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
        const introTag = document.createElement('h3')
        introTag.innerText = `Hello ${user.username},`
        introTag.classList = "font-lemonada"
        const welcomeTag = document.createElement('h2')
        welcomeTag.innerText = "Welcome to MyCalories!"
        welcomeTag.classList = "font-federicka"
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
        boxesDiv.classList = 'row margin-top-50'
        const allContent = document.querySelector('.all-content')
        allContent.append(boxesDiv)

        ///// BMR BOX //// 
        const bmrDiv1 = document.createElement('div')
        bmrDiv1.classList = 'col-md-4 mb-4 col-lg-4 text-center'
        const bmrDiv4 = document.createElement('div')
        bmrDiv4.classList = "card border-left-primary shadow h-100 py-2"
        bmrDiv1.append(bmrDiv4)
        const bmrDiv5 = document.createElement('div')
        bmrDiv5.classList = "card-body"
        bmrDiv4.append(bmrDiv5)
        const bmrDiv6 = document.createElement('div')
        bmrDiv5.append(bmrDiv6)
        bmrDiv6.classList = "row no-gutters align-items-center"
        const bmrDiv7 = document.createElement('div')
        bmrDiv7.classList = "col mr-2"
        bmrDiv6.append(bmrDiv7)
        let bmrTitle = document.createElement('div')
        bmrTitle.classList = "text-xs font-weight-bold text-primary text-uppercase mb-1"
        bmrTitle.innerText = 'My Daily Calorie Allowance: '
        let bmrNumber = document.createElement('div')
        bmrNumber.id = "bmr-number"
        bmrNumber.classList = "h5 mb-0 font-weight-bold text-gray-800"
        bmrNumber.innerText = user.bmr
        bmrDiv7.append(bmrTitle, bmrNumber)

        //// LINE BETWEEN BOTH BOXES /////// 

        const line = document.createElement('div')
        line.classList = "col-md-2 mb-4 col-lg-2 text-center"
        const line1 = document.createElement('div')
        line1.classList = "col-md-2 mb-4 col-lg-2 text-center"

        //// REMAINING CALORIES BOX ///// 
        const bmrDiv2 = document.createElement('div')
        bmrDiv2.classList = 'col-md-4 mb-4 col-lg-4 text-center'
        const bmrDiv8 = document.createElement('div')
        bmrDiv8.classList = "card border-left-primary shadow h-100 py-2"
        bmrDiv2.append(bmrDiv8)
        const bmrDiv9 = document.createElement('div')
        bmrDiv9.classList = "card-body"
        bmrDiv8.append(bmrDiv9)
        const bmrDiv10 = document.createElement('div')
        bmrDiv9.append(bmrDiv10)
        bmrDiv10.classList = "row no-gutters align-items-center"
        const bmrDiv11 = document.createElement('div')
        bmrDiv11.classList = "col mr-2"
        bmrDiv10.append(bmrDiv11)
        let caloriesTitle = document.createElement('div')
        caloriesTitle.classList = "text-xs font-weight-bold text-primary text-uppercase mb-1"
        caloriesTitle.innerText = 'Remaining Calories: '
        let caloriesNumber = document.createElement('div')
        caloriesNumber.id = 'calories-number'
        caloriesNumber.classList = "h5 mb-0 font-weight-bold text-gray-800"
        caloriesNumber.innerText = user.days[user.days.length - 1].calories
        bmrDiv11.append(caloriesTitle, caloriesNumber)
        // debugger
        // const bmrDiv2 = document.createElement('div')
        // bmrDiv2.classList = 'col-lg-6 text-center'
        // let caloriesTitle = document.createElement('p')
        // caloriesTitle.innerText = 'Remaining Calories:  '
        // let caloriesNumber = document.createElement('h4')
        // caloriesNumber.id = "calories-number"
        // // debugger

        // const bmrDiv3 = document.createElement('div')
        // bmrDiv3.classList = 'col-lg-6 text-center'
        // let progressTitle = document.createElement('p')
        // progressTitle.innerText = 'Your Weekly Progress:'

        // caloriesNumber.innerText = user.days[user.days.length - 1].calories

        // bmrDiv2.append(caloriesTitle, caloriesNumber)
        // bmrDiv1.append(bmrTitle, bmrNumber)
        // bmrDiv3.append(progressTitle)
        boxesDiv.append(line, bmrDiv1, bmrDiv2, line1)
    }

    function caloriesTrackers(user) {
        updateBmr(user)
        const allContentDiv = document.querySelector('.all-content')
        let rowForTitle = document.createElement('div')
        rowForTitle.classList = "row"
        const breakfastLunchDiv = document.createElement('div')
        breakfastLunchDiv.classList = 'row'
        const dinnerSnackDiv = document.createElement('div')
        dinnerSnackDiv.classList = 'row'
        let divColTitle = document.createElement('div')
        divColTitle.classList = "col-lg-12"
        const titleAddCalories = document.createElement('h3')
        titleAddCalories.innerText = "Add your calories"
        titleAddCalories.classList = "text-center font-lemonada"
        divColTitle.append(titleAddCalories)
        rowForTitle.append(divColTitle)
        // divColTitle.append(titleAddCalories)
        allContentDiv.append(rowForTitle, breakfastLunchDiv, dinnerSnackDiv)

        const breakfastDiv = document.createElement('div')
        breakfastDiv.classList = 'col-sm-3 text-center margin-0'
        let breakfastButton = document.createElement('button')
        breakfastButton.setAttribute('type', 'button')
        breakfastButton.setAttribute('data-toggle', 'modal')
        breakfastButton.setAttribute('id', 'add-calories')
        breakfastButton.setAttribute('data-target', '#calories-form')
        breakfastButton.innerText = 'Breakfast'
        breakfastButton.classList = "button-food"
        breakfastDiv.append(breakfastButton)

        const lunchDiv = document.createElement('div')
        lunchDiv.classList = 'col-sm-3 text-center margin-0'
        let lunchButton = document.createElement('button')
        lunchButton.setAttribute('type', 'button')
        lunchButton.setAttribute('data-toggle', 'modal')
        lunchButton.setAttribute('id', 'add-calories')
        lunchButton.setAttribute('data-target', '#calories-form')
        lunchButton.innerText = 'Lunch'
        lunchButton.classList = "button-food"
        lunchDiv.append(lunchButton)

        // breakfastLunchDiv.append()

        const dinnerDiv = document.createElement('div')
        dinnerDiv.classList = 'col-sm-3 text-center margin-0'
        let dinnerButton = document.createElement('button')
        dinnerButton.setAttribute('type', 'button')
        dinnerButton.setAttribute('data-toggle', 'modal')
        dinnerButton.setAttribute('id', 'add-calories')
        dinnerButton.setAttribute('data-target', '#calories-form')
        dinnerButton.innerText = 'Dinner'
        dinnerButton.classList = "button-food"
        dinnerDiv.append(dinnerButton)

        const snackDiv = document.createElement('div')
        snackDiv.classList = 'col-sm-3 text-center margin-0'
        let snackButton = document.createElement('button')
        snackButton.setAttribute('type', 'button')
        snackButton.setAttribute('data-toggle', 'modal')
        snackButton.setAttribute('id', 'add-calories')
        snackButton.setAttribute('data-target', '#calories-form')
        snackButton.classList = "button-food"
        snackButton.innerText = 'Snack'
        snackDiv.append(snackButton)
        
        // dinnerSnackDiv.append(dinnerDiv, snackDiv)
        breakfastLunchDiv.append(breakfastDiv, lunchDiv, dinnerDiv, snackDiv)

        // snackButton.addEventListener("click", function (e) {
        //     e.preventDefault()
        //     createFormCalories()
        // })

        /////////////// HERE WAS THE PATCH WORKING ////////////////
        const caloriesForm = document.querySelector('#calories-form')
        caloriesForm.addEventListener('submit', function _listener(e) {
            // debugger
            e.preventDefault()
            let food = document.querySelector('input[name="food"]').value
            let caloriesd = document.querySelector('input[name="calories"]').value
            if (caloriesd) {
                let caloriesID = document.querySelector("#calories-number")
                // let totalCalories = user.days[user.days.length - 1].calories - caloriesd
                caloriesID.innerText = parseInt(caloriesID.innerText) - caloriesd

                let configurationObject = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify({
                        name: food,
                        calories: caloriesd,
                        day_id: user.days[user.days.length - 1].id
                    })
                }
                // console.log(user.days[0].foods)
                fetch(foodsURL, configurationObject)
                    .then(resp => resp.json())
                    .then(user => foodItem(user))
                    
                caloriesForm.removeEventListener("click", _listener, true);

            }
            e.target.reset()
        })
    }

        function foodItem(user) {
            let caloriesd = document.querySelector('input[name="calories"]').value
                let caloriesID = document.querySelector("#calories-number")
                caloriesID.innerText = parseInt(caloriesID.innerText) - caloriesd
            const configurationObject = {
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

        }
    
    function updateBmr(user) {
        const updateBMR = document.querySelector("#brm-update")
        updateBMR.addEventListener('click', function (e) {
            console.log('lala')
            const updateBMRform = document.querySelector('#bmr-form')
            updateBMRform.addEventListener('submit', function (e) {
                e.preventDefault()
                let age = document.querySelector('input[name="age"]').value
                let weight = document.querySelector('input[name="weight"]').value
                let height = document.querySelector('input[name="height"]').value

                let bmr = 0
                if (user.sex === "female" || user.sex === "Female") {
                    bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (5.677 * age)
                } else {
                    bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (6.8 * age)
                }
                let updatedBMR = bmr.toFixed(1)

                let bmrNumberDiv = document.querySelector('#bmr-number')
                bmrNumberDiv.innerText = updatedBMR
                const newBMR = {
                    age: age,
                    weight: weight,
                    height: height,
                    bmr: parseInt(updatedBMR)
                }
                let configurationObject = {
                    method: 'PATCH',
                    headers: {
                            "Content-Type": "application/json",
                            "Accept": "application/json"
                        },
                        body: JSON.stringify(newBMR)
                }

                fetch(usersURL + user.id, configurationObject)
                    .then(resp => resp.json())
                    // .then(user => renderUser(user))
                    e.target.reset()
            })
        })

    

    /// END OF CONTENT LOADED
})
// function createFormCalories(){
//     let formContent = document.querySelector('.modal-content')
//     let formBody = document.createElement('div')
//     formBody.classList = 'modal-body'
//     formContent.append(formBody)
//     let form = document.createElement('form')
//     form.id = 'calories-form'
//     formBody.append(form)
//     let food = document.createElement('input')
//     food.innerText = "Add Meal"
//     food.setAttribute('name', 'food')
//     food.setAttribute('placeholder', 'Add Meal')
//     food.setAttribute('id', 'food')
//     food.setAttribute('type', 'text')
//     let cal = document.createElement('input')
//     cal.innerText = "Add Calories"
//     cal.setAttribute('name', 'text')
//     cal.setAttribute('placeholder', 'Add Calories')
//     cal.setAttribute('id', 'calories')
//     cal.setAttribute('type', 'text')
//     let submit = document.createElement('button')
//     submit.innerText = "Submit"
//     submit.setAttribute('type', 'submit')
//     submit.setAttribute('value', 'Submit')
//     form.append(food, cal, submit)
// }

// })

//New Meal


// function renderItem() {
//     // console.log('i am here')
//     // const mainPage = document.querySelector('.calories-div')
//     // const mainBackground = document.querySelector('.modal-backdrop')


//     // renderUserPagne(user)
// }
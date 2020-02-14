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


    }) /// end of event listener for sign up form ///

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

    } /// end of post day for user function ///

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
        renderUserPage(user)

    } // end of render user function ///


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
        // introTag.innerText = `Hello ${user.username},`
        introTag.classList = "font-lemonada"
        const welcomeTag = document.createElement('h2')
        welcomeTag.innerText = `Welcome ${user.username}, to MyCalories!`
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
    } /// end of render user page function ///

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
        boxesDiv.append(line, bmrDiv1, bmrDiv2, line1)
    } // end of bmrbox function

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
        titleAddCalories.classList = "text-center font-lemonada margin-top-50"
        divColTitle.append(titleAddCalories)
        rowForTitle.append(divColTitle)

        const col12Div = document.createElement('div')
        col12Div.classList = 'col-md-12 text-center margin-0'
        allContentDiv.append(rowForTitle, col12Div)
        let breakfastButton = document.createElement('button')
        breakfastButton.setAttribute('type', 'button')
        breakfastButton.setAttribute('data-toggle', 'modal')
        breakfastButton.setAttribute('id', 'add-calories')
        breakfastButton.setAttribute('data-target', '#calories-form')
        breakfastButton.innerText = 'Breakfast'
        breakfastButton.classList = "button-food"
        
        let lunchButton = document.createElement('button')
        lunchButton.setAttribute('type', 'button')
        lunchButton.setAttribute('data-toggle', 'modal')
        lunchButton.setAttribute('id', 'add-calories')
        lunchButton.setAttribute('data-target', '#calories-form')
        lunchButton.innerText = 'Lunch'
        lunchButton.classList = "button-food"

        let dinnerButton = document.createElement('button')
        dinnerButton.setAttribute('type', 'button')
        dinnerButton.setAttribute('data-toggle', 'modal')
        dinnerButton.setAttribute('id', 'add-calories')
        dinnerButton.setAttribute('data-target', '#calories-form')
        dinnerButton.innerText = 'Dinner'
        dinnerButton.classList = "button-food"
        
        let snackButton = document.createElement('button')
        snackButton.setAttribute('type', 'button')
        snackButton.setAttribute('data-toggle', 'modal')
        snackButton.setAttribute('id', 'add-calories')
        snackButton.setAttribute('data-target', '#calories-form')
        snackButton.classList = "button-food"
        snackButton.innerText = 'Snack'

        col12Div.append(breakfastButton, lunchButton, dinnerButton, snackButton)
        // breakfastLunchDiv.append(breakfastDiv, lunchDiv, dinnerDiv, snackDiv)

        /////////////// HERE WAS THE PATCH WORKING ////////////////
        const caloriesForm = document.querySelector('#calories-form')
        caloriesForm.addEventListener('submit', function _listener(e) {
            e.preventDefault()
            let food = document.querySelector('input[name="food"]').value
            let caloriesd = document.querySelector('input[name="calories"]').value
            if (caloriesd) {
                let caloriesID = document.querySelector("#calories-number")
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
                    // .then(user => foodItem(user))
                    .then(function (user) {
                        let table = document.querySelector('.table')
                        table.remove()
                        console.log(1)
                        foodItem(user)
                        console.log(2)
                        return renderMeals(user)
                    })
                    
                caloriesForm.removeEventListener("click", _listener, true);

            }
            e.target.reset()
        })
        renderMeals(user)
    } /// end of calories tracker function /// 

    function foodItem(user) {
        // console.log(3)
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
                // .then(user => renderMeals(user))

    } /// end of food item function /// 
    
    function updateBmr(user) {
        const updateBMR = document.querySelector("#brm-update")
        updateBMR.addEventListener('click', function (e) {
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

                e.target.reset()
            }) // end of event listener for patch user info ///
        })
    }  /// end of update bmr function ///

    function renderMeals(user) {
        // console.log(4)
        let contFluidDivv = document.querySelector('.container-fluid')
        let mealsTable = document.createElement('table')
        contFluidDivv.append(mealsTable)
        mealsTable.classList = "table table-hover margin-top-50"
        let tableHead = document.createElement('thead')
        let tableRow = document.createElement('tr')
        
        let tableHeader = document.createElement('th')
        tableHeader.setAttribute = ("scope", "col")
        tableHeader.innerText = "#"
        let mealHeader = document.createElement('th')
        mealHeader.setAttribute = ("scope", "col")
        mealHeader.innerText = "Meal"
        let calorieHeader = document.createElement('th')
        calorieHeader.setAttribute = ("scope", "col")
        calorieHeader.innerText = "Calorie"
        let editHeader = document.createElement('th')
        editHeader.setAttribute = ("scope", "col")
        editHeader.innerText = "Edit"
        let tableBody = document.createElement('tbody')
        tableRow.append(tableHeader, mealHeader, calorieHeader, editHeader)
        let foods = user.days[user.days.length - 1].foods
        mealsTable.append(tableHead, tableRow, tableBody)

        for (let i = 0; i < foods.length; i++) {
            let tRow = document.createElement('tr')
            tableBody.append(tRow)

            let numHeader = document.createElement('th')
            numHeader.setAttribute = ('scope', 'row')
            numHeader.innerText = `${i + 1}`
            let mealData = document.createElement('td')
            mealData.innerText = foods[i].name
            let caloriesData = document.createElement('td')
            caloriesData.innerText = foods[i].calories
            let buttonData = document.createElement('td')
            let buttonEdit = document.createElement('button')
            buttonEdit.setAttribute('type', 'button')
            buttonEdit.setAttribute('data-toggle', 'modal')
            buttonEdit.setAttribute('id', 'update-meal')
            buttonEdit.setAttribute('data-target', '#update-form')
            buttonEdit.innerText = "Edit"
            buttonEdit.classList = "btn btn-primary"
            buttonData.append(buttonEdit)
            tRow.append(numHeader, mealData, caloriesData, buttonData)
            /// edit ///
            buttonEdit.addEventListener("click", function(e) {
                const updateMeal = document.querySelector("#update-form")
                updateMeal.addEventListener("submit", function (e) {
                    e.preventDefault()
                    let name = document.querySelector('input[name="food"]').value
                    let calories = document.querySelector('input[name="calories"]').value

                    const updatedMeal = {
                        name: name,
                        calories: calories,
                    }
                    let configurationObject = {
                        method: 'PATCH',
                        headers: {
                            "Content-Type": "application/json",
                            "Accept": "application/json"
                        },
                        body: JSON.stringify(updatedMeal)
                    }

                    fetch(foodsURL + foods.id, configurationObject)
                        .then(resp => resp.json())
                        .then(user => renderMeals(user))

                    e.target.reset()
                })
            })


        }
    }
    
    
})/// END OF CONTENT LOADED


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
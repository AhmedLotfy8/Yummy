// Main Section variables
var mainSectionRow = document.querySelector('#MainSection .row')

// Search Section variables
var searchSection = document.querySelector('#SearchSection');
var navSearchBtn = document.querySelectorAll('.sideMenu h5')[0];
var searchByName = document.querySelectorAll('#SearchSection input')[0];
var searchByFirstLetter = document.querySelectorAll('#SearchSection input')[1];
var searchSectionRow = document.querySelector('#SearchSection .searchedItems');

// Categories Section variables
var categoriesSection = document.querySelector('#CategoriesSection');
var categoriesSectionRow = document.querySelector('#CategoriesSection .row');
var navCategoriesBtn = document.querySelectorAll('.sideMenu h5')[1];

// Area Section variables
var areaSection = document.querySelector('#AreaSection');
var areaSectionRow = document.querySelector('#AreaSection .row');
var navAreaBtn = document.querySelectorAll('.sideMenu h5')[2];

// Ingredients Section variables
var ingredientsSection = document.querySelector('#IngredientsSection');
var ingredientsSectionRow = document.querySelector('#IngredientsSection .row');
var navIngredientsBtn = document.querySelectorAll('.sideMenu h5')[3];

// Contact Us Section variables
var contactUsSection = document.querySelector('#ContactUsSection');
var navContactUsBtn = document.querySelectorAll('.sideMenu h5')[4];
var regex;
var allInputsValidation = {
    name: false,
    email: false,
    phone: false,
    age: false,
    password: false,
    rePassword: false
}
var inputName = document.querySelectorAll('#ContactUsSection input')[0]
var inputEmail = document.querySelectorAll('#ContactUsSection input')[1]
var inputPhone = document.querySelectorAll('#ContactUsSection input')[2]
var inputAge = document.querySelectorAll('#ContactUsSection input')[3]
var inputPassword = document.querySelectorAll('#ContactUsSection input')[4]
var inputRePassword = document.querySelectorAll('#ContactUsSection input')[5]
var nameError = document.querySelectorAll('#ContactUsSection .inputError')[0];
var emailError = document.querySelectorAll('#ContactUsSection .inputError')[1];
var phoneError = document.querySelectorAll('#ContactUsSection .inputError')[2];
var ageError = document.querySelectorAll('#ContactUsSection .inputError')[3];
var passwordError = document.querySelectorAll('#ContactUsSection .inputError')[4];
var rePasswordError = document.querySelectorAll('#ContactUsSection .inputError')[5];


// ------------------------Main--------------------------------------- 

// Display Main items Api
async function fetchByMain() {

    try {

        let response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');

        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        let mainListData = await response.json();

        displayMainList(mainListData);

    }

    catch (error) {
        console.error('This has been an error!', error)
    }

}

//Display Main items
function displayMainList(mainListData) {

    var mainRowHtml = ''

    for (var i = 0; i < mainListData.meals.length; i++) {

        mainRowHtml += `
            <div class="mainScreenItems col-md-3 position-relative overflow-hidden">

                <img src="${mainListData.meals[i].strMealThumb}" class="w-100" alt="">

                <div class="overlay d-flex align-items-center">
                    <h3 class="ms-2 text-black">${mainListData.meals[i].strMeal}</h3>
                </div>

            </div>
            `

    }

    mainSectionRow.innerHTML = mainRowHtml;

}

fetchByMain()

// ------------------------Main--------------------------------------- 


// ------------------------Search--------------------------------------- 

// Activating the "Search" nav button 
navSearchBtn.addEventListener('click', function () {
    $('.section').addClass('d-none')
    searchSection.classList.remove('d-none')
})

searchByName.addEventListener('input', function () {
    fetchByName(searchByName.value)
})

async function fetchByName(word) {

    try {

        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${word}`);

        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        let nameListData = await response.json();

        DisplayNameList(nameListData);

    }

    catch (error) {
        console.error('This has been an error!', error)
    }

}

function DisplayNameList(nameListData) {

    var searchRowHtml = ''

    for (var i = 0; i < nameListData.meals.length; i++) {

        searchRowHtml += `
            <div class="searchItems col-md-3 position-relative overflow-hidden">

                <img src="${nameListData.meals[i].strMealThumb}" class="w-100" alt="">

                <div class="overlay3 d-flex align-items-center">
                    <h3 class="ms-2 text-black">${nameListData.meals[i].strMeal}</h3>
                </div>

            </div>`

    }

    searchSectionRow.innerHTML = searchRowHtml;

}


searchByFirstLetter.addEventListener('input', function () {
    fetchByFirstLetter(searchByFirstLetter.value)
})

async function fetchByFirstLetter(letter) {

    try {

        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);

        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        let firstLetterListData = await response.json();

        DisplayfirstLetterList(firstLetterListData);

    }

    catch (error) {
        console.error('This has been an error!', error)
    }

}

function DisplayfirstLetterList(firstLetterListData) {

    var searchRowHtml = ''

    for (var i = 0; i < firstLetterListData.meals.length; i++) {

        searchRowHtml += `
            <div class="searchItems col-md-3 position-relative overflow-hidden">

                <img src="${firstLetterListData.meals[i].strMealThumb}" class="w-100" alt="">

                <div class="overlay3 d-flex align-items-center">
                    <h3 class="ms-2 text-black">${firstLetterListData.meals[i].strMeal}</h3>
                </div>

            </div>`

    }

    searchSectionRow.innerHTML = searchRowHtml;

}


// ------------------------Search--------------------------------------- 


// -----------------------Category---------------------------------------- 

// Activating the "Categories" nav button 
navCategoriesBtn.addEventListener('click', function () {
    $('.section').addClass('d-none')
    categoriesSection.classList.remove('d-none')
    fetchByCategories();
})

// Display by Categories Api
async function fetchByCategories() {

    try {

        let response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');

        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        let categoriesListData = await response.json();

        displayCategoriesList(categoriesListData);

    }

    catch (error) {
        console.error('This has been an error!', error)
    }

}

// Display Categories items
function displayCategoriesList(categoriesListData) {

    var categoriesRowHtml = ''

    for (var i = 0; i < categoriesListData.categories.length; i++) {

        categoriesRowHtml += `
            <div class="categoryItems col-md-3 position-relative p-4 overflow-hidden">

                <img src="${categoriesListData.categories[i].strCategoryThumb}" class="w-100" alt="">

                <div class="overlay2 text-black">
                    <h3 class="ms-2 pt-2 text-center">${categoriesListData.categories[i].strCategory}</h3>
                    <p class="text-black text-center p-2">${categoriesListData.categories[i].strCategoryDescription}</p>
                </div>

            </div>`

    }

    categoriesSectionRow.innerHTML = categoriesRowHtml;

}

// -----------------------Category---------------------------------------- 


// -----------------------Area---------------------------------------- 

// Activating the "Area" nav button
navAreaBtn.addEventListener('click', function () {
    $('.section').addClass('d-none')
    areaSection.classList.remove('d-none')
    fetchByArea();
})

// Display by Area Api
async function fetchByArea() {

    try {

        let response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');

        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        let areaListData = await response.json();

        displayAreaList(areaListData);

    }

    catch (error) {
        console.error('This has been an error!', error)
    }

}

// Display Area items
function displayAreaList(areaListData) {

    var areaRowHtml = ''

    for (var i = 0; i < areaListData.meals.length; i++) {

        areaRowHtml += `
        <div class="col-md-3 text-center">
            <span class="fa-solid fa-house-laptop display-4"></span>
            <h2 class="fs-3">${areaListData.meals[i].strArea}</h2>
        </div> `
    }

    areaSectionRow.innerHTML = areaRowHtml;

}


// FIXME: VARIABLE BTN
// Click on specific Area

// async function fetchBySpecificArea() {

//     let country = "american"

//     try {

//         let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${country}`);

//         if (!response.ok) {
//             throw new Error('Network response was not ok ' + response.statusText);
//         }

//         let specificAreaListData = await response.json();

//         displaySpecificAreaList(specificAreaListData);

//     }

//     catch (error) {
//         console.error('This has been an error!', error)
//     }

// }

// function displaySpecificAreaList(specificAreaListData) {

//     var areaRowHtml = ''

//     for (var i = 0; i < specificAreaListData.meals.length; i++) {

//         areaRowHtml += `
//             <div class="mainScreenItems col-md-3 position-relative overflow-hidden">

//                 <img src="${specificAreaListData.meals[i].strMealThumb}" class="w-100" alt="">

//                 <div class="overlay d-flex align-items-center">
//                     <h3 class="ms-2 text-black">${specificAreaListData.meals[i].strMeal}</h3>
//                 </div>

//             </div>
//              `
//     }

//     areaSectionRow.innerHTML = areaRowHtml;

// }

// fetchBySpecificArea()







// -----------------------Area---------------------------------------- 


// ------------------------Ingredients--------------------------------------- 

// Activating the "Ingredients" nav button 
navIngredientsBtn.addEventListener('click', function () {
    $('.section').addClass('d-none')
    ingredientsSection.classList.remove('d-none')
    fetchByIngredients();
})

// Display by Ingredients Api
async function fetchByIngredients() {

    try {

        let response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');

        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        let ingredientsListData = await response.json();

        displayIngredientsList(ingredientsListData);

    }

    catch (error) {
        console.error('This has been an error!', error)
    }

}

// Display Ingredients items
function displayIngredientsList(ingredientsListData) {

    var ingredientsRowHtml = ''

    for (var i = 0; i < 20; i++) {

        ingredientsRowHtml += `
            < div class="ingredientsItems col-md-3 text-center" >

                <span class="fa-solid fa-drumstick-bite display-4"></span>
                <h2 class="fs-3">${ingredientsListData.meals[i].strIngredient}</h2>
                <p class="fs-7">${ingredientsListData.meals[i].strDescription}</p>

            </ > `

    }

    ingredientsSectionRow.innerHTML = ingredientsRowHtml;

}

// ------------------------Ingredients--------------------------------------- 


// ------------------------Contact Us--------------------------------------- 

// Activating the "ContactUs" nav button 
navContactUsBtn.addEventListener('click', function () {
    $('.section').addClass('d-none')
    contactUsSection.classList.remove('d-none')
})

// Validate name
inputName.addEventListener('input', function () {

    regex = /^(?=.{1,25}$)[a-zA-Z]+(?: [a-zA-Z]+)?$/;


    if (regex.test(inputName.value)) {
        nameError.classList.remove('d-block')
        nameError.classList.add('d-none')
        allInputsValidation.name = true;
    }

    else {
        nameError.classList.remove('d-none')
        nameError.classList.add('d-block')
        allInputsValidation.name = false;
    }

    checkAllValidations();
})

// Validate email
inputEmail.addEventListener('input', function () {

    var regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (regex.test(inputEmail.value)) {
        emailError.classList.remove('d-block')
        emailError.classList.add('d-none')
        allInputsValidation.email = true;
    }

    else {
        emailError.classList.remove('d-none')
        emailError.classList.add('d-block')
        allInputsValidation.email = false;
    }

    checkAllValidations();
})

// Validate Phone
inputPhone.addEventListener('input', function () {

    regex = /^(00201|\+201|01)[0-2,5]{1}[0-9]{8}$/

    if (regex.test(inputPhone.value)) {
        phoneError.classList.remove('d-block')
        phoneError.classList.add('d-none')
        allInputsValidation.phone = true;
    }

    else {
        phoneError.classList.remove('d-none')
        phoneError.classList.add('d-block')
        allInputsValidation.phone = false;
    }

    checkAllValidations();
})

// Validate Age
inputAge.addEventListener('input', function () {

    regex = /^(1[0-9]|[2-9][0-9]|100)$/

    if (regex.test(inputAge.value)) {
        ageError.classList.remove('d-block')
        ageError.classList.add('d-none')
        allInputsValidation.age = true;
    }

    else {
        ageError.classList.remove('d-none')
        ageError.classList.add('d-block')
        allInputsValidation.age = false;
    }

    checkAllValidations();
})

// Validate Password
inputPassword.addEventListener('input', function () {

    regex = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/;

    if (regex.test(inputPassword.value)) {
        passwordError.classList.remove('d-block')
        passwordError.classList.add('d-none')
        allInputsValidation.password = true;
    }

    else {
        passwordError.classList.remove('d-none')
        passwordError.classList.add('d-block')
        allInputsValidation.password = false;
    }

    checkAllValidations();
})

// Validate rePassword
inputRePassword.addEventListener('input', function () {

    regex = inputPassword.value

    if (inputRePassword.value == regex) {
        rePasswordError.classList.remove('d-block')
        rePasswordError.classList.add('d-none')
        allInputsValidation.rePassword = true;
    }

    else {
        rePasswordError.classList.remove('d-none')
        rePasswordError.classList.add('d-block')
        allInputsValidation.rePassword = false;
    }

    checkAllValidations();
})

function checkAllValidations() {
    var allValid = Object.values(allInputsValidation).every(Boolean);

    if (allValid) {
        $('#ContactUsSection .btn').removeClass('disabled')
    }
    else {
        $('#ContactUsSection .btn').addClass('disabled')
    }
}

// ------------------------Contact Us--------------------------------------- 


// ------------------------Nav--------------------------------------- 

// Sliding Nav bar effect
$('.sideNav .sideBtn i').on('click', function () {

    // Icon Alternating
    $('.sideBtn .fa-bars').toggleClass('d-none')
    $('.sideBtn .fa-x').toggleClass('d-none')


    $('.sideNav .sideMenu').toggleClass('active');

    // Move to the left
    if ($('.sideNav .sideMenu').hasClass('active')) {
        $('.sideNav .sideBtn').css('transform', 'translateX(' + $('.sideNav .sideMenu').outerWidth(true) + 'px)');

        for (let i = 0; i < 5; i++) {

            $(".sideMenu h5").eq(i).animate({
                top: 0
            }, (i + 5) * 100)
        }
    }

    // move to the right
    else {
        $('.sideNav .sideBtn').css('transform', 'translateX(0)');

        $(".sideMenu h5").animate({
            top: 300
        }, 500)

    }

});

$(document).on('click', '.sideMenu h5', function () {
    $('.sideNav .sideMenu').removeClass('active');
    $('.sideNav .sideBtn').css('transform', 'translateX(0)');
});



// ------------------------Nav---------------------------------------


// $(function () {
//     $('.loader').fadeOut(1500)
//     $('body').css({ overflow: 'auto' })
// })

// $(function () {
//     $('loader')
//         .fadeOut(1500)
//         $('body').css({ overflow: 'auto' })
// })



var menu = document.querySelector('.sideBtn')
var flag = true
menu.addEventListener('click', function () {

    if (flag) {

        flag = false
    }

    if (!flag) {

        flag = true
    }



})
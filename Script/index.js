// Main Section variables
var mainSectionRow = document.querySelector('#MainSection .row')
var mainSectionRowItems = document.querySelector('#MainSection .row .mainScreenItems')

// Meal Details variable
var mealSection = document.querySelector('#MealDetails');
var mealSectionRow = document.querySelector('#MealDetails .row')

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

        $('.loader').show();

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

    finally {
        $('.loader').fadeOut(1000, function() {
            $('body').css({overflow: 'auto'});
        });
    }

}

//Display Main items
function displayMainList(mainListData) {

    var mainRowHtml = ''

    for (var i = 0; i < mainListData.meals.length; i++) {

        mainRowHtml += `
            <div class="mainScreenItems col-md-3 position-relative overflow-hidden" id="${mainListData.meals[i].idMeal}">

                <img src="${mainListData.meals[i].strMealThumb}" class="w-100" alt="">

                <div class="overlay d-flex align-items-center">
                    <h3 class="ms-2 text-black">${mainListData.meals[i].strMeal}</h3>
                </div>

            </div>
            `

    }

    mainSectionRow.innerHTML = mainRowHtml;

    // Clicking on meal
    $('.mainScreenItems').on('click', function () {
        var ID = $(this).attr('id');
        fetchByMealID(ID)
    })


}

fetchByMain()

// ------------------------Main--------------------------------------- 


// ------------------------Meal details--------------------------------------- 

async function fetchByMealID(ID) {

    try {

        $('.loader').show();

        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${ID}`);

        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        let mealIDData = await response.json();

        DisplayMeal(mealIDData);

    }

    catch (error) {
        console.error('This has been an error!', error)
    }

    finally {
        $('.loader').fadeOut(1000, function() {
            $('body').css({overflow: 'auto'});
        });
    }

}

function DisplayMeal(mealIDData) {

    $('.section').addClass('d-none')
    mealSection.classList.remove('d-none')

    var recipeTagsHTML = ''
    for (let i = 1; i <= 20; i++) {

        let ingredient = mealIDData.meals[0][`strIngredient${i}`];
        let measure = mealIDData.meals[0][`strMeasure${i}`];

        if (ingredient != null && ingredient != "") {
            recipeTagsHTML += `
                    <span class="badge py-2 my-2 fw-medium ms-3 text-Clr1 bg-Clr1">${measure} ${ingredient}</span>`
        }

    }

    var tagsHTML = ""
    if (mealIDData.meals[0].strTags != null) {
        var words = mealIDData.meals[0].strTags.split(',');

        for (var j = 0; j < words.length; j++) {
            tagsHTML += `
            <span class="badge py-2 fw-medium ms-2 text-Clr2 bg-Clr2">${words[j]}</span>`
        }
    }

    var mealRowHtml = `
            <div class="col-md-4">
                <img src="${mealIDData.meals[0].strMealThumb}" class="w-100 rounded-4" alt="">
                <h3>${mealIDData.meals[0].strMeal}</h3>
            </div> 
    
            <div class="col-md-8">
                <h2>Instructions</h2>
                <p class="fs-7">${mealIDData.meals[0].strInstructions}</p>
                
                <h4><span class="fw-bold">Area : </span>${mealIDData.meals[0].strArea}</h4>
                <h4><span class="fw-bold">Category : </span>${mealIDData.meals[0].strCategory}</h4>
                <h4>Recipes : </h4>
                
                <div class="d-flex flex-wrap align-items-center py-3">
                ${recipeTagsHTML}
                </div>

                <div>
                    <h4 class="mb-3">Tags :</h4>
                    ${tagsHTML}
                </div>

                <div class="d-flex align-items-center py-4">
                <a href="${mealIDData.meals[0].strSource}"
                class="btn btn-success py-1">Source</a>
                    <a href="${mealIDData.meals[0].strYoutube}" class="btn btn-danger py-1 ms-1">YouTube</a>
                </div>
                
                </div>
                `
    mealSectionRow.innerHTML = mealRowHtml;

}

// ------------------------Meal details--------------------------------------- 


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

        $('.loader').show();

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

    finally {
        $('.loader').fadeOut(1000, function() {
            $('body').css({overflow: 'auto'});
        });
    }

}

function DisplayNameList(nameListData) {

    var searchRowHtml = ''

    for (var i = 0; i < nameListData.meals.length; i++) {

        searchRowHtml += `
            <div class="searchItems col-md-3 position-relative overflow-hidden" id="${nameListData.meals[i].idMeal}">

                <img src="${nameListData.meals[i].strMealThumb}" class="w-100" alt="">

                <div class="overlay3 d-flex align-items-center">
                    <h3 class="ms-2 text-black">${nameListData.meals[i].strMeal}</h3>
                </div>

            </div>`

    }

    searchSectionRow.innerHTML = searchRowHtml;

    // Clicking on meal
    $('.searchItems').on('click', function () {
        var ID = $(this).attr('id');
        fetchByMealID(ID)
    })

}

searchByFirstLetter.addEventListener('input', function () {
    fetchByFirstLetter(searchByFirstLetter.value)
})

async function fetchByFirstLetter(letter) {

    try {

        $('.loader').show();

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

    finally {
        $('.loader').fadeOut(1000, function() {
            $('body').css({overflow: 'auto'});
        });
    }

}

function DisplayfirstLetterList(firstLetterListData) {

    var searchRowHtml = ''

    for (var i = 0; i < firstLetterListData.meals.length; i++) {

        searchRowHtml += `
            <div class="searchItems col-md-3 position-relative overflow-hidden" id="${firstLetterListData.meals[i].idMeal}">

                <img src="${firstLetterListData.meals[i].strMealThumb}" class="w-100" alt="">

                <div class="overlay3 d-flex align-items-center">
                    <h3 class="ms-2 text-black">${firstLetterListData.meals[i].strMeal}</h3>
                </div>

            </div>`

    }

    searchSectionRow.innerHTML = searchRowHtml;

    // Clicking on meal
    $('.searchItems').on('click', function () {
        var ID = $(this).attr('id');
        fetchByMealID(ID)
    })

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

        $('.loader').show();

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

    finally {
        $('.loader').fadeOut(1000, function() {
            $('body').css({overflow: 'auto'});
        });
    }

}

function displayCategoriesList(categoriesListData) {

    var categoriesRowHtml = ''

    for (var i = 0; i < categoriesListData.categories.length; i++) {

        categoriesRowHtml += `
            <div class="categoryItems col-md-3 position-relative p-4 overflow-hidden" id="${categoriesListData.categories[i].idCategory}">

                <img src="${categoriesListData.categories[i].strCategoryThumb}" class="w-100" alt="">

                <div class="overlay2 text-black">
                    <h3 class="ms-2 pt-2 text-center">${categoriesListData.categories[i].strCategory}</h3>
                    <p class="text-black text-center p-2">${categoriesListData.categories[i].strCategoryDescription}</p>
                </div>

            </div>`

    }

    categoriesSectionRow.innerHTML = categoriesRowHtml;

    // Clicking on Category
    $('.categoryItems').on('click', function () {
        var categoryType = $(this).find('h3').text();
        fetchMealsByCategory(categoryType)
    })


}

async function fetchMealsByCategory(categoryType) {

    try {

        $('.loader').show();

        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryType}`);

        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        let mealCategoryData = await response.json();

        DisplayCategoryMeals(mealCategoryData);

    }

    catch (error) {
        console.error('This has been an error!', error)
    }

    finally {
        $('.loader').fadeOut(1000, function() {
            $('body').css({overflow: 'auto'});
        });;
    }
}

function DisplayCategoryMeals(mealCategoryData) {

    var categoriesRowHtml = ''

    for (var i = 0; i < mealCategoryData.meals.length; i++) {

        categoriesRowHtml += `
            <div class="mainScreenItems col-md-3 position-relative overflow-hidden" id="${mealCategoryData.meals[i].idMeal}">

                <img src="${mealCategoryData.meals[i].strMealThumb}" class="w-100" alt="">

                <div class="overlay d-flex align-items-center">
                    <h3 class="ms-2 text-black">${mealCategoryData.meals[i].strMeal}</h3>
                </div>

            </div>
            `

    }

    categoriesSectionRow.innerHTML = categoriesRowHtml;

    // Clicking on meal
    $('.mainScreenItems').on('click', function () {
        var ID = $(this).attr('id');
        fetchByMealID(ID)
    })


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

        $('.loader').show();

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

    finally {
        $('.loader').fadeOut(1000, function() {
            $('body').css({overflow: 'auto'});
        });
    }

}

// Display Area items
function displayAreaList(areaListData) {

    var areaRowHtml = ''

    for (var i = 0; i < areaListData.meals.length; i++) {

        areaRowHtml += `
        <div class="areaItems col-md-3 text-center" id="${areaListData.meals[i].strArea}">
            <span class="fa-solid fa-house-laptop display-4"></span>
            <h2 class="fs-3">${areaListData.meals[i].strArea}</h2>
        </div> `
    }

    areaSectionRow.innerHTML = areaRowHtml;

    // Clicking on Area
    $('.areaItems').on('click', function () {
        var areaType = $(this).find('h2').text();
        fetchMealsByArea(areaType)
    })

}

async function fetchMealsByArea(areaType) {

    try {

        $('.loader').show();

        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${areaType}`);

        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        let mealAreaData = await response.json();

        DisplayAreaMeals(mealAreaData);

    }

    catch (error) {
        console.error('This has been an error!', error)
    }

    finally {
        $('.loader').fadeOut(1000, function() {
            $('body').css({overflow: 'auto'});
        });
    }
}

function DisplayAreaMeals(mealAreaData) {

    var areaRowHtml = ''

    for (var i = 0; i < mealAreaData.meals.length; i++) {

        areaRowHtml += `
            <div class="mainScreenItems col-md-3 position-relative overflow-hidden" id="${mealAreaData.meals[i].idMeal}">

                <img src="${mealAreaData.meals[i].strMealThumb}" class="w-100" alt="">

                <div class="overlay d-flex align-items-center">
                    <h3 class="ms-2 text-black">${mealAreaData.meals[i].strMeal}</h3>
                </div>

            </div>
            `

    }

    areaSectionRow.innerHTML = areaRowHtml;

    // Clicking on meal
    $('.mainScreenItems').on('click', function () {
        var ID = $(this).attr('id');
        fetchByMealID(ID)
    })


}

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

        $('.loader').show();

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

    finally {
        $('.loader').fadeOut(1000, function() {
            $('body').css({overflow: 'auto'});
        });
    }
}

// Display Ingredients items
function displayIngredientsList(ingredientsListData) {

    var ingredientsRowHtml = ''

    for (var i = 0; i < 20; i++) {

        ingredientsRowHtml += `
            <div class="ingredientsItems col-md-3 text-center" id="${ingredientsListData.meals[i].idIngredient}">

                <span class="fa-solid fa-drumstick-bite display-4"></span>
                <h2 class="fs-3">${ingredientsListData.meals[i].strIngredient}</h2>
                <p class="fs-7">${ingredientsListData.meals[i].strDescription}</p>

            </div> `

    }

    ingredientsSectionRow.innerHTML = ingredientsRowHtml;

    // Clicking on Ingredient
    $('.ingredientsItems').on('click', function () {
        var ingredientType = $(this).find('h2').text();
        fetchMealsByingredients(ingredientType)
    })

}

async function fetchMealsByingredients(ingredientType) {

    try {

        $('.loader').show();

        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredientType}`);

        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        let mealIngredientData = await response.json();

        DisplayIngredientMeals(mealIngredientData);

    }

    catch (error) {
        console.error('This has been an error!', error)
    }

    finally {
        $('.loader').fadeOut(1000, function() {
            $('body').css({overflow: 'auto'});
        });
    }
}

function DisplayIngredientMeals(mealAreaData) {

    var ingredientsRowHtml = ''

    for (var i = 0; i < mealAreaData.meals.length; i++) {

        ingredientsRowHtml += `
            <div class="mainScreenItems col-md-3 position-relative overflow-hidden" id="${mealAreaData.meals[i].idMeal}">

                <img src="${mealAreaData.meals[i].strMealThumb}" class="w-100" alt="">

                <div class="overlay d-flex align-items-center">
                    <h3 class="ms-2 text-black">${mealAreaData.meals[i].strMeal}</h3>
                </div>

            </div>
            `

    }

    ingredientsSectionRow.innerHTML = ingredientsRowHtml;

    // Clicking on meal
    $('.mainScreenItems').on('click', function () {
        var ID = $(this).attr('id');
        fetchByMealID(ID)
    })


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

    toggleIcons()

    $('.sideNav .sideMenu').toggleClass('active');

    // Move to the left
    if ($('.sideNav .sideMenu').hasClass('active')) {

        $('.sideNav .sideBtn').css('transform', 'translateX(' + $('.sideNav .sideMenu').outerWidth(true) + 'px)');
        slideTop()

    }

    // move to the right
    else {

        $('.sideNav .sideBtn').css('transform', 'translateX(0)');
        slideBot()

    }

});

// Clicking on headers
$('.sideMenu h5').on('click', function () {

    $('.sideNav .sideMenu').removeClass('active');
    $('.sideNav .sideBtn').css('transform', 'translateX(0)');

    toggleIcons()

    // Move to the left
    if ($('.sideNav .sideMenu').hasClass('active')) {
        slideTop()
    }

    // move to the right
    else {
        slideBot()
    }

});

function toggleIcons() {
    $('.sideBtn .fa-bars').toggleClass('d-none')
    $('.sideBtn .fa-x').toggleClass('d-none')
}

function slideTop() {
    for (let i = 0; i < 5; i++) {

        $(".sideMenu h5").eq(i).animate({
            top: 0
        }, (i + 5) * 100)
    }
}

function slideBot() {
    $(".sideMenu h5").animate({
        top: 300
    }, 500)
}

// ------------------------Nav---------------------------------------
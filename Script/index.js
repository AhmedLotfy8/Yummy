// Search Section variables
var searchSection = document.querySelector('#SearchSection');
var navSearchBtn = document.querySelectorAll('.sideMenu h5')[0];

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


// ------------------------Search--------------------------------------- 

// Activating the "Search" nav button 
navSearchBtn.addEventListener('click', function () {
    $('.section').addClass('d-none')
    searchSection.classList.remove('d-none')
})

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

    console.log(ingredientsListData.meals[0]);

    for (var i = 0; i < 20; i++) {

        ingredientsRowHtml += `            
            <div class="ingredientsItems col-md-3 text-center">

                <span class="fa-solid fa-drumstick-bite display-4"></span>
                <h2 class="fs-3">${ingredientsListData.meals[i].strIngredient}</h2>
                <p class="fs-7">${ingredientsListData.meals[i].strDescription}</p>

            </div>`

    }

    ingredientsSectionRow.innerHTML = ingredientsRowHtml;

}

fetchByIngredients()

// ------------------------Ingredients--------------------------------------- 


// ------------------------Contact Us--------------------------------------- 

// Activating the "ContactUs" nav button 
navContactUsBtn.addEventListener('click', function () {
    $('.section').addClass('d-none')
    contactUsSection.classList.remove('d-none')
})

// ------------------------Contact Us--------------------------------------- 


// Sliding Nav bar effect
var sideMenuWidth = $('.sideNav .sideMenu').outerWidth(true);
$('.sideNav .sideBtn i').on('click', function () {
    $('.sideNav .sideMenu').toggleClass('active');

    if ($('.sideNav .sideMenu').hasClass('active')) {
        $('.sideNav .sideBtn').css('transform', 'translateX(' + sideMenuWidth + 'px)');
    }

    else {
        $('.sideNav .sideBtn').css('transform', 'translateX(0)');
    }

});

$(document).on('click', '.sideMenu h5', function() {
    $('.sideNav .sideMenu').removeClass('active');
    $('.sideNav .sideBtn').css('transform', 'translateX(0)');
});

// Icon Alternating

$('.sideNav .sideBtn i').on('click', function () {

    $('.sideBtn .fa-bars').toggleClass('d-none')
    $('.sideBtn .fa-x').toggleClass('d-none')

})


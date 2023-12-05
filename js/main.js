/* select category from menu */

function selectCategory() {
    const category = document.getElementById('category').value;

    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    .then(response => response.json())
    .then(data => {
        const recipes = data.meals;
        if (recipes) {
            const randomOrder = Math.floor(Math.random() * recipes.length);
            const randomRecipe = recipes[randomOrder].idMeal;
            displayRecipe(randomRecipe);
        } else {
            document.getElementById('recipe-display').innerHTML = '<p>Sorry! There are no available recipes for this category.</p>';
        }
    })
    .catch(error =>
        console.error('There has been an error on getting recipe data.', error));
}

/* display random recipe */

function displayRecipe(recipeId) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`)
    .then(response => response.json())
    .then(data => {
        const recipe = data.meals[0];
        const recipeDisplay = document.getElementById('recipe-display');
        recipeDisplay.innerHTML = `
        <h2>${recipe.strMeal}</h2>
        <div class="recipe-flex">
        <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}">
        <div class="recipe-block">
        <h3>Ingredients</h3>
        <ul>${displayIngredients(recipe)}</ul>
        </div>
        </div>
        <h3>Instructions</h3>
        <p class="instructions">${recipe.strInstructions}</p>`;
    })
    .catch(error => 
        console.error('There has been an error on getting recipe data.', error));
}

/* display ingredients for generated recipe */

function displayIngredients(recipe) {
    let ingredientsList = '';
    for (let i = 1; i <= 20; i++) {
        const ingredient = recipe[`strIngredient${i}`];
        const measure = recipe[`strMeasure${i}`];
        if (ingredient && measure) {
            ingredientsList += `<li>${measure} ${ingredient}</li>`;
        }
    }
    return ingredientsList;
}
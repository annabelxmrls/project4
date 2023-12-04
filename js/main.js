/* select category from menu */

function selectCategory() {
    const category = document.getElementById('category').value;

    fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}')
    .then(response => response.json())
    .then(data => {
        const recipes = data.meals;
        if (recipes) {
            const randomOrder = Math.floor(Math.random() * recipes.length);
            const randomRecipe = recipes[randomOrder].idMeal;
            displayRecipe(randomRecipe);
        } else {
            document.getElementById('category-container').innerHTML = '<p>Sorry! There are no available recipes for this category.</p>';
        }
    })
    .catch(error => {
        console.error('There has been an error on getting recipe data.')
    })
}

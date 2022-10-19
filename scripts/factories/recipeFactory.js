import { recipes } from "../data/recipes.js";

const recipeFactory = recipe => {
    //Create recipe constant using destructuring assignment syntax
    const {
        id,
        name,
        servings,
        ingredients: [...ingredients],
        time,
        description,
        appliance,
        utensils: [...utensils]
    } = recipe;

    const clockIconSource = `assets/clock_icon.svg`;

    //Create recipe cards
    const recipeCardDOM = () => {
        //Create recipe card elements
        const recipeArticle = document.createElement("article");
        const recipeArticleImage = document.createElement("div");
        const recipeArticleContainer = document.createElement("div");
        const recipeArticleHeader = document.createElement("div");
        const recipeArticleBody = document.createElement("div");
        const recipeName = document.createElement("h2");
        const recipeTime = document.createElement("span");
        const recipeIngredientsList = document.createElement("ul");
        const recipeDescriptionContainer = document.createElement("div");
        const recipeDescription = document.createElement("p");

        //Create clock icon and set its attributes
        const clockIcon = document.createElement("img");
        clockIcon.setAttribute("src", clockIconSource);
        clockIcon.setAttribute("alt", "temps");
        clockIcon.setAttribute("width", "20");
        clockIcon.setAttribute("height", "20");
        
        //Set text content for recipe name, time, and description
        recipeName.textContent = name;
        recipeTime.textContent = `${time} min`;
        recipeDescription.textContent = description;

        //Set datasets for recipe card contents - for use in JS and CSS
        recipeArticle.dataset.recipeArticle = name;
        recipeArticle.dataset.recipeArticleAppliance = appliance;
        recipeArticleImage.dataset.recipeImage = "";
        recipeArticleContainer.dataset.recipeContainer = "";
        recipeArticleHeader.dataset.recipeHeader = "";
        recipeArticleBody.dataset.recipeBody = "";
        recipeName.dataset.recipeName = name;
        recipeTime.dataset.recipeTime = time;
        recipeIngredientsList.dataset.recipeIngredientsList = "";
        recipeDescription.dataset.recipeDescription = "";

        //For each ingredient object in [ingredients]
        ingredients.forEach(ingredient => {
            //Set variables for the values of each ingredient name, quanity, and unit
            let ingredientNameValue = ingredient.ingredient;
            let ingredientQuantityValue = ingredient.quantity;
            let ingredientUnitValue = ingredient.unit;

            //Create ingredient list item elements
            let recipeIngredientName = document.createElement("span");
            let recipeIngredientQuantity = document.createElement("span");
            let recipeIngredientUnit = document.createElement("span");

            //Set datasets for ingredient list item elements
            recipeIngredientName.dataset.recipeIngredient = ingredientNameValue;
            recipeIngredientQuantity.dataset.recipeQuantity = ingredientQuantityValue;
            recipeIngredientUnit.dataset.recipeUnit = ingredientUnitValue;

            //If an ingredient does not have a quantity, set the quantity value to an empty string
            if (ingredientQuantityValue === undefined) {
                ingredientQuantityValue = ``;
                recipeIngredientQuantity.dataset.recipeQuantity = "undefined";
            } else {
                recipeIngredientName.dataset.recipeIngredientHasQuantity = "yes";
            }

            //If an ingredient does not have a unit, set the unit value to an empty string
            if (ingredientUnitValue === undefined) {
                ingredientUnitValue = ``;
                recipeIngredientUnit.dataset.recipeUnit = "undefined";
            }

            //If there is only one of a certain ingredient, use slice to make its unit singular
            if (ingredientQuantityValue < 2){
                let lastCharacter = ingredientUnitValue.charAt(ingredientUnitValue.length - 1);
                if (lastCharacter === "s"){
                    let withoutLastCharacter = ingredientUnitValue.slice(0, -1);
                    ingredientUnitValue = withoutLastCharacter;
                };
            }

            //If the ingredient does not have an abbreviation as its unit, set a unique dataset for CSS
            if (ingredientUnitValue.length > 2){
                recipeIngredientUnit.dataset.recipeUnitAbbreviated = "no";
            }

            //Set text content for each ingredient name, quantity, and unit
            recipeIngredientName.textContent = ingredientNameValue;
            recipeIngredientQuantity.textContent = ingredientQuantityValue;
            recipeIngredientUnit.textContent = ingredientUnitValue;
            
            //Create list elements for each ingredient
            const recipeIngredientsListItem = document.createElement("li");
            recipeIngredientsListItem.dataset.recipeIngredientsListItem = "";

            //Append ingredient list child elements to their parent elements
            recipeIngredientsListItem.append(recipeIngredientName, recipeIngredientQuantity, recipeIngredientUnit);
            recipeIngredientsList.append(recipeIngredientsListItem);
        })
        
        //Append article child elements to their parent elements
        recipeArticleHeader.append(recipeName, clockIcon, recipeTime);
        recipeDescriptionContainer.append(recipeDescription);
        recipeArticleBody.append(recipeIngredientsList, recipeDescriptionContainer);
        recipeArticleContainer.append(recipeArticleHeader, recipeArticleBody);
        recipeArticle.append(recipeArticleImage, recipeArticleContainer);

        return(recipeArticle);
    }

    return {
        id, name, servings, ingredients: [], time, description, appliance, utensils: [], recipeCardDOM
    };
};

export {recipes, recipeFactory};

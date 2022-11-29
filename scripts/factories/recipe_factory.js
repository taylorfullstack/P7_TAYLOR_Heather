import { recipes } from "../data/recipes.js";

	const {id, name, servings, ingredients, time, description, appliance, utensils} = recipe;
	const clockIconSource = "assets/clock_icon.svg";
	const utensilsArray = [];
	const ingredientsArray = [];
        
        //Set recipe utensils data
        utensils.forEach(utensil => {
            utensilsData.push(utensil.toLowerCase());
            recipeArticle.dataset.recipeArticleUtensils = utensilsData;
        })

        //For each ingredient object in [ingredients]
        ingredients.forEach(ingredient => {
            //Set variables for the values of each ingredient name, quanity, and unit
            let ingredientNameValue = ingredient.ingredient;
            let ingredientQuantityValue = ingredient.quantity;
            let ingredientUnitValue = ingredient.unit;

            //Set recipe ingredient data
            ingredientsData.push(ingredientNameValue.toLowerCase());
            recipeArticle.dataset.recipeArticleIngredients = ingredientsData;

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

        //Add .found class to articles by default
        recipeArticle.classList.add("found");
        return(recipeArticle);
    }

	return {
		id, name, servings, time, description, appliance, utensilsArray, ingredientsArray, recipeCardDOM
	};
};

export {recipes, recipeFactory};

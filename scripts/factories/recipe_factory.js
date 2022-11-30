
export const recipeFactory = (recipe) => {
	const {id, name, servings, ingredients, time, description, appliance, utensils} = recipe;
	const clockIconSource = "assets/clock_icon.svg";
	const utensilsArray = [];
	const ingredientsArray = [];
	
	const recipeCardDOM = () => { //Create recipe articles
		const article = createElement("article", '', 'recipeArticle', name.toLowerCase());
		const recipeArticleImage = createElement("div", '', 'recipeImage', "");
		const recipeArticleContainer = createElement("div", '', 'recipeContainer', "");
		const recipeArticleHeader = createElement("div", '', 'recipeHeader', "");
		const recipeArticleBody = createElement("div", '', 'recipeBody', "");
		const recipeName = createElement("h2", name, 'recipeName', name);
		const recipeTime = createElement("span", `${time} min`, 'recipeTime', time);
		const recipeIngredientsList = createElement("ul", '', 'recipeIngredientsList', "");
		const recipeDescriptionContainer = document.createElement("div");
		const recipeDescription = createElement("p", description, 'recipeDescription', "");
		const clockIcon = document.createElement("img");
		clockIcon.src = clockIconSource;
		clockIcon.alt = "temps";
		clockIcon.width = 20;
		clockIcon.height = 20;
        
		//Array to hold datasets for ingredients and utensils
		const ingredientsData = [];
		const utensilsData = [];
        
		//Set recipe utensils data
		utensils.forEach(utensil => {
			utensilsArray.push(utensil.charAt(0).toUpperCase() + utensil.slice(1).toLowerCase());
			utensilsData.push(utensil.toLowerCase());
		})
		
		//For each ingredient object in [ingredients]
		ingredients.forEach(ingredient => {
			//Set variables for the values of each ingredient name, quanity, and unit
			let ingredientNameValue = ingredient.ingredient;
			let ingredientQuantityValue = ingredient.quantity;
			let ingredientUnitValue = ingredient.unit;

			ingredientNameValue = ingredientNameValue.charAt(0).toUpperCase() + ingredientNameValue.slice(1);
            ingredientsArray.push(ingredientNameValue);
			ingredientsData.push(ingredientNameValue.toLowerCase());
			
			//Create ingredient list item elements
			const recipeIngredientName = createElement("span", ingredientNameValue, 'recipeIngredient', ingredientNameValue);
			const recipeIngredientQuantity = createElement("span", ingredientQuantityValue, 'recipeQuantity', ingredientQuantityValue);
			const recipeIngredientUnit = createElement("span", ingredientUnitValue, 'recipeUnit', ingredientUnitValue);

			//If an ingredient does not have a quantity, set the quantity value to an empty string
			if (ingredientQuantityValue === undefined) {
				ingredientQuantityValue = "";
				recipeIngredientQuantity.dataset.recipeQuantity = "undefined";
			} else {
				recipeIngredientName.dataset.recipeIngredientHasQuantity = "yes";
			}

			//If an ingredient does not have a unit, set the unit value to an empty string
			if (ingredientUnitValue === undefined) {
				ingredientUnitValue = "";
				recipeIngredientUnit.dataset.recipeUnit = "undefined";
			}

			//If there is only one of a certain ingredient, use slice to make its unit singular
			if (ingredientQuantityValue < 2){
				let lastCharacter = ingredientUnitValue.charAt(ingredientUnitValue.length - 1);
				if (lastCharacter === "s"){
					let withoutLastCharacter = ingredientUnitValue.slice(0, -1);
					ingredientUnitValue = withoutLastCharacter;
				}
			}

			//If the ingredient does not have an abbreviation as its unit, set a unique dataset for CSS
			if (ingredientUnitValue.length > 2){
				recipeIngredientUnit.dataset.recipeUnitAbbreviated = "no";
			}

			//Create list elements for each ingredient
			const recipeIngredientsListItem = createElement("li", '', 'recipeIngredientsListItem', "");
			recipeIngredientsListItem.append(recipeIngredientName, recipeIngredientQuantity, recipeIngredientUnit);
			recipeIngredientsList.append(recipeIngredientsListItem);
		})

		//Add additional datasets and default class to article
        article.dataset.recipeAppliance = appliance.toLowerCase();
		article.dataset.recipeUtensils = utensilsData;
		article.dataset.recipeIngredients = ingredientsData;
		article.classList.add("found");

		//Append article child elements to their parent elements
		recipeArticleHeader.append(recipeName, clockIcon, recipeTime);
		recipeDescriptionContainer.append(recipeDescription);
		recipeArticleBody.append(recipeIngredientsList, recipeDescriptionContainer);
		recipeArticleContainer.append(recipeArticleHeader, recipeArticleBody);
		article.append(recipeArticleImage, recipeArticleContainer);

		return(article);
	}

	return {
		id, name, servings, time, description, appliance, utensilsArray, ingredientsArray, recipeCardDOM
	};
};

//Factory function to create elements
function createElement(type, text, datasetName, datasetValue){
	const element = document.createElement(type);
	if(text !== ''){element.textContent = text;}
	element.dataset[datasetName] = datasetValue;
	return element
}

export const recipeFactory = (recipe) => {
	const {id, name, servings, ingredients, time, description, appliance, utensils} = recipe;
	const clockIconSource = "assets/clock_icon.svg";
	const placeholderImageSource = "assets/lespetitsplats_logo.svg";
	const utensilsArray = [];
	const ingredientsArray = [];

	const recipeCardDOM = () => {
		//Set recipe utensils data
		utensils.forEach(utensil => {
			utensilsArray.push(utensil.charAt(0).toUpperCase() + utensil.slice(1).toLowerCase());
		})

		const utensilsData = utensilsArray.map(utensil => utensil.toLowerCase());

		const recipeIngredientsList = createElement("ul", {class: "ingredientsList"});
		//For each ingredient object in [ingredients]
		ingredients.forEach(ingredient => {
			//Set variables for the values of each ingredient name, quanity, and unit
			let ingredientNameValue = ingredient.ingredient;
			let ingredientQuantityValue = ingredient.quantity;
			let ingredientUnitValue = ingredient.unit;

			ingredientNameValue = ingredientNameValue.charAt(0).toUpperCase() + ingredientNameValue.slice(1);
			ingredientsArray.push(ingredientNameValue);

			//If there is only one of a certain ingredient, use slice to make its unit singular
			if (ingredientQuantityValue !== undefined && ingredientQuantityValue < 2 && ingredientUnitValue !== undefined){
				let lastCharacter = ingredientUnitValue.charAt(ingredientUnitValue.length - 1);
				if (lastCharacter === "s"){
					let withoutLastCharacter = ingredientUnitValue.slice(0, -1);
					ingredientUnitValue = withoutLastCharacter;
				}
			}

			//Create ingredient list item elements
			let recipeIngredientsListItem;
			const name = createElement("span", {"data-recipe-ingredient": ingredientNameValue}, ingredientNameValue);

			if (ingredientQuantityValue === undefined){
				recipeIngredientsListItem = createElement("li", {class: "ingredientsListItem"});
				recipeIngredientsListItem.prepend(name);
			}

			if (ingredientQuantityValue !== undefined && ingredientUnitValue == undefined){
				recipeIngredientsListItem = createElement("li", {class: "ingredientsListItem"}, `: ${ingredientQuantityValue}`);
				recipeIngredientsListItem.prepend(name);
			}
			
			if (ingredientQuantityValue !== undefined && ingredientUnitValue !== undefined){
				recipeIngredientsListItem = createElement("li", {class: "ingredientsListItem"}, `: ${ingredientQuantityValue} ${ingredientUnitValue}`);
				recipeIngredientsListItem.prepend(name);
			}

			recipeIngredientsListItem.setAttribute("itemprop", "recipeIngredient");
			recipeIngredientsList.append(recipeIngredientsListItem);
		})

		const ingredientsData = ingredientsArray.map(ingredient => ingredient.toLowerCase());

		//Create recipe articles
		const article = createElement("article", 
		{
			itemscope: '',
			itemtype: "https://schema.org/Recipe",
			class: "found",
			'data-recipe-article': name.toLowerCase(), 
			'data-recipe-appliance': appliance.toLowerCase(),
			'data-recipe-utensils': utensilsData,
			'data-recipe-ingredients': ingredientsData,
		});

		const recipeServings = createElement("meta", {itemprop: "recipeYield", content: servings});
		const recipeAppliance = createElement("meta", {itemprop: "tool", content: appliance.toLowerCase()});
		const recipeImageContainer = createElement("div", {class: "recipe__image"});
		const recipeImage = createElement("img", {src: placeholderImageSource, alt: "placeholderImage", "aria-hidden": "true", itemprop: "image", width: 50, height: 50});
		const recipeTextContainer = createElement("div", {class: "recipe__container"});
		const recipeHeader = createElement("div", {class: "recipe__header"});
		const recipeName = createElement("h2", {itemprop: "name"}, name);
		const clockIcon = createElement("img", {width: 20, height: 20, src: clockIconSource, alt: "temps"});
		const recipeTime = createElement("time", {datetime: `PT${time}M`, itemprop: "totalTime" }, `${time} min`);
		const recipeBody = createElement("div", {class: "recipe__body"});
		const recipeDescriptionContainer = document.createElement("div");
		const recipeDescription = createElement("p", {itemprop: "recipeInstructions"}, description);

		utensilsData.forEach(utensil => {
			const recipeUtensil = createElement("meta", {itemprop: "tool", content: utensil});
			article.append(recipeUtensil);
		})

		//Append article child elements to their parent elements
		recipeHeader.append(recipeName, clockIcon, recipeTime);
		recipeDescriptionContainer.append(recipeDescription);
		recipeBody.append(recipeIngredientsList, recipeDescriptionContainer);
		recipeImageContainer.append(recipeImage);
		recipeTextContainer.append(recipeHeader, recipeBody);
		article.append(recipeAppliance, recipeServings, recipeImageContainer, recipeTextContainer);

		const searchData = {
			name: name, ingredients: ingredientsArray, description: description, appliance: appliance, utensils: utensilsArray
		}

		return{article, searchData};
	}

	return {id, recipeCardDOM};
};

//Factory function to create elements
function createElement(type, attributes, text){
	const element = document.createElement(type);

	for(const attribute in attributes) {element.setAttribute(attribute, attributes[attribute]);}
	if(text !== undefined){element.textContent = text;}

	return element
}

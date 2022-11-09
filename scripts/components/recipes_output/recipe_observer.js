import { ingredientsList, appliancesList, utensilsList, applianceLabel, utensilLabel, ingredientLabel } from "../../factories/dropdown_factory.js";
import { classMutationConfiguration } from "../../helpers/mutation_observer_configuration.js";

const noRecipes = document.getElementById("noRecipes");
//RecipesOutput Mutation Observer
const recipesOutputMutant = document.querySelector("#recipesOutput");
const recipesOutputMutationObserver = new MutationObserver(_mutations => {

    //Node List of found articles (display: flex;)
    const foundCollection = document.querySelectorAll(".found"); //console.log(foundCollection);
    
    //Call the function to display a message if no recipes are found
    displayNoRecipes(foundCollection);

    //Arrays to hold the data of all currently displayed recipes 
    let allFoundRecipeIngredients = [];
    let allFoundRecipeUtensils = [];
    let allFoundRecipeAppliances = [];

    //For every currently displayed recipe
    //...push its data into the appropriate array
    for(let recipe of foundCollection){
        let recipeApplianceData = recipe.dataset.recipeArticleAppliance.toLowerCase();
        let recipeUtensilsData = recipe.dataset.recipeArticleUtensils.toLowerCase().split(",");
        let recipeIngredientsData = recipe.dataset.recipeArticleIngredients.toLowerCase().split(",");

        allFoundRecipeIngredients.push(recipeIngredientsData); //console.log(allFoundRecipeIngredients);
        allFoundRecipeUtensils.push(recipeUtensilsData); //console.log(allFoundRecipeUtensils);
        allFoundRecipeAppliances.push(recipeApplianceData); //console.log(allFoundRecipeAppliances);
    }

    //All visible recipes' appliances without repetitions
    const uniqueFoundRecipeAppliances = [...new Set (allFoundRecipeAppliances)]; //console.log(uniqueFoundRecipeAppliances);
    
    //All visible recipes' utensils
    const flattenedUtensils = allFoundRecipeUtensils.flatMap(utensil => utensil); //console.log(flattenedUtensils);
    
    //All visible recipes' utensils without repetitions
    const uniqueFoundRecipeUtensils = [...new Set (flattenedUtensils)]; //console.log(uniqueFoundRecipeUtensils);

    //All visible recipes' ingredients
    const flattenedIngredients = allFoundRecipeIngredients.flatMap(ingredient => ingredient); //console.log(flattenedIngredients);
    
    //All visible recipes' ingredients without repetitions
    const uniqueFoundRecipeIngredients = [...new Set (flattenedIngredients)]; //console.log(uniqueFoundRecipeIngredients);

    //Update the dropdown menu list options
    editDropdownList(ingredientsList, uniqueFoundRecipeIngredients, ingredientLabel);
    editDropdownList(utensilsList, uniqueFoundRecipeUtensils, utensilLabel);
    editDropdownList(appliancesList, uniqueFoundRecipeAppliances, applianceLabel);

});

//Function to edit the available options in the dropdown menus
//...based on the currently displayed recipes
//Note - eliminated class refers to list options that are not included in the visible recipes
export const editDropdownList = (dropdownList, uniqueFoundRecipeData, datalabel) => {
    for(let listOption of dropdownList) {
        if(uniqueFoundRecipeData.includes(listOption.dataset[`${datalabel}`])) {
            if(listOption.classList.contains("hidden") && listOption.classList.contains("eliminated") 
                && !(listOption.classList.contains("tagged"))) {
                listOption.classList.replace("hidden", "notHidden");
                listOption.classList.remove("eliminated");
            }
        } else {
            listOption.classList.replace("notHidden", "hidden");
            listOption.classList.add("eliminated");
        }
    }
};

recipesOutputMutationObserver.observe(recipesOutputMutant, classMutationConfiguration);

//Function to display a notification if none of the recipes match the user search
const displayNoRecipes = (collection) => {
    if(collection.length === 0) {
        noRecipes.dataset.results = "none";
    } else {
        noRecipes.dataset.results = "some";
    }
}
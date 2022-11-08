import { ingredientsList, appliancesList, utensilsList } from "../factories/dropdownFactory.js";
import { applianceLabel, utensilLabel, ingredientLabel } from "../factories/dropdownFactory.js";

//RecipesOutput Mutation Observer
const recipesOutputMutant = document.querySelector("#recipesOutput");
const recipesOutputMutationObserver = new MutationObserver(mutations => {
    //console.log(mutations);

    //Node List of found articles (display: flex;)
    const foundCollection = document.querySelectorAll(".found"); //console.log(foundCollection);

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
export const editDropdownList = (dropdownList, uniqueFoundRecipeData, datalabel) => {
    for(let listOption of dropdownList) {
        if(uniqueFoundRecipeData.includes(listOption.dataset[`${datalabel}`])) {
            if(listOption.classList.contains("hidden") && !(listOption.classList.contains("tagged"))) {
                listOption.classList.replace("hidden", "notHidden");
            }
        } else {
            listOption.classList.replace("notHidden", "hidden");
        }
    }
};

//recipesOutputMutationObserver configuration
const classMutationConfig = {
    subtree: true,
    attributes: true,
    attributeOldValue: true,
    attributeFilter: ["class"]
};

recipesOutputMutationObserver.observe(recipesOutputMutant, classMutationConfig);

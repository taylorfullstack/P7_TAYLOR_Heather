import { ingredientLabel, applianceLabel, utensilLabel } from "../factories/dropdownFactory.js";

//#tagMenu Mutation Observer
//Update the visible RECIPES on the page every time a tag is created or deleted
export const tagMenuMutant = document.querySelector("#tagMenu");
export const tagMutationObserver = new MutationObserver(mutations => {
    //console.log(mutations);
    let addedTag;
    let removedTag;
    
    //For each mutation to the tagMenu
    mutations.forEach(mutation => {
        // If a tag is ADDED
        //...update the visibile RECIPES
        if(mutation.addedNodes.length) {

            const foundCollection = document.querySelectorAll(".found"); //console.log('found collection', foundCollection);
            
            addedTag = mutation.addedNodes[0]; //console.log("node added", addedTag);

            let addedApplianceTagData = addedTag.dataset[`${applianceLabel}`]; //console.log(addedApplianceTagData);
            let addedUtensilTagData = addedTag.dataset[`${utensilLabel}`]; //console.log(addedUtensilTagData);
            let addedIngredientTagData = addedTag.dataset[`${ingredientLabel}`]; //console.log(addedIngredientTagData);
            
            //Function factory to hide recipes if they do not contain the
            //...ingredient, appliance, or utensil specified by an added tag
            const hideRecipe = (dataCategoryIndex, addedTagDataCategory) => {
                for(const recipe of foundCollection){
                    const recipeItemsDataCategory = Object.keys(recipe.dataset)[`${dataCategoryIndex}`];
                    const recipeItemsData = recipe.dataset[`${recipeItemsDataCategory}`].toLowerCase();
                    
                    if(!recipeItemsData.includes(addedTagDataCategory)){
                        recipe.classList.replace("found", "notfound");
                    }
                };
            }

            //Call the hideRecipe() function with arguments relative to the type of added tag
            if(addedApplianceTagData !== undefined){
                hideRecipe(1, addedApplianceTagData);
            }

            if(addedUtensilTagData !== undefined){
                hideRecipe(2, addedUtensilTagData);
            }

            if(addedIngredientTagData !== undefined){
                hideRecipe(3, addedIngredientTagData);
            }
        };
        
        //If a tag is REMOVED
        //...update the visibile RECIPES
        if(mutation.removedNodes.length) {

            const hiddenCollection = document.querySelectorAll(".notfound"); //console.log('hidden collection', hiddenCollection);
            
            removedTag = mutation.removedNodes[0]; //console.log("node removed", removedTag);

            //Push all current tags on the page into [allTagsTogether]
            let allTagsTogether = []; //console.log(allTagsTogether);
            let allTags = document.querySelectorAll("[data-tag]");
            for(let tag of allTags){
                allTagsTogether.push(tag.textContent.toLowerCase());
            }
            
            //For every hidden recipe
            //If every single tag in the updated tagMenu is part of the recipe
            //...display the recipe
            for(let recipe of hiddenCollection){

                let hiddenRecipeApplianceData = recipe.dataset.recipeArticleAppliance.toLowerCase(); //console.log(hiddenRecipeApplianceData);
                let hiddenRecipeUtensilsData = recipe.dataset.recipeArticleUtensils.toLowerCase().split(","); //console.log(hiddenRecipeUtensilsData);
                let hiddenRecipeIngredientsData = recipe.dataset.recipeArticleIngredients.toLowerCase().split(","); //console.log(hiddenRecipeIngredientsData);
                
                let allRecipeTags = [];
                allRecipeTags = hiddenRecipeApplianceData.concat(hiddenRecipeUtensilsData, hiddenRecipeIngredientsData); //console.log(allRecipeTags);

                if((allTagsTogether.every(item => allRecipeTags.includes(item))) === true){
                    recipe.classList.replace("notfound", "found");
                };
            }
        };
    });
})

//OBSERVE the childList of the #tagMenu
tagMutationObserver.observe(tagMenuMutant, {
    childList: true
})

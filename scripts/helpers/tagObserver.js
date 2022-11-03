import { ingredientLabel, applianceLabel, utensilLabel } from "../factories/dropdownFactory.js";
import { tagMenu } from "./tags.js";

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

            let addedApplianceTagData = addedTag.dataset.appliance;
            let addedUtensilTagData = addedTag.dataset.utensil;
            let addedIngredientTagData = addedTag.dataset.ingredient;
            
            if(addedApplianceTagData !== undefined){
                for(const recipe of foundCollection){
                    const recipeApplianceData = recipe.dataset.recipeArticleAppliance.toLowerCase();

                    if(addedApplianceTagData !== recipeApplianceData){
                        recipe.classList.replace("found", "notfound");
                    }
                };
            };
            
            if(addedUtensilTagData !== undefined){
                for(const recipe of foundCollection){
                    const recipeUtensilsData = recipe.dataset.recipeArticleUtensils.toLowerCase();
                    
                    if(!recipeUtensilsData.includes(addedUtensilTagData)){
                        recipe.classList.replace("found", "notfound");
                    }
                };
            }

            if(addedIngredientTagData !== undefined){
                for(const recipe of foundCollection){
                    const recipeIngredientsData = recipe.dataset.recipeArticleIngredients.toLowerCase();
                    
                    if(!recipeIngredientsData.includes(addedIngredientTagData)){
                        recipe.classList.replace("found", "notfound");
                    }
                };
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
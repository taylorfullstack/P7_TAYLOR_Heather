import {main, menuAppliances, menuIngredients, menuUtensils } from "./index.js";
await main();

import { } from "./components/dropdown/dropdown_inputs.js";
import { } from "./components/dropdown/dropdown_keyboard_navigation.js";
import { } from "./components/dropdown/dropdown_observer.js"
import { } from "./components/dropdown/dropdown_aria.js";
import { } from "./components/tag_menu/tags.js";
import { } from "./components/tag_menu/tag_observer.js";
import { } from "./components/recipes_output/recipe_observer.js";
import { } from "./primary_search/native_search.js";

const appliancesList =  Array.from(menuAppliances.children);
const utensilsList =  Array.from(menuUtensils.children);
const ingredientsList =  Array.from(menuIngredients.children);

export {menuAppliances, menuIngredients, menuUtensils, appliancesList, utensilsList, ingredientsList};

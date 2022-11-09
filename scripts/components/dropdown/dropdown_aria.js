import { dropdownIngredients, dropdownAppliances, dropdownUtensils} from "../dropdown/dropdown_keyboard_navigation.js";

const ariaExpanded = (event) => {
    const input = event.target;
    const menu = input.nextElementSibling.nextElementSibling.nextElementSibling;
    input.setAttribute("aria-expanded", "true");
    menu.setAttribute("aria-expanded", "true");
}

const ariaNotExpanded = (event) => {
    const input = event.target;
    const menu = input.nextElementSibling.nextElementSibling.nextElementSibling;
    input.setAttribute("aria-expanded", "false");
    menu.setAttribute("aria-expanded", "false");
}

dropdownIngredients.addEventListener("focusin", ariaExpanded);
dropdownAppliances.addEventListener("focusin", ariaExpanded);
dropdownUtensils.addEventListener("focusin", ariaExpanded);

dropdownIngredients.addEventListener("focusout", ariaNotExpanded);
dropdownAppliances.addEventListener("focusout", ariaNotExpanded);
dropdownUtensils.addEventListener("focusout", ariaNotExpanded);
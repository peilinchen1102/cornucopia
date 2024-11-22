"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onCreate = exports.capitalizePhrase = exports.filterOutEmpty = exports.capitalize = exports.getParamNames = exports.WEEK = exports.TAG_COLORS = exports.DIETARY_RESTRICTIONS = exports.LANGUAGES = void 0;
exports.LANGUAGES = ["English", "Spanish", "French", "Portuguese", "Arabic", "Russian", "Japanese", "Bengali", "Dutch", "Urdu", "Polish", "Indonesian", "Korean", "Mandarin", "Cantonese"];
exports.DIETARY_RESTRICTIONS = ["Gluten", "Tree Nuts", "Peanuts", "Milk", "Eggs", "Soy", "Fish", "Shellfish", "Sesame", "Chicken", "Beef", "Pork", "Meat"];
exports.TAG_COLORS = ["#b9fbc0", "#fde4cf", "#fbf8cc", "#ffcfd2", "#8eecf5", "#90dbf4", "#a3c4f3", "#cfbaf0"];
exports.WEEK = ["U", "M", "T", "W", "Th", "F", "S"];
function getParamNames(f) {
    return f
        .toString()
        .match(/\((.*?)\)/)[1]
        .split(",") // Simple regex to get "name: type" items in signature
        .map((param) => param.split("=")[0].trim()); // remove whitespaces
}
exports.getParamNames = getParamNames;
function capitalize(str) {
    return str.length === 0 ? str : str.charAt(0).toUpperCase() + str.toString().toLowerCase().slice(1);
}
exports.capitalize = capitalize;
function filterOutEmpty(list) {
    return list.filter((str) => str.length !== 0);
}
exports.filterOutEmpty = filterOutEmpty;
function capitalizePhrase(phrase) {
    return phrase
        .split(" ")
        .map((str) => capitalize(str))
        .join(" ");
}
exports.capitalizePhrase = capitalizePhrase;
function onCreate(option) {
    if (typeof option === "string") {
        // Handle the case when the option is just a string
        return capitalizePhrase(option);
    }
    else {
        // Handle the case when the option has value and label properties
        option.label = capitalizePhrase(option.label);
        option.value = option.label;
    }
    return option;
}
exports.onCreate = onCreate;
//# sourceMappingURL=utils.js.map
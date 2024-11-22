export const LANGUAGES = ["English", "Spanish", "French", "Portuguese", "Arabic", "Russian", "Japanese", "Bengali", "Dutch", "Urdu", "Polish", "Indonesian", "Korean", "Mandarin", "Cantonese"];
export const DIETARY_RESTRICTIONS = ["Gluten", "Tree Nuts", "Peanuts", "Milk", "Eggs", "Soy", "Fish", "Shellfish", "Sesame", "Chicken", "Beef", "Pork", "Meat"];

export const TAG_COLORS = ["#b9fbc0", "#fde4cf", "#fbf8cc", "#ffcfd2", "#8eecf5", "#90dbf4", "#a3c4f3", "#cfbaf0"];

export const WEEK = ["U", "M", "T", "W", "Th", "F", "S"];
export function getParamNames(f: Function) {
  return f
    .toString()
    .match(/\((.*?)\)/)![1]
    .split(",") // Simple regex to get "name: type" items in signature
    .map((param: string) => param.split("=")[0].trim()); // remove whitespaces
}

export function capitalize(str: string) {
  return str.length === 0 ? str : str.charAt(0).toUpperCase() + str.toString().toLowerCase().slice(1);
}

export function filterOutEmpty(list: Array<string>) {
  return list.filter((str) => str.length !== 0);
}

export function capitalizePhrase(phrase: string) {
  return phrase
    .split(" ")
    .map((str) => capitalize(str))
    .join(" ");
}

export function onCreate(option: { value: string; label: string } | string) {
  if (typeof option === "string") {
    // Handle the case when the option is just a string
    return capitalizePhrase(option);
  } else {
    // Handle the case when the option has value and label properties
    option.label = capitalizePhrase(option.label);
    option.value = option.label;
  }
  return option;
}

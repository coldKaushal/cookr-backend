// const mongoose = require("mongoose");
// mongoose.connect("mongodb://localhost:27017/Cookr");

// const data=require('./data.json');
// console.log(data);

// const recipeSchema = {
//     name: String,
//     ingredients: Array,
//     directions: Array,
//     url: String,
//     uniqueIngredients: Array
// }


// const Recipe = new mongoose.model("Recipe", recipeSchema);

// let allIngredients = [];

// const ingredientsSchema = {
//     names : Array
// }

// const Ingredients = new mongoose.model("Ingredient", ingredientsSchema); 

// data.forEach(recipe => {
//     allIngredients = allIngredients.concat(recipe.NER);
    
// });
// const uniqueIngredients = [... new Set(allIngredients)];
// console.log(uniqueIngredients);

// const newIngredients = new Ingredients({
//     names : uniqueIngredients
// })

// newIngredients.save()


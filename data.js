// const mongoose = require("mongoose");
// mongoose.connect("mongodb://localhost:27017/Cookr");

// const data=require('./new_data.json');


// const recipeSchema = {
//     name: String,
//     ingredients: Array,
//     directions: Array,
//     url: String,
//     uniqueIngredients: Array,
//     id: String,
//     likes: Number,
//     comments: Number,
//     type: String,
//     difficulty: String,
//     time: String,
// }


// const Recipe = new mongoose.model("Recipe", recipeSchema);


// data.forEach(recipe => {
//     const newRecipe = new Recipe({
//         name: recipe.title,
//         ingredients: recipe.ingredients,
//         directions: recipe.directions,
//         url: recipe.link,
//         uniqueIngredients: recipe.NER,
//         id: recipe.id,
//         likes: recipe.likes,
//         comments: recipe.comments,
//         type: recipe.type,
//         difficulty: recipe.difficulty,
//         time: recipe.time
//     })
//     newRecipe.save();
// });

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




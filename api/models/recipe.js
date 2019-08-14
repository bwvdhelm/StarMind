const mongoose = require('mongoose');

const recipeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    createdDate: { type: Date, default: new Date()},
    updatedDate: { type: Date, required: true },
    name: { type: String, required: true },
    externalSource: { type: String },
    calories: { type: Number},
    carbs: { type: Number},
    protein: { type: Number},
    fats: { type: Number}
})

module.exports = mongoose.model('Recipe', recipeSchema);
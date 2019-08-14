const mongoose = require('mongoose');

const daySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    date: { type: Date, required: true },
    name: { type: String, required: true },
    createdDate: { type: Date, default: new Date() },
    updatedDate: { type: Date , required: true},
    recipes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }]
})

module.exports = mongoose.model('Day', daySchema);
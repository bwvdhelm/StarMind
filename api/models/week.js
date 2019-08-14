const mongoose = require('mongoose');

const weekSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    weekNumber: { type: Number, required: true },
    name: { type: String },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    createdDate: {type: Date, default: new Date()},
    updatedDate: { type: Date, required: true },
    days: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Day', required: true }]
})

module.exports = mongoose.model('Week', weekSchema);
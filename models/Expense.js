var mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId;

var ExpenseSchema = new Schema({
    name: String,
    description: String,
    amount: Number,
    sourceType: {
        type: ObjectId,
        ref: 'ExpenseType'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Expense', ExpenseSchema);

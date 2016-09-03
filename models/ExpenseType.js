var mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId;

var ExpenseTypeSchema = new Schema({
    name: String,
    expenses: [{
        type: ObjectId,
        ref: 'Expense'
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('ExpenseType', ExpenseTypeSchema);

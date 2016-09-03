module.exports = function (router) {
    var ExpenseType = require('../../models/ExpenseType');
    var Expense = require('../../models/Expense');

    router.route('/expense')

        // create a expense (accessed at POST http://localhost:8080/api/expense)
        .post(function (req, res) {
            var expenseType = ExpenseType.findById(req.body.expenseTypeId).exec(function (err, expenseType) {
                var expense = new Expense(); // create a new instance of the Expense model
                expense.name = req.body.name; // set the expense name (comes from the request)
                expense.description = req.body.description;
                expense.amount = req.body.amount;

                expenseType.expenses.push(expense);

                // save the expense and check for errors
                expense.save(function (err) {
                    if (err)
                        res.send(err);

                    res.json({
                        message: 'Expense created!'
                    });
                });

            });

        })

        // get all the expense (accessed at GET http://localhost:8080/api/expense)
        .get(function (req, res) {
            Expense.find(function (err, expense) {
                if (err)
                    res.send(err);

                res.json(expense);
            });
        });

    router.route('/expense/:expenseId')

        // get the expense with that id (accessed at GET http://localhost:8080/api/expense/:expenseId)
        .get(function (req, res) {
            Expense.findById(req.params.expenseId).populate('sourceType', 'name').exec(function (err, expense) {
                if (err)
                    res.send(err);
                res.json(expense);
            });
        })
        // update the expense with this id (accessed at PUT http://localhost:8080/api/expense/:expenseId)
        .put(function (req, res) {

            // use our expense model to find the expense we want
            Expense.findById(req.params.expenseId, function (err, expense) {

                if (err)
                    res.send(err);

                expense.name = req.body.name; // update the expense info

                // save the expense
                expense.save(function (err) {
                    if (err)
                        res.send(err);

                    res.json({
                        message: 'Expense updated!'
                    });
                });

            });
        })
        // delete the expense with this id (accessed at DELETE http://localhost:8080/api/expense/:expenseId)
        .delete(function (req, res) {
            Expense.remove({
                Id: req.params.expenseId
            }, function (err, expense) {
                if (err)
                    res.send(err);

                res.json({
                    message: 'Successfully deleted'
                });
            });
        });
};

module.exports = function (router, models) {

    router.route('/expense')

        // create a expense (accessed at POST http://localhost:8080/api/expense)
        .post(function (req, res) {

            models.Expense
                .create({
                    name: req.body.name,
                    description: req.body.description,
                    amount: req.body.amount,
                    ExpenseTypeId: req.body.expenseTypeId
                })
                .then(function (theExpense) {
                    res.json({
                        data: theExpense.dataValues
                    });
                });

        })

        // get all the expense (accessed at GET http://localhost:8080/api/expense)
        .get(function (req, res) {

            models.Expense.findAll({
                include: [models.ExpenseType]
            })
                .then(function (data) {
                    res.json({
                        data: data
                    });
                });
        });

    router.route('/expense/:expenseId')

        // get the expense with that id (accessed at GET http://localhost:8080/api/expense/:expenseId)
        .get(function (req, res) {

            models.Expense.findOne({
                where: {
                    id: req.params.expenseId
                },
                include: [models.ExpenseType]
            })
                .then(function (data) {
                    res.json({
                        data: data
                    });
                });
        })
        // update the expense with this id (accessed at PUT http://localhost:8080/api/expense/:expenseId)
        .put(function (req, res) {
            var params = {
                name: req.body.name,
                description: req.body.description,
                amount: req.body.amount,
                ExpenseTypeId: req.body.expenseTypeId
            };

            Object.keys(params).forEach(function (key) {
                (params[key] === undefined || params[key] === null) && delete params[key]
            });

            models.Expense.update(params,
                {
                    where: {
                        id: req.params.expenseId
                    }
                })
                .then(function (data) {
                    res.json({
                        data: data
                    });
                });
        })
        // delete the expense with this id (accessed at DELETE http://localhost:8080/api/expense/:expenseId)
        .delete(function (req, res) {

            models.Expense.destroy({
                where: {
                    id: req.params.expenseId
                }
            })
                .then(function () {
                    res.json({
                        data: 1
                    });
                });
        });
};

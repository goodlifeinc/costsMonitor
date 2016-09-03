var Sequelize = require('sequelize');
var when = require('when');

module.exports = function (router, models) {

    router.route('/expensetype')

        // create a expensetype (accessed at POST http://localhost:8080/api/expensetype)
        .post(function (req, res) {

            models.ExpenseType.create({ name: req.body.name })
                .then(function (theTask) {
                    res.json({
                        message: 'ExpenseType created!',
                        data: theDask.dataValues
                    });
                })
                .catch(function (err) {
                    throw (err);
                });
        })

        // get all the expensetypes (accessed at GET http://localhost:8080/api/expensetype)
        .get(function (req, res) {

            models.ExpenseType.findAll(
                {
                    include: [{
                        model: models.Expense
                    }]
                })
                .then(function (all) {
                    res.json({
                        data: all
                    });
                });
        });

    router.route('/expensetype/:expensetype_id')

        // get the expensetype with that id (accessed at GET http://localhost:8080/api/expensetype/:expensetype_id)
        .get(function (req, res) {

            models.ExpenseType.find(
                {
                    where: {
                        id: req.params.expensetype_id
                    },
                    include: [{
                        model: models.Expense,
                        required: false,
                        where: {
                            ExpenseTypeId: Sequelize.col('expenseType.id')
                        }
                    }]
                })
                .then(function (data) {
                    res.json({
                        data: data
                    });
                });
        })
        // update the expensetype with this id (accessed at PUT http://localhost:8080/api/expensetypes/:expensetype_id)
        .put(function (req, res) {

            models.ExpenseType.update(
                {
                    name: req.body.name
                },
                {
                    where: {
                        id: req.params.expensetype_id
                    }
                })
                .then(function (rows, data) {
                    res.json({
                        data: data
                    });
                });
        })
        // delete the expensetype with this id (accessed at DELETE http://localhost:8080/api/expensetypes/:expensetype_id)
        .delete(function (req, res) {

            models.ExpenseType.destroy(
                {
                    where: {
                        id: req.params.expensetype_id
                    }
                })
                .then(function () {
                    res.json({
                        data: 1
                    });
                });
        });
};

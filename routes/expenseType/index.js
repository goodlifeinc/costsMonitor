module.exports = function(router) {
    var ExpenseType = require('../../models/ExpenseType');
    var Expense = require('../../models/Expense');

    router.route('/expensetype')

    // create a expensetype (accessed at POST http://localhost:8080/api/expensetype)
    .post(function(req, res) {

        var expensetype = new ExpenseType(); // create a new instance of the ExpenseType model
        expensetype.name = req.body.name; // set the expensetypes name (comes from the request)

        // save the expensetype and check for errors
        expensetype.save(function(err) {
            if (err)
                res.send(err);

            res.json({
                message: 'ExpenseType created!'
            });
        });

    })

    // get all the expensetypes (accessed at GET http://localhost:8080/api/expensetype)
    .get(function(req, res) {
        ExpenseType.find().populate('expenses', 'name amount').exec(function(err, expensetypes) {
            if (err)
                res.send(err);

            res.json(expensetypes);
        });
    });

    router.route('/expensetype/:expensetype_id')

    // get the expensetype with that id (accessed at GET http://localhost:8080/api/expensetype/:expensetype_id)
    .get(function(req, res) {
            ExpenseType.findById(req.params.expensetype_id).populate('expenses').exec(function(err, expensetype) {
                if (err)
                    res.send(err);
                res.json(expensetype);
            });
        })
        // update the expensetype with this id (accessed at PUT http://localhost:8080/api/expensetypes/:expensetype_id)
        .put(function(req, res) {

            // use our expensetype model to find the expensetype we want
            ExpenseType.findById(req.params.expensetype_id, function(err, expensetype) {

                if (err)
                    res.send(err);

                expensetype.name = req.body.name; // update the expensetypes info

                // save the expensetype
                expensetype.save(function(err) {
                    if (err)
                        res.send(err);

                    res.json({
                        message: 'ExpenseType updated!'
                    });
                });

            });
        })
        // delete the expensetype with this id (accessed at DELETE http://localhost:8080/api/expensetypes/:expensetype_id)
        .delete(function(req, res) {
            ExpenseType.remove({
                _id: req.params.expensetype_id
            }, function(err, expensetype) {
                if (err)
                    res.send(err);

                res.json({
                    message: 'Successfully deleted'
                });
            });
        });
};

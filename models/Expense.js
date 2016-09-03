'use strict';
module.exports = function (sequelize, DataTypes) {
  var Expense = sequelize.define('Expense', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    amount: DataTypes.STRING,
  },
    {
      classMethods: {
        associate: function (models) {
          // associations can be defined here
          models.Expense.belongsTo(models.ExpenseType, {
            onDelete: "CASCADE"
          });
        }
      }
    });
  return Expense;
};
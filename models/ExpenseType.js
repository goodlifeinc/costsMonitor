'use strict';
module.exports = function (sequelize, DataTypes) {
  var ExpenseType = sequelize.define('ExpenseType', {
    name: DataTypes.STRING,
  }, {
      classMethods: {
        associate: function (models) {
          // associations can be defined here
          models.ExpenseType.hasMany(models.Expense);
        }
      }
    });
  return ExpenseType;
};
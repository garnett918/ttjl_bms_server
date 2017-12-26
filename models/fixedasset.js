'use strict';
module.exports = function(sequelize, DataTypes) {
  var Fixedasset = sequelize.define('Fixedasset', {
    dbid: DataTypes.STRING,
    dbname: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Fixedasset;
};
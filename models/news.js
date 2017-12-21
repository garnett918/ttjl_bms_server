'use strict';
module.exports = function(sequelize, DataTypes) {
  var News = sequelize.define('News', {
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    create_time: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return News;
};
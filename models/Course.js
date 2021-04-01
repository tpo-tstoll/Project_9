'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Course extends Model {
  }
  Course.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'A title is required'
        },
        notEmpty: {
          msg: 'Please provide a title for the course'
        }
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'A description of the course is required'
        },
<<<<<<< HEAD
        notEmpty: {
          msg: 'Please provide a description for the course'
        }
      }
    },
    estimatedTime: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please provide an estimate time for this course'
        },
        notEmpty: {
          msg: 'Please provide an estimate time for this course'
        }
      }
    },
    materialsNeeded: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'A list of materials is required for this course'
=======
        estimatedTime:{
            type: DataTypes.STRING,
        },
        materialsNeeded:{
            type: DataTypes.STRING,
>>>>>>> 8fc663ad4083b8dd0ac34f210ffcf4d8ed193135
        },
        notEmpty: {
          msg: 'Please provide a list of materials that will be required for this course'
        }
      }
    }
  }, { sequelize });

  Course.associate = (models) => {
    Course.belongsTo(models.User, {
      foreignKey: {
        fieldName: 'userId',
        allowNull: false
      }
    });
  };
  return Course;
};

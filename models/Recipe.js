// module.exports = Post;
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create our Recipe model
class Recipe extends Model {}

// create fields/columns for Post model
Recipe.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      ingredients: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      directions: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'user',
          key: 'id'
        }
      }
    },
    {
      sequelize,
      freezeTableName: true,
      underscored: true,
      modelName: 'recipe'
    }
  );
  
  module.exports = Recipe;
  //test commit 

  //header: Content-Type: multipart/form-data;
  //append user who upload it
  //form.append(myimages, File)
  //req.file - place where it was uploaded
  //original file name 
  //new path

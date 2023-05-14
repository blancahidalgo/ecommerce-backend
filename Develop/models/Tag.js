const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Tag extends Model {}

Tag.init(
  {
    // define columns
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'tag',
  }
);

module.exports = Tag;



// const { Sequelize, Model, DataTypes } = require('sequelize');

// // Define the sequelize instance and connect to the database
// const sequelize = new Sequelize('database_name', 'username', 'password', {
//   host: 'localhost',
//   dialect: 'mysql'
// });

// // Define the Category model
// class Category extends Model {}
// Category.init({
//   id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true
//   },
//   category_name: {
//     type: DataTypes.STRING,
//     allowNull: false
//   }
// }, { sequelize });

// // Define the Product model
// class Product extends Model {}
// Product.init({
//   id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true
//   },
//   product_name: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   price: {
//     type: DataTypes.DECIMAL(10, 2),
//     allowNull: false,
//     validate: {
//       isDecimal: true
//     }
//   },
//   stock: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//     defaultValue: 10,
//     validate: {
//       isNumeric: true
//     }
//   }
// }, { sequelize });

// // Define the Tag model
// class Tag extends Model {}
// Tag.init({
//   id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true
//   },
//   tag_name: {
//     type: DataTypes.STRING
//   }
// }, { sequelize });

// // Define the ProductTag model
// class ProductTag extends Model {}
// ProductTag.init({
//   id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true
//   }
// }, { sequelize });

// // Set up the relationships
// Product.belongsTo(Category, { foreignKey: 'category_id' });
// Category.hasMany(Product, { foreignKey: 'category_id' });

// Product.belongsToMany(Tag, { through: ProductTag });
// Tag.belongsToMany(Product, { through: ProductTag });

// // Sync the models with the database
// sequelize.sync({ force: true }).then(() => {
//   console.log('Database synced!');
// }).catch((error) => {
//   console.error('Error syncing database:', error);
// });

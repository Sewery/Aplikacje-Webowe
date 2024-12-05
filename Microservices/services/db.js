const { Sequelize, DataTypes, Op, Model } = require("sequelize");
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage:
    "/home/seweryn/Documents/Repos/Aplikacje-Webowe/Microservices/mydb.sqlite",
});
const Book = sequelize.define(
  "Book",
  {
    book_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "book_id",
    },
    name: { type: DataTypes.STRING, allowNull: false, field: "name" },
    author: { type: DataTypes.STRING, allowNull: false, field: "author" },
    year: { type: DataTypes.INTEGER, allowNull: false, field: "year" },
  },
  { tableName: "books", timestamps: false, underscored: true }
);

const User = sequelize.define(
  "User",
  {
    user_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
  },
  { tableName: "users", timestamps: false, underscored: true }
);

const Order = sequelize.define(
  "Order",
  {
    order_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    book_id: { type: DataTypes.INTEGER, allowNull: false },
  },
  { tableName: "orders", timestamps: false, underscored: true }
);
Book.hasMany(Order, { foreignKey: "book_id" });
User.hasMany(Order, { foreignKey: "user_id" });
Order.belongsTo(Book, { foreignKey: "book_id", onDelete: "cascade" });
Order.belongsTo(User, { foreignKey: "user_id", onDelete: "cascade" });

module.exports = { sequelize, Book, Order, User };

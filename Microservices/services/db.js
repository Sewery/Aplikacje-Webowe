const { Sequelize, DataTypes, Op, Model } = require("sequelize");
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage:
    "/home/seweryn/Documents/Repos/Aplikacje-Webowe/Microservices/mydb.sqlite",
});
const Book = sequelize.define(
  "Book",
  {
    book_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    author: { type: DataTypes.STRING, allowNull: false },
    year: { type: DataTypes.INTEGER, allowNull: false },
  },
  { tableName: "books", timestamps: false, underscored: true }
);

const User = sequelize.define(
  "User",
  {
    user_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false, underscored: true },
  },
  { tableName: "users", timestamps: false }
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
Book.hasMany(Order);
User.hasMany(Order);
Order.belongsTo(Book, {
  onDelete: "cascade",
  foreignKey: "book_id",
  hooks: true,
});
Order.belongsTo(User, {
  onDelete: "cascade",
  foreignKey: "user_id",
  hooks: true,
});

module.exports = { sequelize, Book, Order, User };

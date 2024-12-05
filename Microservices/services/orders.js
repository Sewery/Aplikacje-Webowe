const { Order, Book, User } = require("./db");
function createOrder(order) {
  return Book.findOne({ where: { book_id: order.book_id } })
    .then((value) => {
      if (value != null)
        return User.findOne({ where: { user_id: order.user_id } });
      return null;
    })
    .then((value) => {
      console.log(value);
      if (value != null) return Order.create(order);
      return null;
    });
}

function getOrdersByUserId(userId) {
  return Order.findAll({ where: { user_id: userId } });
}
function deleteOrder(orderId) {
  return Order.destroy({ where: { order_id: orderId } });
}
function patchOrder(orderId, order) {
  return Order.update(order, { where: { order_id: orderId } });
}
module.exports = {
  createOrder,
  getOrdersByUserId,
  patchOrder,
  deleteOrder,
};

// const knex = require("./knex");
const { Order } = require("./server");
function createOrder(order) {
  return Order.create(order);
  // return knex("orders").insert(order);
}

function getOrdersByUserId(userId) {
  return Order.findAll({ where: { user_id: userId } });
  // return knex("orders").select("*").where("userId", userId);;
}
function deleteOrder(orderId) {
  return Order.destroy({ where: { order_id: orderId } });
  // return knex("orders").where("order_id", orderId).del();
}
function patchOrder(orderId, order) {
  return Order.update(order, { where: { order_id: orderId } });
  // return knex("orders").where("order_id", orderId).del();
}
module.exports = {
  createOrder,
  getOrdersByUserId,
  patchOrder,
  deleteOrder,
};

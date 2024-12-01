// const knex = require("./knex");
const { Book, Order } = require("./server");

function createBook(book) {
  // return knex("books").insert(book);
  return Book.create(book);
}

function getAllBooks() {
  // return knex("books").select("*");
  return Book.findAll();
}

function getBookById(bookId) {
  // return knex("books").select("*").where("book_id", bookId);
  return Book.findByPk(bookId);
}
function deleteBook(bookId) {
  // return knex("books").where("book_id", bookId).del();
  Order.destroy({ where: { book_id: bookId } });
  return Book.destroy({ where: { book_id: bookId } });
}

module.exports = {
  createBook,
  getAllBooks,
  getBookById,
  deleteBook,
};

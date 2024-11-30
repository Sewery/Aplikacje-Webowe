const knex = require("./knex");

function createBook(book) {
  return knex("books").insert(book);
}

function getAllBooks() {
  return knex("books").select("*");
}

function getBookById(bookId) {
  return knex("books").select("*").where("book_id", bookId);
}
function deleteBook(bookId) {
  return knex("books").where("book_id", bookId).del();
}

module.exports = {
  createBook,
  getAllBooks,
  getBookById,
  deleteBook,
};

const { Book, Order } = require("./db");

function createBook(book) {
  return Book.create(book);
}

function getAllBooks() {
  return Book.findAll();
}

function getBookById(bookId) {
  return Book.findByPk(bookId);
}
function deleteBook(bookId) {
  return Order.destroy({ where: { book_id: bookId } }).then(
    Book.destroy({ where: { book_id: bookId } })
  );
}

module.exports = {
  createBook,
  getAllBooks,
  getBookById,
  deleteBook,
};

import db from "../db.js";
const { Book, Order } = db;

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

export default {
  createBook,
  getAllBooks,
  getBookById,
  deleteBook,
};

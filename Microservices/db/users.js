const { User } = require("./server");
function getAllUsers() {
  return User.findAll();
}
function createUser(user) {
  return User.findOrCreate({
    where: { email: user.email },
    defaults: { password: user.password },
  });
}

function loginUser(user) {
  return User.findOne({
    where: {
      email: user.email,
      password: user.password,
    },
  });
}
function findUserById(userid) {
  return User.findByPk(userid);
}
module.exports = {
  createUser,
  loginUser,
  findUserById,
  getAllUsers,
};

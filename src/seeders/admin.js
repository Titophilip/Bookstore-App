  const User = require("../models/user");
  const bcrypt = require("bcryptjs")

  exports.seedAdmin = () => {
      User.findOne({ role: "admin" }, (error, admin) => {
          if (error) {
              throw error
          }
          if (admin) {
              return "Admin account exists already."
          }
          User.create({
              firstName: "Book",
              lastName: "Goblin",
              userName: "bookgoblin",
              role: "admin"
          }, (error, user) => {
              if (error) {
                  throw error
              }
              bcrypt.genSalt(10, salt,)
          })
      })
  }
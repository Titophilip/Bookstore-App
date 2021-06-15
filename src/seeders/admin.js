  const User = require("../models/user");

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
              las
          })
      })
  }
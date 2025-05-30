const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  userName: { type: String, unique: true},
  email: { type: String, unique: true },
  password: String,
  googleId: { type: String, unique: true, sparse: true}, 
  displayName: String, 
  firstName: String,
  lastName: String, 
  image: String, 
});

// Password hash middleware.

UserSchema.pre("save", function save(next) {
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

// Helper method for validating user's password.

UserSchema.methods.comparePassword = function (candidatePassword) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
      if (err) {
        return reject(err); // Reject the promise with the error
      }
      resolve(isMatch); // Resolve the promise with the result
    });
  });
};

module.exports = mongoose.model("User", UserSchema);

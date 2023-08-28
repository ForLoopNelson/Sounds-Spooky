const passport = require("passport")
const validator = require("validator")
const User = require("../models/User")
const Token = require("../models/token")
const crypto = require("crypto")
const mailer = require('nodemailer')


exports.getLogin = (req, res) => {
  if (req.user) {
    return res.redirect("/profile")
  }
  res.render("login", {
    title: "Login",
  })
}

exports.postLogin = (req, res, next) => {
  const validationErrors = []
  if (!validator.isEmail(req.body.email))
    validationErrors.push({ msg: "Please enter a valid email address." })
  if (validator.isEmpty(req.body.password))
    validationErrors.push({ msg: "Password cannot be blank." })

  if (validationErrors.length) {
    req.flash("errors", validationErrors)
    return res.redirect("/login")
  }
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  })

  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err)
    }
    if (!user) {
      req.flash("errors", info)
      return res.redirect("/login")
    }
    
    req.logIn(user, (err) => {
      if (err) {
        return next(err)
      }


      req.flash("success", { msg: "Success! You are logged in." })
      res.redirect(req.session.returnTo || "/profile")
    })
  })(req, res, next)
}

exports.logout = (req, res) => {
  req.logout(() => {
    console.log("User has logged out.")
  })
  req.session.destroy((err) => {
    if (err)
      console.log("Error : Failed to destroy the session during logout.", err)
    req.user = null
    res.redirect("/")
  })
}

exports.renderResetPasswordForm = (req, res) => {
  res.render("reset-password", {
    title: "Reset Password",
  });
};

exports.handleResetPasswordRequest = async (req, res, next) => {
  const { email, username } = req.body;

  try {
    // Check if user exists based on email and username
    const user = await User.findOne({ email, userName: username });

    if (!user) {
      req.flash("errors", { msg: "User not found." });
      return res.redirect("/reset-password");
    }

    // Generate and save a reset password token
    const token = new Token({
      userId: user._id,
      token: crypto.randomBytes(16).toString("hex"),
    });
    await token.save();

    // Send the reset password email
    const resetLink = `http://localhost:8080/pwReset/${token.token}`;

   req.flash("info", { msg: "Password reset instructions have been sent to your email." });
    res.redirect("/reset-password");
  } catch (err) {
    console.error(err);
    req.flash("errors", { msg: "An error occurred. Please try again later." });
    res.redirect("/reset-password");
  }
};

// authController.js

exports.getResetPasswordForm = (req, res) => {
  res.render("pwReset", { title: "Reset Password" });
};

exports.postResetPassword = async (req, res) => {
  try {
    const token = await Token.findOne({ token: req.params.token });
    if (!token) {
      req.flash("errors", { msg: "Invalid or expired token." });
      return res.redirect("/reset-password");
    }

    const user = await User.findById(token.userId);
    if (!user) {
      req.flash("errors", { msg: "User not found." });
      return res.redirect("/reset-password");
    }

    // Update the user's password
    user.password = req.body.newPassword;
    await user.save();

    // Delete the used token
    await token.deleteOne();

    req.flash("success", { msg: "Password has been reset successfully." });
    res.redirect("/login"); // Redirect to the login page
  } catch (err) {
    console.error(err);
    req.flash("errors", { msg: "An error occurred. Please try again later." });
    res.redirect("/reset-password");
  }
};


exports.getSignup = (req, res) => {
  if (req.user) {
    return res.redirect("/profile")
  }
  res.render("signup", {
    title: "Create Account",
  })
}

exports.postSignup = (req, res, next) => {
  const validationErrors = []
  if (!validator.isEmail(req.body.email))
    validationErrors.push({ msg: "Please enter a valid email address." })
  if (!validator.isLength(req.body.password, { min: 8 }))
    validationErrors.push({
      msg: "Password must be at least 8 characters long",
    })
  if (req.body.password !== req.body.confirmPassword)
    validationErrors.push({ msg: "Passwords do not match" })

  if (validationErrors.length) {
    req.flash("errors", validationErrors)
    return res.redirect("../signup")
  }
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  })

  const user = new User({
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password,
  })

  User.findOne(
    { $or: [{ email: req.body.email }, { userName: req.body.userName }] },
    (err, existingUser) => {
      if (err) {
        return next(err)
      }
      if (existingUser) {
        req.flash("errors", {
          msg: "Account with that email address or username already exists.",
        })
        return res.redirect("../signup")
      }
      user.save((err) => {
        if (err) {
          return next(err)
        }
        req.logIn(user, (err) => {
          if (err) {
            return next(err)
          }
          res.redirect("/profile")
        })
      })
    }
  )
}

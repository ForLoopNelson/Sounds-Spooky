const passport = require("passport")
const validator = require("validator")
const User = require("../models/User")

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

       const isGoogleUser = user.googleId !== undefined;

      // Define the user data to be passed to the profile page
      const userData = {
        userName: isGoogleUser ? "Signed in With Google" : user.userName,
        email: isGoogleUser ? user.email : "Email not available",
      };

      res.redirect(req.session.returnTo || "/profile")
     })
    })
  (req, res, next)
}


// GOOGLE AUTH ***************************************************************************************
// Login with Google
exports.getGoogleLogin = passport.authenticate("google", {
  scope: ["profile", "email"],
});

exports.getGoogleCallback = passport.authenticate("google", {
  failureRedirect: "/login", // Redirect to login page on authentication failure
  successRedirect: "/profile", // Redirect to profile page on successful authentication
});
//GOOGLE ***********************************************************************************************/
 
// PW reset start ++++++++++++++++++++++++++++++++++++++++
exports.renderResetPasswordForm = (req, res) => {
  
  res.render("reset-password", {
    title: "Reset Password"
   
  });
};
// WIP +++++++++++++++++++++++++++++++++++++++++++++++++++++

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

exports.getSignup = (req, res) => {
  if (req.user) {
    return res.redirect("/profile")
  }
  res.render("signup", {
    title: "Create Account",
  })
}

exports.postSignup = async (req, res, next) => {
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

  try {
    const existingUser = await User.findOne({
      $or: [{ email: req.body.email }, { userName: req.body.userName }],
    });

    if (existingUser) {
      req.flash("errors", {
        msg: "Account with that email address or username already exists.",
      });
      return res.redirect("../signup");
    }

    await user.save();

    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      res.redirect("/profile");
    });
  } catch (err) {
    return next(err);
  }
};

// Delete profile route
// Controller to render the delete profile form
exports.deleteProfileForm = (req, res) => {
  // Check if the user is logged in 
  if (!req.user) {
    return res.redirect("/login"); 
  }
  console.log("Delete Profile route hit")
  res.render("deleteProfile", {
    title: "Delete Profile",  
   
  });
};

// delete profile logic WIP +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
exports.deleteProfile = async (req, res) => {
  try {
    const userId = req.user._id;

    // Find all posts by the user
    const userPosts = await Post.find({ user: userId });

    //  Delete each post's cloudinary file (if any)
    for (const post of userPosts) {
      if (post.cloudinaryId) {
        await cloudinary.uploader.destroy(post.cloudinaryId, {
          resource_type: "video",
          folder: "audio_files/",
        });
      }
    }

    //  Delete all posts by the user
    await Post.deleteMany({ user: userId });

    //  Delete all comments by the user (if you have a Comment model)
    await Comment.deleteMany({ user: userId }); // optional, if comments exist

    //  Delete the user account
    const deletedUser = await User.findByIdAndDelete(userId);

    if (deletedUser) {
      // Logout and destroy session
      req.logout(() => {
        req.session.destroy(() => {
          res.redirect("/");
        });
      });
    } else {
      req.flash("errors", { msg: "User not found." });
      res.redirect("/profile");
    }

  } catch (error) {
    console.error("Error deleting user:", error);
    req.flash("errors", { msg: "Something went wrong while deleting your account." });
    res.redirect("/profile");
  }
};





// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
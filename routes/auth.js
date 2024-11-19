const express = require("express")
const router = express.Router()
const passport = require("passport")
const authController = require("../controllers/auth")
const homeController = require("../controllers/home")
const postsController = require("../controllers/posts")
const { ensureAuth, ensureGuest } = require("../middleware/auth")

// Route for rendering the password reset form
router.get("/reset-password", authController.renderResetPasswordForm);

// Route for handling the password reset request
// router.post("/reset-password-initiate", authController.handleResetPasswordRequest);

// router.get("/reset-password/:token", authController.getResetPasswordForm);
// router.post("/reset-password/:token", authController.postResetPassword);


router.get("/google", passport.authenticate("google", { scope: ["profile"] }))

//@desc Google auth callback
//@route GET /auth/google/callback
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/profile")
  }
)

// Route for profile deletion
router.get("/deleteProfile", ensureAuth, authController.deleteProfileForm)


module.exports = router
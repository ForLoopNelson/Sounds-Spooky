// Declare all needed variables for packages

const express = require("express")
const mongoose = require("mongoose")
const passport = require("passport")
const session = require("express-session")
const MongoStore = require("connect-mongo")(session)
const methodOverride = require("method-override")
const flash = require("express-flash")
const logger = require("morgan")
const connectDB = require("./config/database")
const mainRoutes = require("./routes/main")
const postRoutes = require("./routes/posts")
const commentRoutes = require("./routes/comment")
const authRoutes = require("./routes/auth")


//Use .env file in config folder
require("dotenv").config({ path: "./config/.env" })

// Passport config
require("./config/passport")(passport)

//Connect To Database
// connectDB()
const app = express()



//Using EJS for views
app.set("view engine", "ejs")

//Static Folder
app.use(express.static("public"))

//Body Parsing
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//Logging
app.use(logger("dev"))

//Use forms for put / delete
app.use(methodOverride("_method"))

// Setup Sessions - stored in MongoDB
// Check whether this is really needed as it adds up quick
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
)



// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

//Use flash messages for errors, info, ect...
app.use(flash())




//Setup Routes For Which The Server Is Listening
app.use("/", mainRoutes)
app.use("/post", postRoutes)
app.use("/comment", commentRoutes)
app.use("/auth", authRoutes)

//Server Running
const PORT = process.env.PORT || 3000
connectDB().then(() => {
app.listen(
  PORT,
  console.log(`Server is running on ${process.env.PORT}`),
  //test for Cyclic Deploy
    console.log(`Let's get Spooky!`)
)
})


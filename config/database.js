const mongoose = require("mongoose");

//test for deprecated warning
mongoose.set("strictQuery", true)

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_STRING,
    {useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
     useCreateIndex: true })
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;

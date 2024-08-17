const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {});
    console.log("Connected to MongoDB successfully!".green);
  } catch (err) {
    console.error("Failed to connect to MongoDB".red, err);
    process.exit(1); // Exit the process with failure
  }
};

module.exports = connectDB;

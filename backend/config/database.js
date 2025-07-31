const mongoose = require("mongoose");

const connectDatabase = () => {
  // Check if DB_URI is defined
  const dbUri = process.env.DB_URI || process.env.DATABASE_URL || "mongodb+srv://ecommerceuser:Arpit2004@cluster0.ckzuz4a.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=cluster0";

  console.log("Attempting to connect to MongoDB...");
  console.log("DB_URI exists:", !!process.env.DB_URI);

  if (!dbUri) {
    console.error("❌ No database URI found in environment variables");
    process.exit(1);
  }

  mongoose
    .connect(dbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then((data) => {
      console.log(`✅ MongoDB connected with server: ${data.connection.host}`);
    })
    .catch((error) => {
      console.error("❌ MongoDB connection error:", error.message);
      process.exit(1);
    });
};

module.exports = connectDatabase;

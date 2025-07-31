const app = require("./app");
const cloudinary = require("cloudinary");
const connectDatabase = require("./config/database");

// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});

// Config - Load environment variables
require("dotenv").config({ path: "backend/config/config.env" });

// Debug environment variables
console.log("🔧 Environment Check:");
console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("PORT:", process.env.PORT);
console.log("DB_URI exists:", !!process.env.DB_URI);

// Connecting to database
connectDatabase();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Auto-seed database if empty (for production)
const autoSeed = async () => {
  try {
    const Product = require("./models/productModel");
    const User = require("./models/userModel");

    const productCount = await Product.countDocuments();
    console.log(`📊 Current products in database: ${productCount}`);

    if (productCount === 0) {
      console.log("🌱 Database is empty, auto-seeding...");

      // Create admin user if doesn't exist
      let adminUser = await User.findOne({ email: "admin@ecommerce.com" });
      if (!adminUser) {
        adminUser = await User.create({
          name: "Admin User",
          email: "admin@ecommerce.com",
          password: "admin123",
          role: "admin",
          avatar: {
            public_id: "admin_avatar",
            url: "https://i.ibb.co/4pDNDk1/avatar.png",
          },
        });
        console.log("👤 Admin User Created");
      }

      // Sample products
      const products = [
        {
          name: "iPhone 14 Pro",
          description: "Latest iPhone with advanced camera system and A16 Bionic chip",
          price: 999,
          ratings: 4.5,
          images: [{ public_id: "sample_id_1", url: "https://i.ibb.co/DRST11n/1.webp" }],
          category: "Electronics",
          Stock: 25,
          numOfReviews: 15,
          reviews: [],
          user: adminUser._id
        },
        {
          name: "MacBook Pro M2",
          description: "Powerful laptop with M2 chip for professional work",
          price: 1299,
          ratings: 4.7,
          images: [{ public_id: "sample_id_2", url: "https://i.ibb.co/4KrPqMP/download-1.jpg" }],
          category: "Laptop",
          Stock: 15,
          numOfReviews: 8,
          reviews: [],
          user: adminUser._id
        },
        {
          name: "Samsung Galaxy S23",
          description: "Android smartphone with excellent camera and display",
          price: 799,
          ratings: 4.3,
          images: [{ public_id: "sample_id_3", url: "https://i.ibb.co/JpyrLTN/download.jpg" }],
          category: "Electronics",
          Stock: 30,
          numOfReviews: 12,
          reviews: [],
          user: adminUser._id
        },
        {
          name: "Dell XPS 13",
          description: "Ultrabook with premium design and performance",
          price: 1099,
          ratings: 4.4,
          images: [{ public_id: "sample_id_4", url: "https://i.ibb.co/XbGpZry/download-6.jpg" }],
          category: "Laptop",
          Stock: 20,
          numOfReviews: 6,
          reviews: [],
          user: adminUser._id
        },
        {
          name: "AirPods Pro",
          description: "Wireless earbuds with active noise cancellation",
          price: 249,
          ratings: 4.6,
          images: [{ public_id: "sample_id_5", url: "https://i.ibb.co/5BLbJSD/download-3.jpg" }],
          category: "Electronics",
          Stock: 50,
          numOfReviews: 25,
          reviews: [],
          user: adminUser._id
        },
        {
          name: "Gaming Laptop",
          description: "High-performance laptop for gaming and content creation",
          price: 1599,
          ratings: 4.2,
          images: [{ public_id: "sample_id_6", url: "https://i.ibb.co/4J7kZnm/download-4.jpg" }],
          category: "Laptop",
          Stock: 10,
          numOfReviews: 4,
          reviews: [],
          user: adminUser._id
        }
      ];

      await Product.insertMany(products);
      console.log("✅ Database seeded with sample products!");
    } else {
      console.log("✅ Database already has products, skipping auto-seed");
    }
  } catch (error) {
    console.error("❌ Auto-seed error:", error.message);
  }
};

const server = app.listen(process.env.PORT, async () => {
  console.log(`Server is working on http://localhost:${process.env.PORT}`);

  // Run auto-seed after server starts
  setTimeout(autoSeed, 3000); // Wait 3 seconds for DB connection
});

// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection`);

  server.close(() => {
    process.exit(1);
  });
});

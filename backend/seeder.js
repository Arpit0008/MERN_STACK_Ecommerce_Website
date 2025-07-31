const Product = require("./models/productModel");
const User = require("./models/userModel");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");

// Load environment variables
dotenv.config({ path: "backend/config/config.env" });

// Connect to database
connectDatabase();

const products = [
  {
    name: "iPhone 14 Pro",
    description: "Latest iPhone with advanced camera system and A16 Bionic chip",
    price: 999,
    ratings: 4.5,
    images: [
      {
        public_id: "sample_id_1",
        url: "https://i.ibb.co/DRST11n/1.webp",
      },
    ],
    category: "Electronics",
    Stock: 25,
    numOfReviews: 15,
    reviews: [],
  },
  {
    name: "MacBook Pro M2",
    description: "Powerful laptop with M2 chip for professional work",
    price: 1299,
    ratings: 4.7,
    images: [
      {
        public_id: "sample_id_2",
        url: "https://i.ibb.co/4KrPqMP/download-1.jpg",
      },
    ],
    category: "Laptop",
    Stock: 15,
    numOfReviews: 8,
    reviews: [],
  },
  {
    name: "Samsung Galaxy S23",
    description: "Android smartphone with excellent camera and display",
    price: 799,
    ratings: 4.3,
    images: [
      {
        public_id: "sample_id_3",
        url: "https://i.ibb.co/JpyrLTN/download.jpg",
      },
    ],
    category: "Electronics",
    Stock: 30,
    numOfReviews: 12,
    reviews: [],
  },
  {
    name: "Dell XPS 13",
    description: "Ultrabook with premium design and performance",
    price: 1099,
    ratings: 4.4,
    images: [
      {
        public_id: "sample_id_4",
        url: "https://i.ibb.co/XbGpZry/download-6.jpg",
      },
    ],
    category: "Laptop",
    Stock: 20,
    numOfReviews: 6,
    reviews: [],
  },
  {
    name: "AirPods Pro",
    description: "Wireless earbuds with active noise cancellation",
    price: 249,
    ratings: 4.6,
    images: [
      {
        public_id: "sample_id_5",
        url: "https://i.ibb.co/5BLbJSD/download-3.jpg",
      },
    ],
    category: "Electronics",
    Stock: 50,
    numOfReviews: 25,
    reviews: [],
  },
  {
    name: "Gaming Laptop",
    description: "High-performance laptop for gaming and content creation",
    price: 1599,
    ratings: 4.2,
    images: [
      {
        public_id: "sample_id_6",
        url: "https://i.ibb.co/4J7kZnm/download-4.jpg",
      },
    ],
    category: "Laptop",
    Stock: 10,
    numOfReviews: 4,
    reviews: [],
  },
];

const importData = async () => {
  try {
    await Product.deleteMany();
    console.log("Products Deleted");

    // Create or find admin user
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
      console.log("Admin User Created");
    }

    // Add user field to all products
    const productsWithUser = products.map(product => ({
      ...product,
      user: adminUser._id
    }));

    await Product.insertMany(productsWithUser);
    console.log("Products Added");

    process.exit();
  } catch (error) {
    console.log(error);
    process.exit();
  }
};

const destroyData = async () => {
  try {
    await Product.deleteMany();
    console.log("Products Deleted");

    process.exit();
  } catch (error) {
    console.log(error);
    process.exit();
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}

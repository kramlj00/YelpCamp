const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const CampGround = require("../models/campground");

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await CampGround.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new CampGround({
      author: "615174d5268916fa84c2637b",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      images: [
        {
          url: "https://res.cloudinary.com/kris/image/upload/v1632832951/YelpCamp/oqiten80lqhvvy8jcgaq.jpg",
          filename: "YelpCamp/oqiten80lqhvvy8jcgaq",
        },
        {
          url: "https://res.cloudinary.com/kris/image/upload/v1632832953/YelpCamp/qm4o8trggqpjoxraat7b.jpg",
          filename: "YelpCamp/qm4o8trggqpjoxraat7b",
        },
      ],
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Hic, provident dicta tempore quod quae adipisci animi quo eum error corporis assumenda voluptatum ratione odio ipsa doloremque molestiae ducimus vel distinctio?",
      price,
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});

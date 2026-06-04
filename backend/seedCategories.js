require('dotenv').config();
const mongoose = require('mongoose');
const Category = require('./models/categoryModel');
const connectDB = require('./config/db');

const categories = [
  { title: 'Hair Care', url: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=150&q=80' },
  { title: 'Skin Care', url: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=150&q=80' },
  { title: 'Health Care', url: 'https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?w=150&q=80' },
  { title: 'Herbal Tea', url: 'https://images.unsplash.com/photo-1576092762791-dd9e2220afa1?w=150&q=80' },
  { title: 'Supplements', url: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=150&q=80' },
  { title: 'Body Care', url: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=150&q=80' },
  { title: 'Aromatherapy', url: 'https://images.unsplash.com/photo-1602928321679-560bb453f190?w=150&q=80' },
  { title: 'Baby Care', url: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=150&q=80' },
  { title: 'Wellness', url: 'https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?w=150&q=80' },
  { title: 'Immunity', url: 'https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?w=150&q=80' },
  { title: 'Digestive Care', url: 'https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?w=150&q=80' }
];

const seedData = async () => {
  try {
    await connectDB();
    await Category.deleteMany(); // clear existing
    await Category.insertMany(categories);
    console.log('Categories seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();

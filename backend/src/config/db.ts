import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;
    
    if (!mongoURI) {
      console.log('⚠️  MongoDB connection string not found in environment variables.');
      console.log('📝 To connect to MongoDB:');
      console.log('   1. Create a MongoDB Atlas account at https://www.mongodb.com/atlas');
      console.log('   2. Create a new cluster and get your connection string');
      console.log('   3. Add MONGODB_URI=your_connection_string to backend/.env file');
      console.log('   4. Restart the server');
      console.log('');
      console.log('🚀 Server will continue running without database functionality...');
      return;
    }
    
    await mongoose.connect(mongoURI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    console.log('');
    console.log('💡 Troubleshooting tips:');
    console.log('   - Check if your MongoDB URI is correct in backend/.env');
    console.log('   - Ensure your MongoDB cluster is running');
    console.log('   - Verify network connectivity to your database');
    console.log('');
    console.log('🚀 Server will continue running without database functionality...');
  }
};
// Mongoose Module
import mongoose from 'mongoose';

// Database Connection
/* CLOUD_DB_URI = your Cloud mongodb database (e.g. =mongodb+srv://[username]:[password]@cluster0.mdjfo.azure.mongodb.net/[db_name]?authSource=admin&replicaSet=atlas-slstwf-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true )
and is included on your .env file
*/

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.CLOUD_DB_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error:${error.message}`);
    process.exit(1);
  }
};

export default connectDB;

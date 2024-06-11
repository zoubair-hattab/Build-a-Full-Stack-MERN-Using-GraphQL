import mongoose from 'mongoose';
export const connect = async () => {
  try {
    const connection = await mongoose.connect(process.env.BD_URL);
    console.log(`Mongdb Connected on ${connection.connection.host}`);
  } catch (err) {
    console.log(`Error on mongob${err.message}`);
    process.exit(1);
  }
};

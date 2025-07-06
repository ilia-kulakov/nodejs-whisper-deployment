import { app } from './server.js';
import mongoose from 'mongoose';

const port = process.env.PORT;
const uri = process.env.MONGODB_URI;

try {
  await mongoose.connect(uri);
  console.log('Connected to MongoDB');
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
} catch (error) {
  console.error(error);
}

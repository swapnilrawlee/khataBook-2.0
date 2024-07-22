import dotenv from "dotenv";
import connectDB from "./config/mongodb-connection.js";
import app from "./app.js";

dotenv.config();

const PORT = process.env.PORT || 4000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

// import "dotenv/config";
// import express from "express";
// import cors from "cors";
// import fs from "fs";
// import connectDB from "./config/mongodb-connection.js";
// import UserModel from "./module/users.js";
// import { log } from "console";

// const app = express();

// // Middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cors());

// connectDB()
//   .then(() => console.log("connected to database ..."))
//   .catch(() => console.log("Not connected to database"));

// // Basic route
// app.get("/", (req, res) => {
//   res.send("Welcome to the File Creator API");
// });

// app.get("/data", (req, res) => {
//   fs.readdir("./files", "utf8", (err, data) => {
//     if (err) {
//       console.error(err.message);
//       return res.status(500).send("Error reading directory");
//     }
//     res.send(data);
//   });
// });

// app.get("/edit/:files", (req, res) => {
//   const filename = req.params.files;
//   const filePath = `./files/${filename}`;
//   console.log(filename, "file");
//   fs.readFile(filePath, "utf8", (err, fileContent) => {
//     if (err) {
//       console.error("Error reading file:", err);
//       return res.status(500).send("Error reading file");
//     }
//     res.send(fileContent);
//     console.log("Receiving", fileContent);
//   });
// });

// app.post("/edit/:files", async (req, res) => {
//   const filename = req.params.files;
//   const { content } = req.body;
//   const filePath = `./files/${filename}`;
//   const title = filename.slice(0, filename.lastIndexOf("."));

//   try {
//     // Update the file content
//     fs.writeFile(filePath, content, async (err) => {
//       if (err) {
//         console.error("Error writing file:", err);
//         return res.status(500).send("Error writing file");
//       }

//       // Update the database entry
//       const updatedData = await UserModel.findOneAndUpdate(
//         { title },
//         { content },
//         { new: true }
//       );

//       if (!updatedData) {
//         console.log(`File ${filename} not found in database`);
//         return res.status(404).send("File not found in database");
//       }

//       console.log(`File and database entry for ${filename} updated successfully`);
//       res.send("File and database entry updated successfully");
//     });
//   } catch (err) {
//     console.error("Error updating file or database entry:", err);
//     res.status(500).send("Internal Server Error");
//   }
// });

// app.delete("/delete/:files", async (req, res) => {
//   const filename = req.params.files;
//   const filePath = `./files/${filename}`;
//   try {
//     const dbDataDelete = await UserModel.deleteOne({ title: filename.slice(0, filename.lastIndexOf(".")) });
//     if (dbDataDelete.deletedCount > 0) {
//       console.log(`File ${filename} deleted from database`);
//     } else {
//       console.log(`File ${filename} not found in database`);
//     }
//     fs.unlink(filePath, (err) => {
//       if (err) {
//         console.error("Error deleting file:", err);
//         return res.status(500).send("Error deleting file");
//       }
//       res.send("File has been deleted");
//     });
//   } catch (err) {
//     console.error("Error deleting file:", err);
//     res.status(500).send("Error deleting file");
//   }
// });

// app.post("/create", async (req, res) => {
//   const { title, content } = req.body;
//   if (!title || !content) {
//     return res.status(400).send("Title and Content are required");
//   }

//   const filePath = `./files/${title}.txt`;

//   try {
//     const data = await UserModel.create({ title, content });
//     console.log(`Data has been created successfully: ${data.title}`);
//     fs.writeFile(filePath, content, (err) => {
//       if (err) {
//         console.error("Error writing file", err);
//         return res.status( 500).send("Internal Server Error");
//       }
//       console.log(`File created: ${title}`);
//       res.send("File created successfully");
//     });
//   } catch (err) {
//     console.error("Error creating data:", err);
//     res.status(500).send("Internal Server Error");
//   }
// });

// const PORT = process.env.PORT || 4000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
import express from "express";
import cors from "cors";
import fileRoutes from "./routes/fileRoutes.js";

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.use("/", fileRoutes);

export default app;

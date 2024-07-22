import fs from "fs";
import FileModel from "../models/FileModel.js";

export const readDirectory = (req, res) => {
  fs.readdir("./files", "utf8", (err, data) => {
    if (err) {
      console.error(err.message);
      return res.status(500).send("Error reading directory");
    }
    res.send(data);
  });
};

export const readFile = (req, res) => {
  const filename = req.params.files;
  const filePath = `./files/${filename}`;
  fs.readFile(filePath, "utf8", (err, fileContent) => {
    if (err) {
      console.error("Error reading file:", err);
      return res.status(500).send("Error reading file");
    }
    res.send(fileContent);
  });
};

export const createFile = async (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).send("Title and Content are required");
  }

  const filePath = `./files/${title}.txt`;

  try {
    const data = await FileModel.create({ title, content });
    console.log(`Data has been created successfully: ${data.title}`);
    fs.writeFile(filePath, content, (err) => {
      if (err) {
        console.error("Error writing file", err);
        return res.status(500).send("Internal Server Error");
      }
      res.send("File created successfully");
    });
  } catch (err) {
    console.error("Error creating data:", err);
    res.status(500).send("Internal Server Error");
  }
};

export const updateFile = async (req, res) => {
  const filename = req.params.files;
  const { content } = req.body;
  const filePath = `./files/${filename}`;
  const title = filename.slice(0, filename.lastIndexOf("."));

  try {
    fs.writeFile(filePath, content, async (err) => {
      if (err) {
        console.error("Error writing file:", err);
        return res.status(500).send("Error writing file");
      }

      const updatedData = await FileModel.findOneAndUpdate(
        { title },
        { content },
        { new: true }
      );

      if (!updatedData) {
        return res.status(404).send("File not found in database");
      }

      res.send("File and database entry updated successfully");
    });
  } catch (err) {
    console.error("Error updating file or database entry:", err);
    res.status(500).send("Internal Server Error");
  }
};

export const deleteFile = async (req, res) => {
  const filename = req.params.files;
  const filePath = `./files/${filename}`;
  try {
    const dbDataDelete = await FileModel.deleteOne({
      title: filename.slice(0, filename.lastIndexOf(".")),
    });
    if (dbDataDelete.deletedCount > 0) {
      console.log(`File ${filename} deleted from database`);
    } else {
      console.log(`File ${filename} not found in database`);
    }
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error("Error deleting file:", err);
        return res.status(500).send("Error deleting file");
      }
      res.send("File has been deleted");
    });
  } catch (err) {
    console.error("Error deleting file:", err);
    res.status(500).send("Error deleting file");
  }
};

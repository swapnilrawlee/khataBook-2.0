import mongoose from "mongoose";

const FileSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  content: { type: String, required: true },
});

const FileModel = mongoose.model("File", FileSchema);

export default FileModel;

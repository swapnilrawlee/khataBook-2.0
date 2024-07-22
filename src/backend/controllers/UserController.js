import UserModel from "../models/UserModel.js";

export const registerUser = async (req, res) => {
  const { fullname, emailid, username, password } = req.body;

  if (!fullname || !emailid || !username || !password) {
    return res.status(400).send("All fields are required");
  }

  try {
    const existingUser = await UserModel.findOne({ emailid });
    if (existingUser) {
      return res.status(400).send("User already exists");
    }

    const newUser = new UserModel({ fullname, emailid, username, password });
    await newUser.save();

    res.status(201).send("User registered successfully");
  } catch (err) {
    res.status(500).send("Server error");
  }
};


export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await UserModel.findOne({ username });
    console.log(user);
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ success: false, message: "Invalid Username or Password" });
    }
    
    res.json({ success: true, message: "Login successful" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

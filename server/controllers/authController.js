import User from "../models/User.js";
import bcrypt from "bcrypt";

// REGISTER
export const registerUser = async (req, res) => {
  try {
    const { name, dob, email, password } = req.body;

    if (!name || !dob || !email || !password)
      return res.status(400).json({ message: "All fields are required" });

    const exist = await User.findOne({ email });
    if (exist)
      return res.status(400).json({ message: "Email already registered" });

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({ name, dob, email, password: hashed });

    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// LOGIN
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "All fields required" });

    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "Email not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.status(401).json({ message: "Incorrect password" });

    res.json({ message: "Login success", user });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

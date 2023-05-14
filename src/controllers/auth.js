import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import userModel from "../models/auth.js";

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (name.trim() === "") {
      return res.status(400).json({ message: "Full Name is required!" });
    }

    if (email.trim() === "") {
      return res.status(400).json({ message: "Email is required!" });
    }

    if (password.trim() === "") {
      return res.status(400).json({ message: "Password is required!" });
    }

    const user = await userModel.findOne({ email });

    if (user) {
      return res.status(409).json({ message: "Email already exists!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new userModel({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully." });
  } catch (err) {
    console.log("error : ", err);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email.trim() === "" || password.trim() === "") {
      return res.status(400).json({ message: "Email and Password are required!" });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Email doesn't exist!" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Email or Password is incorrect!" });
    }

    const token = jwt.sign({ id: user._id }, "secret");

    res.status(200).json({ token, userID: user._id });
  } catch (err) {
    console.log("err : ", err);
  }
};

export { register, login };

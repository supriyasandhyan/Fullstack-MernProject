import userModel from "../Model/userModel.js";
import jwt from "jsonwebtoken";
import upload from "../../Helper/Image.js"; // Path to multer configuration
import { comparePassword } from "../../Helper/authHelper.js";
import { hashPassword } from "../../Helper/authHelper.js";
import users from "../Model/userModel.js"
import crypto from 'crypto'

// JWT Secret Key
const JWT_SECRET = "gvggcfcfxxxxfgggfxfgx"; // Replace with your actual secret


export const createUser = async (req, res) => {
  try {
      upload(req, res, async (err) => {
          if (err) {
              return res.status(400).send(err);
          } else {
              const { name, lastname, email, phone, password } = req.body;
              let image = req.file ? req.file.path : null;

              // Validation
              if (!name) return res.status(400).send("Name is required");
              if (!lastname) return res.status(400).send("Lastname is required");
              if (!email) return res.status(400).send("Email is required");
              if (!phone) return res.status(400).send("Phone is required");
              if (!password) return res.status(400).send("Password is required");

              // Existing user validation
              const existingUser = await userModel.findOne({ email });
              if (existingUser) {
                  return res.status(400).send("User already exists");
              }

              // Create a new user
              const hashedPassword = await hashPassword(password);
              const newUser = await userModel.create({
                  name,
                  lastname,
                  email,
                  phone,
                  password,
                  image
              });

              const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, { expiresIn: "1h" });

              res.status(201).send({
                  status: "success",
                  message: "User registered successfully",
                  user: newUser,
                  token
              });
          }
      });
  } catch (error) {
      console.log(`Error in API: ${error}`);
      res.status(500).send("Internal server error");
  }
};

export const getUsersController=async(req,res)=>{
  try {
    const getuser = await userModel.find({})
    if(!users || users.length === 0){
       return  res.status(404).send('no user fund')
    }
    res.status(500).send({
        status:'success',
        message:'get all users details succesfully',
        getuser,
    })
  } catch (error) {
    console.log(`error in api ${error}`);
    res.status(200).send('internal server error')
  }
}



// Update user details
export const userUpdateController = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, lastname, email, phone, password } = req.body;

    // Check if user exists
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).send("User not found");
    }

    // Check if email already exists (for another user)
    if (email && email !== user.email) {
      const existingUser = await userModel.findOne({ email });
      if (existingUser) {
        return res.status(400).send("Email already in use");
      }
    }

    // Update user details
    if (name) user.name = name;
    if (lastname) user.lastname = lastname;
    if (email) user.email = email;
    if (phone) user.phone = phone;
    if (password) user.password = await hashPassword(password);

    // Save updated user
    const updatedUser = await user.save();

    res.status(200).send({
      status: "success",
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.log(`Error in API: ${error}`);
    res.status(500).send("Internal server error");
  }
};
// Delete user by ID
export const deleteUserController = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if user exists
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).send("User not found");
    }

    // Delete user
    await userModel.findByIdAndDelete(id);

    res.status(200).send({
      status: "success",
      message: "User deleted successfully",
    });
  } catch (error) {
    console.log(`Error in API: ${error}`);
    res.status(500).send("Internal server error");
  }
};
// Partially update user details
export const patchUserController = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, lastname, email, phone, password } = req.body;

    // Check if user exists
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).send("User not found");
    }

    // Check if email already exists (for another user)
    if (email && email !== user.email) {
      const existingUser = await userModel.findOne({ email });
      if (existingUser) {
        return res.status(400).send("Email already in use");
      }
    }

    // Update user details if provided
    if (name) user.name = name;
    if (lastname) user.lastname = lastname;
    if (email) user.email = email;
    if (phone) user.phone = phone;
    if (password) user.password = await hashPassword(password);

    // Save updated user
    const updatedUser = await user.save();

    res.status(200).send({
      status: "success",
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.log(`Error in API: ${error}`);
    res.status(500).send("Internal server error");
  }
};


// Get single user details by ID
export const getSingleUserController = async (req, res) => {
  try {
    const { id } = req.params;

    // Find user by ID
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).send("User not found");
    }

    res.status(200).send({
      status: "success",
      message: "User details fetched successfully",
      user,
    });
  } catch (error) {
    console.log(`Error in API: ${error}`);
    res.status(500).send("Internal server error");
  }
};


export const userLoginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).send("Email and password are required");
    }

    // Check if user exists
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send("User not found");
    }

    // Check if password matches
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(400).send("Invalid credentials");
    }

    // Generate token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "3h" });

    res.status(200).send({
      status: "success",
      message: "User logged in successfully",
      user,
      token
    });
  } catch (error) {
    console.log(`Error in API: ${error}`);
    res.status(500).send("Internal server error");
  }
};

// Test controller
export const testController = (req, res) => {
  res.send('protected route');
}

// Forgot password controller
export const forgotPasswordController = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if email exists
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send('User not found');
    }

    // Generate a token
    const resetToken = crypto.randomBytes(20).toString('hex');

    // Set token and expiry on the user document
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

    await user.save();

   
    res.status(200).send({
      status: 'success',
      message: 'Password reset token has been sent',
      resetToken
    });
  } catch (error) {
    console.log(`Error in API: ${error}`);
    res.status(500).send('Internal server error');
  }
};

// Reset password controller
export const resetPasswordController = async (req, res) => {
  try {
    const { resetToken, newPassword } = req.body;

    // Find user by reset token and check if the token has not expired
    const user = await userModel.findOne({
      resetPasswordToken: resetToken,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).send('Invalid or expired token');
    }

    // Hash the new password and save it
    user.password = await hashPassword(newPassword);
    user.resetPasswordToken = undefined; // Clear the reset token
    user.resetPasswordExpires = undefined; // Clear the token expiry

    await user.save();

    res.status(200).send({
      status: 'success',
      message: 'Password has been reset successfully'
    });
  } catch (error) {
    console.log(`Error in API: ${error}`);
    res.status(500).send('Internal server error');
  }
};
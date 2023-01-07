import express from "express";
const router = express.Router();

import { createUser, getSingleUser } from "../models/userModel/UserModel.js";

router.all("/", (req, res, next) => {
  console.log("Got hit to all router");
  next();
});

// creating new user
router.post("/", async (req, res, next) => {
  try {
    const result = await createUser(req.body);
    result?._id
      ? res.json({
          status: "success",
          message: "New user has been created successfully",
        })
      : res.json({
          status: "error",
          message: "Unable to create the user, Please try again later",
        });
  } catch (error) {
    if (error.message.includes("E11000 duplicate key error collection")) {
      error.errorCode = 200;
      error.message =
        "This email has been used alread,  use different email or reset your password";
    }

    next(error);
  }
});

//login user
router.post("/login", async (req, res, next) => {
  try {
    console.log(req.body);
    const result = await getSingleUser(req.body);
    console.log(result);
    result?._id
      ? res.json({
          status: "success",
          message: "Loged In",
          result: {
            _id: result._id,
            email: result.email,
            name: result.name,
          },
        })
      : res.json({
          status: "error",
          message: "Invalid login",
        });
  } catch (error) {
    next(error);
  }
});

//getting user profile

//updating user profile

//deleting user profile

export default router;

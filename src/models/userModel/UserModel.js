import UserSchema from "./UserSchema.js";

// create user
export const createUser = (newUserObj) => {
  return UserSchema(newUserObj).save();
};

// read user @filter munst be an object {}
export const getSingleUser = (filter) => {
  return UserSchema.findOne(filter);
};

// update user
export const getUserAndUpdate = (filter, updateObj) => {
  return UserSchema.findOneAndUpdate(filter, updateObj);
};

// delete user

export const deleteUserById = (_id) => {
  return UserSchema.findByIdAndDelete(_id);
};

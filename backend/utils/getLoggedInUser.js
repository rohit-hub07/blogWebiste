import User from "../models/user.model.js";

export const getLoggedInUser = async (id) => {
  // console.log("id insied getLoggedInUser: ",id)
  const user = await User.findById({ _id: id }).select("-password");
  // console.log("Current User: ", user);
  return user;
};

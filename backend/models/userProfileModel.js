import mongoose from "mongoose";

const profileSchema = mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  path: {
    type: String,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    unique: true,
  },
});

const UserProfile = mongoose.model("UserProfile", profileSchema);

export default UserProfile;

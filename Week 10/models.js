const mongoose = require("mongoose");
mongoose.connect("")

const userSchema = mongoose.Schema({
  username: String,
  password: String,
});

const organisationSchema = mongoose.Schema({
  title: String,
  description: String,
  admin: mongoose.Types.ObjectId,
  members: [mongoose.Types.ObjectId],
});

const organisationModel = mongoose.model("organization", organisationSchema);
const userModel = mongoose.model("users", userSchema);

module.exports = {
  organisationModel,
  userModel
};
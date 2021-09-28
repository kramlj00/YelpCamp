const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

// this will add field for username and password, make sure usernames are unique
// and give us some methods we can use
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);

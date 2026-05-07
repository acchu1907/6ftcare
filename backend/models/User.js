const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
   bloodGroup: String,
  emergencyContact: {
    name: String,
    phone: String,
    relation: String
  },
 role: {
    type: String,
    enum: ["patient", "doctor", "admin"],
    default: "patient",
  }
},
  
{ timestamps: true });
 

module.exports = mongoose.model("User", userSchema);
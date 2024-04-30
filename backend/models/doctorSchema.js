const Schema = mongoose.Schema;
const mongoose = require("mongoose");



const doctorDocument = new Schema({
    
  firstName: {
    type: String,
    required: [true, "First name is required"]
  },


  lastName: {
    type: String,
    required: [true, "Last name is required"]
  },


  speciality: {
    type: String,
    required: [true, "Speciality is required"]
  },


  active: {
    type: Boolean,
    default: true
  }
});

const Doctor = mongoose.model("Doctor", doctorDocument);
module.exports = Doctor;

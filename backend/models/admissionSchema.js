const Schema = mongoose.Schema;
const mongoose = require("mongoose");


const admissionDocument = new Schema({

  admissionDate: {
    type: Date,
    required: [true, "Admission date is required"],
    default: Date.now

  },
  dischargeDate: {
    type: Date

  },
  diagnosis: {
    required: [true, "Diagnosis is required"],
    type: String
  }
  
});

const Admission = mongoose.model("Admission", admissionDocument);
module.exports = Admission;

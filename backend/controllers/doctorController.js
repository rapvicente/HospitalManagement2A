const mongoose = require("mongoose");

const Doctor = require("../models/doctorSchema");



module.exports.doctor = (req, res) => {
  const doctorID = req.params.id;

  Doctor.findById(doctorID)
    .then((doctor) => res.send(doctor))
    .catch((error) => res.send(error));
};

module.exports.doctors = (req, res) => {
  Doctor.find({ active: true })
    .then((doctors) => res.send(doctors))
    .catch((error) => res.send(error));
};



module.exports.deleteDoctor = (req, res) => {
  const doctorID = req.params.doctorID;
  console.log(doctorID);

  const update = { active: false, confined: false };

  Doctor.findByIdAndDelete(doctorID, update, { new: true })
    .then((doctor) => res.status(204).send(doctor))
    .catch((error) => res.status(500).send(error));
};

module.exports.createDoctor = (req, res) => {
  const { firstName, lastName, speciality, active } = req.body;

  const newDoctor = new Doctor({
    firstName,
    lastName,
    speciality,
    active,
  });

  try {
    const savedDoctor = newDoctor.save();
    res.status(201).json({ "new doctor": newDoctor });
  } catch (error) {
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};


module.exports.updateDoctor = (req, res) => {
  const { firstName, lastName, speciality, active } = req.body;

  console.log(req.body);

  const doctorID = req.params.id;
  console.log(doctorID);

  const updatedFields = { firstName, lastName, speciality, active };

  console.log(updatedFields);

  Doctor.findByIdAndUpdate(doctorID, updatedFields, { new: true })
    .then((updatedDoctor) => {
      if (!updatedDoctor) {
        return res.status(404).json({ error: "doctor not found" });
      }

      res.status(200).json(updatedDoctor);
    })

    .catch((error) => {
      res.status(500).json({ error: error.message || "Internal server error" });
    });
};

module.exports.getDoctorByName = (req, res) => {
  const doctorName = req.params.name;

  Doctor.findOne({ firstName: doctorName })
    .then((doctor) => {
      if (!doctor) {
        return res.status(404).json({ error: "Doctor not found" });
      }
      res.status(200).json(doctor);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message || "Internal server error" });
    });
};

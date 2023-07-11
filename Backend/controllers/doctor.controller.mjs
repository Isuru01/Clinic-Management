import Specialization from "../models/specialization.model.mjs";
import Doctor from "../models/doctor.model.mjs";

const getPrivateDoctor = async (req, res) => {
  try {
    res.status(200).json({ message: "Hellow World" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getDoctor = async (req, res, next) => {
  const { id } = req.params;

  try {
    const doctor = await Doctor.findOne(
      { key: id },
      { _id: 0, docPhone: 0 }
    ).populate("docSpecialization", "-_id");

    res.status(200).json(doctor);
  } catch (err) {
    next(err);
  }
};

const getAllDoctor = async (req, res) => {
  try {
    const doctors = await Doctor.find({}, { _id: 0 }).populate(
      "docSpecialization",
      "-_id -categoryDesc"
    );

    res.status(200).json(doctors);
  } catch (err) {
    next(err);
  }
};

const createDoctor = async (req, res) => {
  const { docSpecialization, ...doctor } = req.body;

  try {
    const { _id } = await Specialization.findOne({
      categoryHeader: docSpecialization,
    });

    await Doctor.create({ ...doctor, docSpecialization: _id });

    res.status(200).json({
      message: `Doctor ${doctor.docFName} ${doctor.docLName} is successfully created.`,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

const updateDoctor = async (req, res) => {
  try {
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteDoctor = async (req, res) => {
  try {
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export {
  getDoctor,
  getPrivateDoctor,
  getAllDoctor,
  createDoctor,
  updateDoctor,
  deleteDoctor,
};

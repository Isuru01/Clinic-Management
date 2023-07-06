import Specialization from "../models/specialization.model.mjs";

const getSpecialization = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};

const getAllSpecialization = async (req, res, next) => {
  try {
    const specializations = await Specialization.find({}, { _id: 0 });
    res.status(200).json(specializations);
  } catch (err) {
    next(err);
  }
};

const createSpecialization = async (req, res, next) => {
  const specialization = req.body;
  try {
    await Specialization.create(specialization);
    res.status(200).json({
      message: `Specialization is successfully created.`,
    });
  } catch (err) {
    next(err);
  }
};

const updateSpecialization = (req, res) => {
  try {
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteSpecialization = (req, res) => {
  try {
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export {
  getSpecialization,
  getAllSpecialization,
  createSpecialization,
  updateSpecialization,
  deleteSpecialization,
};

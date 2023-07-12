import pkg from "body-parser";
const { json } = pkg;
import Doctor from "../models/doctor.model.mjs";
import Specialization from "../models/specialization.model.mjs";

const search = async (req, res, next) => {
  const { docName, docSpecialization } = req.query;
  const query = {};

  if (docSpecialization) {
    const specialization = await Specialization.findOne({
      categoryHeader: docSpecialization,
    });

    if (specialization) {
      query.docSpecialization = specialization._id;
    }
  }

  if (docName) {
    query.$or = [
      { docFName: { $regex: docName, $options: "i" } },
      { docLName: { $regex: docName, $options: "i" } },
    ];
  }

  try {
    const doctors = await Doctor.find(query).populate(
      "docSpecialization",
      "-_id categoryHeader"
    );

    res.status(200).json(doctors);
  } catch (err) {
    next(err);
  }
};

const getDocList = async (req, res, next) => {
  try {
    const doctors = await Doctor.find(
      {},
      { _id: 0, key: 1, docFName: 1, docLName: 1, docSpecialization: 1 }
    ).populate("docSpecialization", "-_id -categoryDesc");

    res.status(200).json(doctors);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const getSpecList = async (req, res, next) => {
  try {
    const specializations = await Specialization.find(
      {},
      { _id: 0, categoryDesc: 0 }
    );

    res.status(200).json(specializations);
  } catch (err) {
    next(err);
  }
};
export { search, getDocList, getSpecList };

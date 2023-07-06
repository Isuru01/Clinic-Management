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

export { search };

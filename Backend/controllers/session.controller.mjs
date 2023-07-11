import Specialization from "../models/specialization.model.mjs";
import Session from "../models/session.model.mjs";
import Doctor from "../models/doctor.model.mjs";
import Fee from "../models/fee.model.mjs";
import dayjs from "dayjs";

const getSession = (req, res) => {
  try {
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllSession = async (req, res, next) => {
  try {
    const sessions = await Session.find({}, { _id: 0 })
      .populate("specialization", "-_id -categoryDesc")
      .populate(
        "doctor",
        "-_id docFName docLName docHospital docGender docProfilePic docLiscense"
      );

    res.status(200).json(sessions);
  } catch (err) {
    next(err);
  }
};

const createSession = async (req, res, next) => {
  const { specialization, doctor, schedule, fee } = req.body;

  try {
    const { _id: docID, docSpecialization: specID } = await Doctor.findOne(
      {
        key: doctor,
      },
      { _id: 1, docSpecialization: 1 }
    );

    console.log(req.body);
    const days = Object.keys(schedule);

    await Doctor.updateOne(
      { _id: docID },
      { $addToSet: { available: { $each: days } } }
    );

    const { _id: feeID } = await Fee.create(fee);

    const sessions = days.map((day) => ({
      specialization: specID,
      doctor: docID,
      fee: feeID,
      day: day,
      ...schedule[day],
    }));

    const insertedSessions = await Session.insertMany(sessions);

    for (const session of insertedSessions) {
      await Doctor.updateOne(
        { _id: docID },
        { $addToSet: { sessions: session._id } }
      );
    }

    res.status(200).json({ message: "Sessions successfully created" });
  } catch (err) {
    next(err);
  }
};

const updateSession = (req, res) => {
  try {
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteeSession = (req, res) => {
  try {
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export {
  getSession,
  getAllSession,
  createSession,
  updateSession,
  deleteeSession,
};

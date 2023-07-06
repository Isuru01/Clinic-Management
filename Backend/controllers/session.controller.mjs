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
  const { docSpecialization, docLiscense, schedule, fee } = req.body;
  try {
    const specialization = await Specialization.findOne(
      {
        categoryHeader: docSpecialization,
      },
      { _id: 1 }
    );

    const doctor = await Doctor.findOne(
      {
        docLiscense,
      },
      { _id: 1 }
    );

    const days = Object.keys(schedule);

    await Doctor.updateOne(
      { _id: doctor },
      { $addToSet: { available: { $each: days } } }
    );

    const { _id: charge } = await Fee.create({
      consulation: 2000.0,
      service: 20,
      tax: 5,
    });

    const sessions = days.map((day) => ({
      specialization,
      consultationFee: 3000.0,
      doctor,
      day,
      fee: charge,
      ...schedule[day],
    }));

    const insertedSessions = await Session.insertMany(sessions);

    for (const session of insertedSessions) {
      await Doctor.updateOne(
        { _id: doctor },
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

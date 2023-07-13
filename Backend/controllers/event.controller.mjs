import Session from "../models/session.model.mjs";
import Doctor from "../models/doctor.model.mjs";
import Event from "../models/event.model.mjs";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";

const today = dayjs().format("ddd");
const oneWeek = dayjs().add(1, "week").format("YYYY-MM-DD");

dayjs.extend(utc);

const createEvent = async (req, res, next) => {
  try {
    const sessions = await Session.find({ day: today }, { _id: 0 });

    for (const session of sessions) {
      const sessionObject = session.toObject();

      const startTime = `${oneWeek}T${session.startedAt}`;
      const endTime = `${oneWeek}T${session.endedAt}`;

      await Event.create({
        date: oneWeek,
        start: startTime,
        end: endTime,
        ...sessionObject,
      });
    }
  } catch (err) {
    console.log(err);
    next();
  }
};

const getEvent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const event = await Event.findOne({ key: id }, { _id: 0, bookings: 0 })
      .populate("doctor", "-_id docFName docLName")
      .populate("specialization", "-_id -categoryDesc")
      .populate("fee", "-_id");

    console.log(event);

    res.status(200).json(event);
  } catch (err) {
    next();
  }
};

const getEventByDoctor = async (req, res, next) => {
  try {
    const { id } = req.params;

    console.log(id);
    //get the now date time
    const now = dayjs().format("YYYY-MM-DDTHH:mm").toString();

    //find the doctor
    const doctor = await Doctor.findOne(
      { key: id },
      { _id: 1, docSpecialization: 1 }
    );

    //find session that is date time greater than current value
    const session = await Event.find(
      {
        UTC: {
          $gte: now,
        },
        doctor: doctor._id,
      },
      { _id: 0, doctor: 0 }
    ).populate("specialization", "-_id -categoryHeader");

    res.status(200).json(session);
  } catch (err) {
    console.log(err);
    next();
  }
};

export { createEvent, getEventByDoctor, getEvent };

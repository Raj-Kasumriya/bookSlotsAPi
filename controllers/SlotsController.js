
const { TimeSlot, BookSlots } = require('../models/slots.model');



const serverStatus = async (req, res) => {
    try {
        res.json("server is live")

    } catch (err) {
        res.status(500).json({ massage: err.massage });

    }
}



const studentIdSlots = async (req, res) => {

    try {

        const studentId = req.params.studentId

        const search1 = { "studentId": studentId }

        const existingSlotBook = await BookSlots.find(search1)

        const bookedSessionId = existingSlotBook?.map((slot) => {

            return slot.ActivitySlotsId
        })

        //const search = { "bookSlotId": bookSlotId }
        // const search2 = { "ActivitySlotsId": ActivitySlotsId }

        // if (existingSlotBook) return res.status(409).json({ massage: "slot all ready booked" });


        const slots = await TimeSlot.find()

        res.json({ slots: slots, bookedSessionId: bookedSessionId });

    } catch (err) {
        res.status(500).json({ massage: err.massage });

    }

}

const mentorIdSlots = async (req, res) => {

    try {

        const mentorId = req.params.mentorId
        const search = { "mentorId": mentorId }



        const slots = await TimeSlot.find(search)
        res.json(slots);

    } catch (err) {
        res.status(500).json({ massage: err.massage });

    }

}


const mentorDeleteSlots = async (req, res) => {

    try {

        const mentorId = req.params.mentorId
        const _id = req.params.sessionId
        const search = { "mentorId": mentorId, "_id": _id }
        const search2 = { "mentorId": mentorId, "ActivitySlotsId": _id }


        const slots = await TimeSlot.deleteOne(search)
        await BookSlots.deleteOne(search2)

        res.json(slots);

    } catch (err) {
        res.status(500).json({ massage: err.massage });

    }

}

const mentorSentSlots = async (req, res) => {

    try {

        const newSlots = await TimeSlot.create(req.body);

        res.status(201).json("slots Successfully add");

    } catch (err) {

        res.status(400).json({ massage: err.massage });

    }

}

const mentorUpdateSlots = async (req, res) => {


    try {
        const existingSlot = await TimeSlot.findById(req.params.id, req.body)
        if (!existingSlot) return res.status(404).json({ massage: "time slot not found" });

        const newSlots = await TimeSlot.findByIdAndUpdate(req.params.id, req.body, { new: true });

        res.status(201).json("slots Successfully update");

    } catch (err) {

        res.status(400).json({ massage: err.massage });

    }



}



const deleteAllSlots = async (req, res) => {


    try {
        const slots = await TimeSlot.deleteMany({});
        if (!slots) return res.status(404).json({ massage: "student not found" });

        res.json({ massage: 'donor Delete' });
    } catch (err) {
        res.status(500).json({ massage: err.massage });
    }

}

const studentFindBookSlots = async (req, res) => {

    try {

        const studentId = req.params.studentId

        const search = { "studentId": studentId }

        const slots = await BookSlots.find(search)

        res.json(slots);

    } catch (err) {
        res.status(500).json({ massage: err.massage });

    }

}


const mentorFindBookSlots = async (req, res) => {

    try {

        const mentorId = req.params.mentorId
        const search = { "mentorId": mentorId }
        const slots = await BookSlots.find(search)


        res.json(slots);

    } catch (err) {
        res.status(500).json({ massage: err.massage });

    }

}

const studentBookSlots = async (req, res) => {

    try {

        const { bookSlotId, ActivitySlotsId, studentId } = req.body
        const search = { "bookSlotId": bookSlotId }
        const search2 = { "ActivitySlotsId": ActivitySlotsId }
        const search3 = { "studentId": studentId }
        //console.log(search, search2)

        const existingSlotBook = await BookSlots.findOne({ $and: [search, search2] })

        if (existingSlotBook) return res.status(409).json({ massage: "slot all ready booked" });


        const existingSlot = await BookSlots.findOne({ $and: [search2, search3] })

        if (existingSlot) return res.status(409).json({ massage: "you booked slot all ready for this session" });

        await BookSlots.create(req.body);

        res.status(201).json({ massage: "slots book successfully add" });

    } catch (err) {

        res.status(400).json({ massage: err.massage });

    }

}

const studentBookSlotsDelete = async (req, res) => {

    try {

        const studentId = req.params.studentId
        const ActivitySlotsId = req.params.ActivitySlotsId

        const search = { "studentId": studentId, "ActivitySlotsId": ActivitySlotsId }


        const slots = await BookSlots.deleteOne(search);

        //if (!slots) return res.status(404).json({ massage: "student not found" });


        res.json(slots);

    } catch (err) {
        res.status(500).json({ massage: err.massage });

    }

}

const deleteAllBookedSlots = async (req, res) => {

    try {

        const slots = await BookSlots.deleteMany({});

        //if (!slots) return res.status(404).json({ massage: "student not found" });


        res.json(slots);

    } catch (err) {
        res.status(500).json({ massage: err.massage });

    }

}

module.exports = {
    serverStatus,
    studentIdSlots,
    mentorIdSlots,
    mentorDeleteSlots,
    mentorSentSlots,
    deleteAllSlots,
    studentFindBookSlots,
    mentorFindBookSlots,
    studentBookSlots,
    studentBookSlotsDelete,
    deleteAllBookedSlots,
    mentorUpdateSlots
}
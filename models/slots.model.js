const mongoose = require('mongoose');

const SlotsSchema = new mongoose.Schema(
    {
        startTime: {
            type: String,
            required: true,
        },
        endTime: {
            type: String,
            required: true,
        },
        day: {
            type: String,
            required: true,
        },
        date: {
            type: String,
            required: true,
        },
    },
);

const TimeSlotSchema = new mongoose.Schema(
    {
        heading: {
            type: String,
            required: true,

        },
        mentorId: {
            type: String,
            required: true,

        },
        mentorName: {
            type: String,
            required: true,

        },

        timeSlots: {
            type: [SlotsSchema],
            required: true,
            default: [],
        },
    },
    {
        timestamps: true
    }
);

// Create and export the model


const bookSlotsSchema = new mongoose.Schema(

    {
        startTime: {
            type: String,
            required: true,
        },
        endTime: {
            type: String,
            required: true,
        },
        day: {
            type: String,
            required: true,
        },
        date: {
            type: String,
            required: true,
        },
        bookSlotId: {
            type: String,
            required: true,
        },
        mentorId: {
            type: String,
            required: true,
        },
        ActivitySlotsId: {
            type: String,
            required: true,
        },
        studentId: {
            type: String,
            required: true,
        },
        mentorName: {
            type: String,
            required: true,

        },
        studentName: {
            type: String,
            required: true,

        },
        heading: {
            type: String,
            required: true,

        },

    },
);

const TimeSlot = mongoose.model('TimeSlot', TimeSlotSchema);
const BookSlots = mongoose.model('bookSlotDetail', bookSlotsSchema);


module.exports = { TimeSlot, BookSlots };
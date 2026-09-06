const express = require('express');
const router = express.Router();

const { studentIdSlots,
    mentorIdSlots,
    mentorDeleteSlots,
    mentorSentSlots,
    deleteAllSlots,
    studentFindBookSlots,
    mentorFindBookSlots,
    studentBookSlots,
    studentBookSlotsDelete,
    deleteAllBookedSlots } = require('../controllers/SlotsController')



router.get('/:studentId', studentIdSlots)
router.get('/:mentorId', mentorIdSlots)
router.delete('/:mentorId/:sessionId', mentorDeleteSlots)
router.post('/', mentorSentSlots)


router.delete('/', deleteAllSlots)


router.get('/booksSlots/student/:studentId', studentFindBookSlots)
router.get('/booksSlots/mentor/:mentorId', mentorFindBookSlots)
router.post('/booksSlots', studentBookSlots)
router.delete('/booksSlots/:studentId/:ActivitySlotsId', studentBookSlotsDelete)

router.delete('/booksSlots/', deleteAllBookedSlots)


module.exports = router;

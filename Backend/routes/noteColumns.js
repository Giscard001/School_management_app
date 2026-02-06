const express = require('express');
const router = express.Router();
const {
    createNoteColumn,
    getNoteColumns,
    updateNoteColumn,
    deleteNoteColumn,
    importNotesFromExcel
} = require('../controllers/noteColumnController');

const { protect } = require('../middleware/auth');

// Toutes les routes nécessitent une authentification
router.use(protect);

router.route('/')
    .get(getNoteColumns)
    .post(createNoteColumn);

router.route('/:id')
    .put(updateNoteColumn)
    .delete(deleteNoteColumn);

router.post('/:id/import', importNotesFromExcel);

module.exports = router;

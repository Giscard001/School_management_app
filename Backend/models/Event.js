const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Le titre est requis'],
        trim: true
    },
    type: {
        type: String,
        required: [true, 'Le type est requis'],
        enum: ['council', 'meeting', 'outing', 'other'],
        default: 'other'
    },
    classe: {
        type: String, // Can be a string like "Terminale S" or a ref to Classe if needed
        trim: true
    },
    date: {
        type: Date,
        required: [true, 'La date est requise']
    },
    time: {
        type: String, // Format: "HH:mm"
        required: [true, "L'heure est requise"]
    },
    notes: {
        type: String,
        trim: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Event', EventSchema);

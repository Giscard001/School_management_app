const Attendance = require('../models/Attendance');
const User = require('../models/User');
const Classe = require('../models/Classe');
const Notification = require('../models/Notification');

// @desc    Get all students for a specific class
// @route   GET /api/v1/attendance/students/:classeId
// @access  Private
exports.getStudentsByClass = async (req, res, next) => {
    try {
        const students = await User.find({
            classe: req.params.classeId,
            role: 'ELEVE'
        }).select('nom prenom email photo status matricule');

        res.status(200).json({
            success: true,
            count: students.length,
            data: students
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// @desc    Save attendance for a class
// @route   POST /api/v1/attendance
// @access  Private
exports.saveAttendance = async (req, res, next) => {
    try {
        const { classeId, attendanceList, date } = req.body;

        if (!classeId || !attendanceList || !Array.isArray(attendanceList)) {
            return res.status(400).json({ success: false, error: 'Données d\'appel invalides' });
        }

        const attendanceData = attendanceList.map(item => ({
            eleve: item.studentId,
            classe: classeId,
            professeur: req.user.id,
            date: date || new Date(),
            statut: item.status,
            observations: item.observations
        }));

        const records = await Attendance.insertMany(attendanceData);

        // Notify CPE if there are absences
        const absences = attendanceData.filter(a => a.statut === 'absent');
        if (absences.length > 0) {
            const classInfo = await Classe.findById(classeId);
            const cpes = await User.find({ role: 'CPE' });

            if (cpes.length > 0) {
                await Notification.create({
                    sender: req.user.id,
                    subject: 'Nouvel appel : Absences signalées',
                    content: `Le professeur a signalé ${absences.length} absence(s) dans la classe ${classInfo ? classInfo.nom : 'Inconnue'}.`,
                    type: 'role',
                    targetRoles: ['CPE'],
                    recipients: cpes.map(c => ({ user: c._id }))
                });
            }
        }

        res.status(201).json({
            success: true,
            count: records.length,
            data: records
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// @desc    Get attendance statistics for a class
// @route   GET /api/v1/attendance/stats/:classeId
// @access  Private
exports.getClassAttendanceStats = async (req, res, next) => {
    try {
        const totalAbsences = await Attendance.countDocuments({
            classe: req.params.classeId,
            statut: 'absent'
        });

        // Get class average (if we had grades merged here, but for now just attendance)
        // This is a placeholder for more complex logic if needed

        res.status(200).json({
            success: true,
            data: {
                totalAbsences,
                incidents: 0, // Placeholder
                average: 0 // Placeholder
            }
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// @desc    Get detailed attendance list for students in a class
// @route   GET /api/v1/attendance/list/:classeId
// @access  Private
exports.getDetailedAttendanceList = async (req, res, next) => {
    try {
        const students = await User.find({
            classe: req.params.classeId,
            role: 'ELEVE'
        }).select('nom prenom email photo createdAt');

        const detailedList = await Promise.all(students.map(async (student) => {
            const absences = await Attendance.countDocuments({
                eleve: student._id,
                statut: 'absent'
            });

            return {
                id: student._id,
                name: `${student.prenom} ${student.nom}`,
                avatar: student.photo,
                registrationDate: student.createdAt.toLocaleDateString('fr-FR'),
                absences,
                absenceTrend: null, // Logic for trend could be added
                reports: 0, // Placeholder
                average: 0, // Placeholder
                status: absences > 10 ? 'À surveiller' : 'Régulier'
            };
        }));

        res.status(200).json({
            success: true,
            data: detailedList
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

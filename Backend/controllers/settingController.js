const Setting = require('../models/Setting');

exports.getSettings = async (req, res) => {
    try {
        const settings = await Setting.find();
        res.status(200).json({
            success: true,
            data: settings
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            error: err.message
        });
    }
};

exports.getSettingByKey = async (req, res) => {
    try {
        const setting = await Setting.findOne({ key: req.params.key });
        if (!setting) {
            return res.status(404).json({
                success: false,
                error: 'Réglage non trouvé'
            });
        }
        res.status(200).json({
            success: true,
            data: setting
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            error: err.message
        });
    }
};

exports.updateSetting = async (req, res) => {
    try {
        let setting = await Setting.findOne({ key: req.params.key });

        if (setting) {
            setting.value = req.body.value;
            setting.updatedAt = Date.now();
            await setting.save();
        } else {
            setting = await Setting.create({
                key: req.params.key,
                value: req.body.value
            });
        }

        res.status(200).json({
            success: true,
            data: setting
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            error: err.message
        });
    }
};

const express = require('express');
const router = express.Router();
const { getSettings, getSettingByKey, updateSetting } = require('../controllers/settingController');

router.route('/')
    .get(getSettings);

router.route('/:key')
    .get(getSettingByKey)
    .put(updateSetting);

module.exports = router;

const express = require('express');
const router = express.Router();
const data = require('../data/mockData.json');
const { getPlatformStats } = require('../services/analytics');

// A rota deve ser apenas '/'
router.get('/', (req, res) => {
    const stats = getPlatformStats(data);
    res.json(stats);
});

module.exports = router;
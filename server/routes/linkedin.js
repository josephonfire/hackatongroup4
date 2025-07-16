// Endpoint para acessar os dados do linkedin

const express = require('express');
const router = express.Router();
const data = require('../data/mockData.json');
const { getPlatformStats, calculateCtr, calculateCpc } = require('../services/analytics');

router.get('/', (req, res) => {
    try {
        const linkedinData = data.filter(item => item.platform === 'Linkedin');
        
        const result = linkedinData.map(entry => ({
            ...entry,
            ctr: calculateCtr(entry.impressions, entry.clicks),
            cpc: calculateCpc(entry.cost, entry.clicks),
        }));

        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar dados do Linkedin' }); 
    }
});

module.exports = router;
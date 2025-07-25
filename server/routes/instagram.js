// Endpoint para acessar os dados do instagram

const express = require('express');
const router = express.Router();
const data = require('../data/mockData.json');
const { getPlatformStats, calculateCtr, calculateCpc } = require('../services/analytics');

router.get('/', (req, res) => {
    try {
        const instagramData = data.filter(item => item.platform === 'Instagram');
        
        const result = instagramData.map(entry => ({
            ...entry,
            ctr: calculateCtr(entry.impressions, entry.clicks),
            cpc: calculateCpc(entry.cost, entry.clicks),
        }));

        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar dados do Instagram' }); 
    }
});

module.exports = router;
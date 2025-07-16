// Função para calcular as estatísticas de cada plataforma
function getPlatformStats(data) {
    return data.map(entry => ({
        ...entry,
        cpc: (entry.cost / entry.clicks).toFixed(2), // Custo por clique
        cpm: (entry.cost / entry.impressions * 1000).toFixed(2), // Custo por mil impressões
        ctr: ((entry.clicks / entry.impressions) * 100).toFixed(2), // Taxa de cliques
        cvr: ((entry.conversions / entry.clicks) * 100).toFixed(2), // Taxa de conversão
        roas: ((entry.revenue / entry.cost) * 100).toFixed(2),
    }));
}

module.exports = { getPlatformStats };
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

// Funções para calcular a taxa de cliques
function calculateCtr(impressions, clicks) {
    if (impressions === 0) return "0.00"; // se não houver impressões, o CTR é 0
    return ((clicks / impressions) * 100).toFixed(2); // retorna então CTR = (cliques / impressões) * 100 e passa para duas casas decimais
}

// Função para calcular o custo por clique
function calculateCpc(cost, clicks) { 
    if (clicks === 0) return "0.00"; // se não houver cliques, o CPC é 0
    return (cost / clicks).toFixed(2); // retorna então CPC = custo / cliques e passa para duas casas decimais
}

module.exports = { getPlatformStats, calculateCtr, calculateCpc };
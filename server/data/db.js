// importar módulo MongoDB
const { MongoClient } =  require('mongodb')

// Conexão URL
const url = "mongodb+srv://josephpedro:346805@cluster1.fxrvdh5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1"

// DB name
const defaultNameDb = "AdCharter"

// Conexão
let client = undefined;

// Conexão à base de dados
async function getConnection() {
    if (!client) {
        try {
            client = await MongoClient.connect(url)
        } catch (err) {
            console.log(err)
        }
    }
    return client;
}

// Fechar conexão à db
async function closeConnection() {
    const client = await getConnection();
    console.log(client);
    return await client.close()
}

// Aceder à coleção 
async function getCollection(collectionName) {
    const client = await getConnection();
    const db = client.db(defaultNameDb);
    return db.collection(collectionName)
}


// Exportar para outros ficheiros as conexões
module.exports = {getConnection, closeConnection, getCollection}
import dbConn from "../../utils/db/database.js";

export async function getAppByApiKeyApiSecretRepo(apiKey, apiSecret) {
    const conn = await dbConn.getConnection();
    return await conn.collection('apps').findOne({
        apiKey, apiSecret
    });
}
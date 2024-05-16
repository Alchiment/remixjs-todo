import { getAppByApiKeyApiSecretRepo } from "../repositories/app.repository.js";

export async function getAppByApiKeyApiSecret(apiKey, apiSecret) {
    return await getAppByApiKeyApiSecretRepo(apiKey, apiSecret);
}
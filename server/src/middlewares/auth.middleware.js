import jwt from "jsonwebtoken";
import 'dotenv/config';
import { secret } from "../../utils/auth/auth.utils.js";
import { getAppByApiKeyApiSecret } from "../services/app.service.js";

export async function verifyJwt(req, res, next) {
    const authenticationForUser = () => {
        const token = req.headers.authorization ? req.headers.authorization.split(' ')[1]: null;
        const decoded = jwt.verify(token, secret);
        if (!decoded) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        req.auth = decoded;
        next();
    }

    const authenticationForApp = async () => {
        let params = {};
        if (req.method === 'GET') {
            params = req.query;
        } else if(req.method === 'POST') {
            params = req.body;
        }
        const {apiKey, apiSecret} = params;
        const app = await getAppByApiKeyApiSecret(apiKey, apiSecret);
        if (!app) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        req.user = {apiKey, apiSecret};
        next();
    }

    try {
        const nonSecurePaths = ['/api/auth/login', '/graphql'];
        if (nonSecurePaths.includes(req.path)) {
            // Verify GraphQL requests via Apollo Sanbox
            if (req.path !== '/graphql' || (req.path === '/graphql' && req.method !== 'POST')) {
                return next();
            }
        }
        const hasAuthorizationToken = !!req.headers.authorization;
        if (hasAuthorizationToken) {
            authenticationForUser();
        } else {
            await authenticationForApp();
        }
    } catch (e) {
        return res.status(401).json({
            code: 401,
            message: e.message,
        });
    }
}
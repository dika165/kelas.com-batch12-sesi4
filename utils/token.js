import jwt from 'jsonwebtoken';
import { errorResp } from './response.js';

const SECRET_KEY_ACCESS_TOKEN= "kelas.com";
const SECRET_KEY_REFRESH_TOKEN= "backend";

export const validateToken = (request, response, next) => {
    const authHeader = request.headers.authorization;
    const accessToken = authHeader && authHeader.split(' ')[1];

    if(accessToken) {
        jwt.verify(accessToken, SECRET_KEY_ACCESS_TOKEN, (error, claims) => {
            if(error) {
                errorResp(response, error.message, 403)
            } else {
                request.claims = claims;
                next();
            }
        })
    } else {
        errorResp(response, "invalid request, authorization not found!!", 401);
    }
}
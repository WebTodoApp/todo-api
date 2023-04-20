import { FastifyRequest, FastifyReply } from "fastify"
import { database } from "../server";
import response from "../utils/response";

// Get entity by id
async function getByIdC(req: FastifyRequest, res: FastifyReply) {
    try {
        const user  = req.body;
                
        delete user['password'];

        res.code(response.returnType.HTTP_STATUS[200].statusCode).send(response.responseOK(response.returnType.USER.FOUND, {
            user: req.body
        }))
    } catch (err) {
        response.handleResponseError(res, err, 500)
    }
}


export default {
    getByIdC
}

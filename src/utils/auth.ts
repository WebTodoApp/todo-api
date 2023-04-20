
import { FastifyRequest, FastifyReply } from 'fastify'
import { database } from "../server";
import response from "./response"; 
import * as JWT from 'jsonwebtoken'
import * as bcrypt from 'bcrypt'
import { log } from 'console';

export const authUtils = {
    genSalt: (saltRounds, value) => {
        return new Promise((resolve, reject) => {
            const salt = bcrypt.genSaltSync(saltRounds)
            bcrypt.hash(value, salt, (err, hash) => {
                if (err) reject(err)
                resolve(hash)
            })
        })
    },
    compareHash: (hash, value) => {
        return new Promise((resolve, reject) => {
            bcrypt.compare(value, hash, (err, result): boolean | any => {
                if (err) reject(err)
                resolve(result)
            })
        })
    },


}


export const checkValidRequest = async  (req: FastifyRequest, res: FastifyReply) => {
    try {
        let token = req.headers.authorization;
        token = token?.replace('Bearer ', '');
        if (!token) {
            return res.code(response.returnType.HTTP_STATUS[400].statusCode).send(response.responseERROR(response.returnType.SERVER.MISSING_TOKEN));
        };
        
        JWT.verify(token, process.env.APP_JWT_SECRET, (err, decoded) => {            
            if (err) {
                return res.code(response.returnType.HTTP_STATUS[401].statusCode).send(response.returnType.HTTP_STATUS[401].message);
            }
        });        
    } catch (err) {
        response.handleResponseError(res, err, 401);
    }
}

export const checkValidUser = async (req: FastifyRequest, res: FastifyReply) => {
    try {
        let token = req.headers.authorization;
        token = token.replace('Bearer ', '');
        if (!token) {
            return res.code(response.returnType.HTTP_STATUS[400].statusCode).send(response.responseERROR(response.returnType.SERVER.MISSING_TOKEN));
        };
    
        const user:any = JWT.verify(token, process.env.APP_JWT_SECRET)            
        if (!user.id) {
            return res.code(response.returnType.HTTP_STATUS[401].statusCode).send(response.returnType.HTTP_STATUS[401].message);
        };

        const userData = await database.user.findUnique({ where: { id: user.id } });
        if (!userData) {
            return res.code(response.returnType.HTTP_STATUS[401].statusCode).send(response.returnType.HTTP_STATUS[401].message);
        };

        req.body = userData;
    } catch (err) {
        response.handleResponseError(res, err, 401);
    }
}

export const checkValidUserGroup = async (req: FastifyRequest, res: FastifyReply, done) => {
    try {
        
        let token:string = req.headers.authorization;
        let groupId:number = req?.params['groupId'];
                     
        token = token.replace('Bearer ', '');
        if (!token) {
            return res.code(response.returnType.HTTP_STATUS[400].statusCode).send(response.responseERROR(response.returnType.SERVER.MISSING_TOKEN));
        };
                
        const user: any = JWT.verify(token, process.env.APP_JWT_SECRET)
        if (!user.id) {
            return res.code(response.returnType.HTTP_STATUS[401].statusCode).send(response.returnType.HTTP_STATUS[401].message);
        };
        
        const userData = await database.user.findUnique({ 
            where: { 
                id: user.id 
            }, 
            select: {
                id: true
            }
        });
        if (!userData) {
            return res.code(response.returnType.HTTP_STATUS[401].statusCode).send(response.returnType.HTTP_STATUS[401].message);
        };

        if(groupId){
            const groupData = await database.group.findFirst({
                where: {
                    AND: [
                        { id: groupId },
                        { userId: user.id },
                    ],
                },
                select: {
                    name: true,
                    todo: true
                },
            });
            if (!groupData) {
                res.code(response.returnType.HTTP_STATUS[404].statusCode).send(response.responseERROR(response.returnType.GROUP.UNABLE_TO_VERIFY))
            }            
        }
        
        if (req.body) {
            let userId = {"userId": user.id}
            req.body["userId"] = userId.userId;
        } else {
            req.body = {"userId": user.id };
        }   
    } catch (err) {        
        response.handleResponseError(res, err, 401);
    }
}
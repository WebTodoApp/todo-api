import { FastifyRequest, FastifyReply } from "fastify"
import { database } from "../server";
import { authUtils } from "../utils/auth";
import bcrypt  from "bcrypt";
import * as JWT from 'jsonwebtoken'
import response from "../utils/response";

//constants
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX = /^(?=.*\d).{4,30}$/;


// Login entity
async function loginC(req: FastifyRequest, res: FastifyReply) {
    try {
        let email:string =  req.body['email']
        let password:string =  req.body['password']
        
        const user = await database.user.findUnique({
            where: { 
                email: email 
            },
            select: {
                id : true,
                email: true,
                username: true,
                password: true
            }
        });
        if (!user) {
            res.code(response.returnType.HTTP_STATUS[400].statusCode).send(response.responseERROR(response.returnType.USER.NOT_FOUND))
        }
    
        // const checkPass = await authUtils.compareHash(password, user.password);
        const checkPass = await bcrypt.compare(password, user.password);        
        if (!checkPass) {
            res.code(response.returnType.HTTP_STATUS[400].statusCode).send(response.responseERROR(response.returnType.USER.UNABLE_TO_VERIFY))
        }

        delete user.password

        const token = JWT.sign(
            {
                id: user.id,
                email: user.email,
            },
            process.env.APP_JWT_SECRET,
        )

        res.code(response.returnType.HTTP_STATUS[200].statusCode).send(response.responseOK(response.returnType.USER.SUCCESS_LOGIN, {
            user: user,
            token: token,
        }))
    } catch (err) {
        response.handleResponseError(res, err, 500)
    }
}

async function registerC(req: FastifyRequest, res: FastifyReply) {
    try {        
        // const {email, username, password, confirmPassword } = req.body
        let email: string = req.body['email'];
        let username: string = req.body['username'];
        let password: string = req.body['password'];
        let confirmPassword:string = req.body['confirmPassword'];

        
        if (!EMAIL_REGEX.test(email.trim())) {
            return res.code(400).send(response.responseERROR(response.returnType.USER.WRONG_EMAIL));
        }
        if (!PASSWORD_REGEX.test(password.trim())) {
            return res.code(400).send(response.responseERROR(response.returnType.USER.WRONG_PASSWORD));
        }
        if (password.trim() !== confirmPassword.trim()) {
            res.code(response.returnType.HTTP_STATUS[400].statusCode).send(response.responseERROR(response.returnType.USER.DIFFERENT_PASSWORD))
        }

        const user = await database.user.findUnique({ where: { email: email } })

        
        if (user) {
            res.code(response.returnType.HTTP_STATUS[400].statusCode).send(response.responseERROR(response.returnType.USER.EMAIL_EXIST))
        }

        let passwordHash = await authUtils.genSalt(10, password);
        
        const createUser = await database.user.create({
            data: {
                email: String(email),
                username: String(username),
                password: String(passwordHash),
            },
            select: {
                id: true,
                email: true,
                username: true
            }
        });
        
        if(!createUser){
            res.code(response.returnType.HTTP_STATUS[500].statusCode).send(response.responseERROR(response.returnType.USER.CANT_CREATE))
        }

        const token = JWT.sign(
            {
                id: createUser.id,
                email: createUser.email,
            },
            process.env.APP_JWT_SECRET,
        );
        
        res.code(response.returnType.HTTP_STATUS[201].statusCode).send(response.responseOK(response.returnType.USER.SUCCESS_SIGNUP, {
            user: createUser,
            token
        }));
    } catch (err) {
        // console.log(err);
        response.handleResponseError(res, err, 500)
    }
}

export default {
    loginC,
    registerC
}

import { FastifyRequest, FastifyReply } from "fastify"
import { database } from "../server";
import response from "../utils/response";

// Gets all entities
async function getAllByIdC(req, res) {
    try {
        // const {email, username, password, confirmPassword } = req.body
        let userId:number = req.body['userId'];

        const groups = await database.group.findMany({
            where: { userId : userId },
            select: {
                id: true,
                name: true,
                todo: true
            },
        });
        if (!groups) {
            res.code(response.returnType.HTTP_STATUS[500].statusCode).send(response.responseERROR(response.returnType.GROUP.NOT_FOUND))
        }

        res.code(response.returnType.HTTP_STATUS[200].statusCode).send(response.responseOK(response.returnType.GROUP.FOUND, {
            group: groups
        }));
    } catch (err) {
        // console.log(err);
        response.handleResponseError(res, err, 500)
    }
}


// Get entity by id
async function getByIdC(req, res) {
    try {
        // const {email, username, password, confirmPassword } = req.body
        let groupId:number = req.params['groupId'];

        const group = await database.group.findFirst({
            where: { 
                id: groupId 
            },
            select: {
                name: true,
                todo: true
            },
        });
        if (!group) {
            res.code(response.returnType.HTTP_STATUS[404].statusCode).send(response.responseERROR(response.returnType.GROUP.NOT_FOUND))
        }

        res.code(response.returnType.HTTP_STATUS[200].statusCode).send(response.responseOK(response.returnType.GROUP.FOUND, {
            group: group
        }));
    } catch (err) {
        // console.log(err);
        response.handleResponseError(res, err, 500)
    }
}


// Post entity by id
async function postC(req: FastifyRequest, res: FastifyReply) {
    try {
        // const {email, username, password, confirmPassword } = req.body                
        let name:string = req.body['name'];
        let userId:number = req.body['userId'];
        
        const createGroup = await database.group.create({
            data: {
                name: String(name),
                userId: Number(userId)
            },
            select: {
                name: true
            }
        });
        if (!createGroup) {
            res.code(response.returnType.HTTP_STATUS[500].statusCode).send(response.responseERROR(response.returnType.GROUP.CANT_CREATE))
        }
        
        res.code(response.returnType.HTTP_STATUS[201].statusCode).send(response.responseOK(response.returnType.GROUP.CREATED, {
            group: createGroup
        }));
    } catch (err) {
        // console.log(err);
        response.handleResponseError(res, err, 500)
    }
}


// Update entity by Id
async function updateByIdC(req, res){
    try {
        // const {email, username, password, confirmPassword } = req.body
        let name:string = req.body['name'];        
        let groupId:number = req.params['groupId'];

        const updateGroup = await database.group.update({
            where: {
                id: groupId
            },
            data: {
                name: name
            },
            select: {
                name: true,
                todo: true
            }
        });
        if (!updateGroup) {
            res.code(response.returnType.HTTP_STATUS[404].statusCode).send(response.responseERROR(response.returnType.GROUP.CANT_UPDATE))
        }

        res.code(response.returnType.HTTP_STATUS[200].statusCode).send(response.responseOK(response.returnType.GROUP.UPDATED, {
            group: updateGroup
        }));
    } catch (err) {
        // console.log(err);
        response.handleResponseError(res, err, 500)
    }
} 


// Delete entity by Id
async function deleteByIdC(req, res) {
    try {
        // const {email, username, password, confirmPassword } = req.body
        let userId:number = req.params['userId'];
        let groupId:number = req.params['groupId'];

        const group = await database.group.findFirst({
            where: {
                AND: [
                    { id: groupId },
                    { userId : userId },
                ],
            },
            select: {
                id: true,
                name: true
            }        
        });
        if(!group) {
            res.code(response.returnType.HTTP_STATUS[404].statusCode).send(response.responseERROR(response.returnType.GROUP.UNABLE_TO_VERIFY))
        }

        const deleteGroup = await database.group.delete({
            where: { id: groupId },
            select: {
                id: true,
                name: true,
                todo: true
            }
        });
        if (!deleteGroup) {
            res.code(response.returnType.HTTP_STATUS[500].statusCode).send(response.responseERROR(response.returnType.GROUP.CANT_DELETE))
        }

        res.code(response.returnType.HTTP_STATUS[200].statusCode).send(response.responseOK(response.returnType.GROUP.DELETED, {
            group: deleteGroup
        }));
    } catch (err) {
        // console.log(err);
        response.handleResponseError(res, err, 500)
    }
}


export default {
    getAllByIdC,
    getByIdC,
    postC,
    updateByIdC,
    deleteByIdC,
}

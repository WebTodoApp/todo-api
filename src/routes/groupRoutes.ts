import { FastifyInstance } from 'fastify';
import groupValidations from '../validations/groupValidations';
import groupController from '../controllers/groupController';
import { checkValidRequest, checkValidUser, checkValidUserGroup } from '../utils/auth';

export default async function routes (server: FastifyInstance|any) {
    const groupRoutes = [
        {
            method: 'GET',
            url: '/all',
            tags: ['Group'],
            schema: groupValidations.getAllByIdv.valueOf(),
            preHandler: [checkValidRequest, checkValidUserGroup],
            handler: groupController.getAllByIdC
        },
        {
            method: 'GET',
            url: '/:groupId',
            schema: groupValidations.getByIdV.valueOf(),
            preHandler: [checkValidRequest, checkValidUserGroup],
            handler: groupController.getByIdC
        },
        {
            method: 'POST',
            url: '/',
            schema: groupValidations.postV.valueOf(),
            preHandler: [checkValidRequest, checkValidUserGroup],
            handler: groupController.postC
        },
        {
            method: 'PUT',
            url: '/:groupId',
            schema: groupValidations.updateByIdV.valueOf(),
            preHandler: [checkValidRequest, checkValidUserGroup],
            handler: groupController.updateByIdC
        },
        {
            method: 'DELETE',
            url: '/:groupId',
            schema: groupValidations.deleteByIdV.valueOf(),
            preHandler: [checkValidRequest, checkValidUserGroup],
            handler: groupController.deleteByIdC
        },
    ];


    groupRoutes.forEach(route => {        
        server.route(route)
    })
}

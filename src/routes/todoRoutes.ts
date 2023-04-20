import { FastifyInstance } from 'fastify';
import todoValidations from '../validations/todoValidations';
import todoController from '../controllers/todoController';
import { checkValidRequest, checkValidUser } from '../utils/auth';

export default async function routes (server: FastifyInstance|any) {
    const todoRoutes = [
        {
            method: 'GET',
            url: '/getById/:id',
            schema: todoValidations.getByIdV.valueOf(),
            handler: todoController.getByIdC
        },
        {
            method: 'POST',
            url: '/post',
            schema: todoValidations.postV.valueOf(),
            preHandler: [checkValidRequest, checkValidUser],
            handler: todoController.postC
        },
        {
            method: 'PUT',
            url: '/updateById/:id',
            schema: todoValidations.updateByIdV.valueOf(),
            handler: todoController.updateByIdC
        },
        {
            method: 'DELETE',
            url: '/deleteById/:id',
            schema: todoValidations.deleteByIdV.valueOf(),
            handler: todoController.deleteByIdC
        },
    ];


    todoRoutes.forEach(route => {
        server.route(route)
    })
}

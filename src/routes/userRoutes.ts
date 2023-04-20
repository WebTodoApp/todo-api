import { FastifyInstance } from 'fastify';
import userValidations from '../validations/userValidations';
import userController from '../controllers/userController';
import { checkValidRequest, checkValidUser } from '../utils/auth';

export default async function routes(server: FastifyInstance|any) {
    const userRoutes = [
        {
            method: 'GET',
            url: '/profile',
            schema: userValidations.getByIdV.valueOf(),
            preHandler: [checkValidRequest, checkValidUser],
            handler: userController.getByIdC
        }
        //  {
        //     method: 'PUT',
        //     url: '/update-profile/:id',
        //     schema: authValidations.updateByIdV,
        //     handler: authController.updateByIdVC
        // },
        // {
        //     method: 'DELETE',
        //     url: '/deleteById/:id',
        //     schema: authValidations.deleteByIdV,
        //     handler: authController.deleteByIdC
        // }

    ];

    userRoutes.forEach(route => {
        server.route(route)
    })
}

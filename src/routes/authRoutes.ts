import { FastifyInstance } from 'fastify';
import authValidations from '../validations/authValidations';
import authController from '../controllers/authController';

export default async function routes(server: FastifyInstance|any) {
    const authRoutes = [
        {
            method: 'POST',
            url: '/login',
            schema: authValidations.loginV.valueOf(),
            handler: authController.loginC
        },
        {
            method: 'POST',
            url: '/register',
            schema: authValidations.registerV.valueOf(),
            handler: authController.registerC
        }
    ];

    authRoutes.forEach(route => {
        server.route(route)
    })
}

// //Require the dev-dependencies
import { app, database }  from "../server";
const supertest = require('supertest')(app.server);

describe('Test api routes', () => {
    describe('Auth tests routes', () => {
        test('should create a new user', async () => {
            await app.ready();
            const res = await supertest
            .post('/api/auth/register')
            .send({
                email: "test@test.com",
                password: "test1",
                confirmPassword: "test1",
                username: "mainTester",
            }); 
            const success = res.body.success;                     
            expect(success).toEqual(true)
            expect(res.header['content-type']).toEqual('application/json; charset=utf-8')   
            expect(res.statusCode).toEqual(201)
            expect(res.body.body).toHaveProperty('user')
            expect(res.body.body).toHaveProperty('token')
        });
    
        test('should login a user', async () => {
            await app.ready();
            const res = await supertest
                .post('/api/auth/login')
                .send({
                    email: "test@test.com",
                    password: "test1",
                });  
            const success = res.body.success;
            expect(success).toEqual(true)
            expect(res.header['content-type']).toEqual('application/json; charset=utf-8')   
            expect(res.statusCode).toEqual(200)
            expect(res.body.body).toHaveProperty('user')
            expect(res.body.body).toHaveProperty('token')
        })
    })


    describe('User tests routes', () => {
        let token;
        beforeAll(async () => {
            await app.ready();
            const res = await supertest
                .post('/api/auth/login')
                .send({
                    email: "test@test.com",
                    password: "test1",
                })
            token = res.body?.body?.token;
        });
        test('should return user profile', async () => {
            await app.ready();
            const res = await supertest
                .get('/api/user/profile')
                .set('Authorization', `Bearer ${token}`);
            const success = res.body.success;
            expect(success).toEqual(true)
            expect(res.header['content-type']).toEqual('application/json; charset=utf-8')
            expect(res.statusCode).toEqual(200)
            expect(res.body.body).toHaveProperty('user')
        });
    })

    describe('Group tests routes', () => {
        let token;
        beforeAll(async () => {
            await app.ready();
            const res = await supertest
                .post('/api/auth/login')
                .send({
                    email: "test@test.com",
                    password: "test1",
                })
            token = res.body?.body?.token;
        });
        test('should post a group', async () => {
            await app.ready();
            const res = await supertest
                .post('/api/group')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    name: "groupName"
                });
            const success = res.body.success;
            expect(success).toEqual(true)
            expect(res.header['content-type']).toEqual('application/json; charset=utf-8')
            expect(res.statusCode).toEqual(201)
            expect(res.body.body).toHaveProperty('group')
        });

        test('should update a group', async () => {
            await app.ready();
            const res = await supertest
                .put('/api/group/1')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    name: "groupName"
                });
            const success = res.body.success;
            expect(success).toEqual(true)
            expect(res.header['content-type']).toEqual('application/json; charset=utf-8')
            expect(res.statusCode).toEqual(200)
            expect(res.body.body).toHaveProperty('group')
        });

        test('should get a group detail', async () => {
            await app.ready();
            const res = await supertest
                .get('/api/group/1')
                .set('Authorization', `Bearer ${token}`);
            const success = res.body.success;
            expect(success).toEqual(true)
            expect(res.header['content-type']).toEqual('application/json; charset=utf-8')
            expect(res.statusCode).toEqual(200)
            expect(res.body.body).toHaveProperty('group')
        });

        test('should get all groups detail', async () => {
            await app.ready();
            const res = await supertest
                .get('/api/group/all')
                .set('Authorization', `Bearer ${token}`);
            const success = res.body.success;
            expect(success).toEqual(true)
            expect(res.header['content-type']).toEqual('application/json; charset=utf-8')
            expect(res.statusCode).toEqual(200)
            expect(res.body.body).toHaveProperty('group')
        });

        test('should delete a group', async () => {
            await app.ready();
            const res = await supertest
                .delete('/api/group/1')
                .set('Authorization', `Bearer ${token}`);
            const success = res.body.success;
            expect(success).toEqual(true)
            expect(res.header['content-type']).toEqual('application/json; charset=utf-8')
            expect(res.statusCode).toEqual(200)
            expect(res.body.body).toHaveProperty('group')
        });
    })
})
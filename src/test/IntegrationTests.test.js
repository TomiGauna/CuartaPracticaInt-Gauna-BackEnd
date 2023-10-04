import mongoose from "mongoose";
import chai from 'chai';
import config from "../config/config.js";
import supertest from "supertest";
import { createHash } from "../utils.js";

const expect = chai.expect;
const requester = supertest(`http://localhost:${config.port}`);

describe('API Testing', () => {

    /////////////////////////////////////////////////////////////////TESTS REGARDING PRODUCTS
    describe(`Products' Endpoints Tests`, () => {

        it('GET /api/products endpoint should display all the products available in the database', async function(){
            this.timeout(5000);

            const { statusCode, ok, body } = await requester.get('/api/products');

            expect(statusCode).to.equal(200);
            expect(ok).to.equal(true);
            expect(body).to.be.a('array');
            expect(body.length).to.be.greaterThanOrEqual(1);
            expect(body[0]).to.have.property('title');
            expect(body[0]).to.have.property('description');
            expect(body[0]).to.have.property('price');
            expect(body[0]).to.have.property('category');
            expect(body[0]).to.have.property('stock');
            expect(body[0]).to.have.property('code');
            expect(body[0]).to.have.property('thumbnail');
            expect(body[0]).to.have.property('owner');
            expect(body[0]).to.have.property('_id');
        });

        it('POST /api/products/:pid endpoint should display a product specified by its id in the endpoint', async function(){
            this.timeout(5000);

            let prodId = '64a370e19c11b929d620d16b';
            const { statusCode, ok, body } = await requester.get(`/api/products/${prodId}`);

            expect(ok).to.be.equal(true);
            expect(statusCode).to.equal(200);
            expect(body.payload).to.be.a('object');
            expect(body.payload).to.have.property('title');
            expect(body.payload.title).to.be.a('string');
            expect(body.payload).to.have.property('description');
            expect(body.payload.description).to.be.a('string');
            expect(body.payload).to.have.property('price');
            expect(body.payload.price).to.be.a('number');
            expect(body.payload).to.have.property('category');
            expect(body.payload.category).to.be.a('string');
            expect(body.payload).to.have.property('code');
            expect(body.payload.code).to.be.a('number');
            expect(body.payload).to.have.property('stock');
            expect(body.payload.stock).to.be.a('number');
            expect(body.payload).to.have.property('thumbnail');
            expect(body.payload.thumbnail).to.be.a('array');
        });

        it('GET /api/products/:pid should NOT bring any product when the id is wrong', async function(){
            this.timeout(5000);
    
            let prodId = '651b94d4f1f45fc30b7c26e4';
            const { statusCode, ok, body } = await requester.get(`/api/products/${prodId}`);
    
            expect(ok).to.be.equal(false);
            expect(statusCode).to.equal(404);
            expect(body.payload).to.equal(undefined);
        })
    });


    //////////////////////////////////////////////////////////////TESTS REGARDING CARTS
    describe(`Carts' Endpoints Tests`, () => {

        it('GET /api/carts should show all the carts saved in the database', async function(){
            this.timeout(5000);

            const { statusCode, ok, body } = await requester.get(`/api/carts`);

            expect(ok).to.equal(true);
            expect(statusCode).to.equal(200);
            expect(body).to.be.a('array');
            expect(body[0]).to.be.a('object');
            expect(body[0]._id).to.be.ok;
            expect(body[0]).to.have.property('products');
        });

        it('GET /api/carts/:cid should return a cart specified by its id and its products', async function(){
            this.timeout(5000);

            let cartId = '649ce690719b6fc7bbdaab1e'
            const { statusCode, ok, body } = await requester.get(`/api/carts/${cartId}`);

            expect(ok).to.equal(true);
            expect(statusCode).to.equal(200);
            expect(body).to.be.a('object');
            expect(body).to.have.property('products');
            expect(body.products).to.be.a('array');
            expect(body.products[0]).to.be.ok;
        });

        it('POST /api/carts should create a new empty cart', async function(){
            this.timeout(5000);

            const { statusCode, ok , body } = await requester.post('/api/carts');
            /* console.log('body: ', body); */

            expect(ok).to.equal(true);
            expect(statusCode).to.equal(201);
            expect(body).to.be.ok;
            expect(body.newCart).to.have.property('products');
            expect(body.msg).to.equal('Cart created successfully')
            expect(body.newCart.products).to.deep.equal([]);
        });
    });


    //////////////////////////////////////////////////////////////////TESTS REGARDING SESSIONS
    describe(`Sessions' Endpoints Tests`, () => {

        it('POST /api/sessions/register endpoint should register a user properly', async function(){
            this.timeout(5000);

            let mockUser = {
                firstName: 'Sam',
                lastName: 'Sparks',
                email: 'samsparks@gmail.com',
                age: 24,
                password: 'testingsessions',
            };

            const { statusCode, ok, body } = await requester.post('/api/sessions/register').send({
                firstName: mockUser.firstName,
                lastName: mockUser.lastName,
                email: mockUser.email,
                age: mockUser.age,
                password: mockUser.password,
            });

            expect(ok).to.equal(true);
            expect(statusCode).to.equal(200);
            expect(body).to.have.property('status');
            expect(body.status).to.equal('success')
            expect(body.message).to.equal('User successfully registered');
        });

        it('POST /api/sessions/register endpoint should NOT register a user that already exists', async function(){
            this.timeout(5000);

            let mockUser = {
                firstName: 'Tom',
                lastName: 'Gray',
                email: 'tomgpremium@gmail.com',
                age: 23,
                password: 'testingsessions',
            };

            const { statusCode, ok, body } = await requester.post('/api/sessions/register').send({
                firstName: mockUser.firstName,
                lastName: mockUser.lastName,
                email: mockUser.email,
                age: mockUser.age,
                password: mockUser.password,
            });

            expect(ok).to.equal(false);
            expect(statusCode).to.equal(302); ////Redirection to /api/sessions/failedregister
            expect(body).to.deep.equal({});
        });

        it('Should login a user properly', async function(){
            this.timeout(5000);

            let userData = {
                username: 'dhowardadmin@gmail.com',
                password: 'dhowardadmin'
            };

            const { statusCode, ok, body } = await requester.post('/api/sessions/login').send({
                username: userData.username,
                password: userData.password,
            });
            console.log(body)

            expect(statusCode).to.equal(200);
            expect(ok).to.be(true);
            expect(body.status).to.equal(1);

        })
    })
});
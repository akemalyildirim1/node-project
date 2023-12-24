import chai from "chai";
import chaiHttp from "chai-http";

import {app} from "../../app.js";

chai.use(chaiHttp);
const expect = chai.expect;

describe('Get /countries', () => {
    it('should return a 200 status code when the region is empty', async () => {
        const response = await chai.request(app).get('/countries');

        expect(response).to.have.status(200);
        expect(response.body).to.be.an('array');
        expect(response.body.length).to.equal(68);
    });

    it('should return a 200 status code when the given region has at least one country ',
        async () => {
            const response = await chai.request(app).get('/countries?region=europe');

            expect(response).to.have.status(200);
            expect(response.body).to.be.an('array');
            expect(response.body.length).to.equal(15);
        });

    it('should return a 404 status code when the given region does not have any country',
        async () => {
            const response = await chai.request(app).get('/countries?region=asia');

            expect(response).to.have.status(404);
            expect(response.body.message).to.equal("No countries found!");
        });
});
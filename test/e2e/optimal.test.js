import chai from "chai";
import chaiHttp from "chai-http";

import {app} from "../../app.js";

chai.use(chaiHttp);
const expect = chai.expect;

describe('Get /optimal', () => {
    it('should return a 200', async () => {
        const response = await chai.request(app).get('/optimal');

        expect(response).to.have.status(200);
        expect(response.body).to.be.an('array');
        expect(response.body.length).to.equal(12);
        response.body.forEach(salesRepresentative => {
            expect(salesRepresentative).to.be.an('object');
            expect(salesRepresentative).to.have.keys(
                'region', 'countryList', 'countryCount'
            );
        });
    });
});
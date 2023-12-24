import chai from "chai";
import chaiHttp from "chai-http";

import {app} from "../../app.js";

chai.use(chaiHttp);
const expect = chai.expect;

describe('Get /salesrep', () => {
    it('should return a 200', async () => {
        const response = await chai.request(app).get('/salesrep');

        expect(response).to.have.status(200);
        expect(response.body).to.be.an('array');
        expect(response.body.length).to.equal(3);
        expect(response.body.some(region => region.region === 'europe' && region.minSalesReq === 3 && region.maxSalesReq === 5)).to.be.true;
    });

});
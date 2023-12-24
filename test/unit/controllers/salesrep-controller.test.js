import chai from "chai";
import chaiAsPromised from "chai-as-promised";

import {connectMongoDB} from "../../../database/mongo.js";
import {getAllCountries} from "../../../controllers/countries-controller.js";
import {
    findRegionsAndCountryNumbers,
    calculateMaxSalesRepresentativeCount,
    calculateMinSalesRepresentativeCount,
    getSalesRepresentativeCount
} from "../../../controllers/salesrep-controller.js";
import config from "../../test.config.js";


chai.use(chaiAsPromised);
const expect = chai.expect;

before(async () => {
        await connectMongoDB(config.mongoDBUri);
    }
);

describe('getSalesRepresentativeCount', () => {

    it("should return an array of objects that includes regions and their max&min sales rep counts", async () => {
        const countries = await getAllCountries({region: undefined});
        const result = getSalesRepresentativeCount(
            {
                countries
            });

        expect(result).to.be.an('array');
        Object.values(result).forEach(country => {
            expect(country).to.be.an('object');
        });
        expect(result.length).to.equal(3);

        expect(result.some(region => region.region === 'europe' && region.minSalesReq === 3 && region.maxSalesReq === 5)).to.be.true;
        expect(result.some(region => region.region === 'apac' && region.minSalesReq === 2 && region.maxSalesReq === 2)).to.be.true;
        expect(result.some(region => region.region === 'america' && region.minSalesReq === 7 && region.maxSalesReq === 15)).to.be.true;
    });
});

describe('findRegionsAndCountryNumbers', () => {

    it("should return regions and country numbers", () => {
        const result = findRegionsAndCountryNumbers({
            countries: [
                {name: 'romania', region: 'europe'},
                {name: 'netherlands', region: 'europe'},
                {name: 'australia', region: 'apac'},
                {name: 'costa rica', region: 'america'},
                {name: 'hungary', region: 'europe'},
                {name: 'cyprus', region: 'europe'},
            ]
        });

        expect(result).to.be.an('object');
        Object.values(result).forEach(country => {
            expect(country).to.be.an('number');
        });

        expect(Object.keys(result).length).to.equal(3);

        expect(result["europe"]).to.be.equal(4);
        expect(result["apac"]).to.be.equal(1);
        expect(result["america"]).to.be.equal(1);
    });
});

describe('calculateMaxSalesRepresentativeCount', () => {
    const testCases = [
        {count: 3, expected: 1},
        {count: 5, expected: 1},
        {count: 6, expected: 2},
        {count: 8, expected: 2},
        {count: 12, expected: 4},
        {count: 17, expected: 5},
        {count: 31, expected: 10},
        {count: 59, expected: 19},
    ];

    testCases.forEach(({count, expected}) => {
        it(`should return ${expected} when ${count} is given`, () => {
            const result = calculateMaxSalesRepresentativeCount({countryCount: count});
            expect(result).to.equal(expected);
        });
    });
});


describe('calculateMinSalesRepresentativeCount', () => {
    const testCases = [
        {count: 3, expected: 1},
        {count: 7, expected: 1},
        {count: 12, expected: 2},
        {count: 15, expected: 3},
        {count: 27, expected: 4},
        {count: 29, expected: 5},
    ];

    testCases.forEach(({count, expected}) => {
        it(`should return ${expected} when ${count} is given`, () => {
            const result = calculateMinSalesRepresentativeCount({countryCount: count});
            expect(result).to.equal(expected);
        });
    });
});

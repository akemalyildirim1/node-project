import chai from "chai";
import chaiAsPromised from "chai-as-promised";

import {connectMongoDB} from "../../../database/mongo.js";
import {getAllCountries} from "../../../controllers/countries-controller.js";
import {
    findRegionsAndCountryList,
    divideCountriesToSalesRepresentatives,
    getOptimalSalesRepresentativeCount
} from "../../../controllers/optimal-controller.js";
import config from "../../test.config.js";


chai.use(chaiAsPromised);
const expect = chai.expect;

before(async () => {
        await connectMongoDB(config.mongoDBUri);
    }
);

describe('getOptimalSalesRepresentativeCount', () => {

    it('should return an array of objects that includes ' +
        'region, countryList, countryCount', async () => {
            const countries = await getAllCountries({region: undefined});

            const result = getOptimalSalesRepresentativeCount({countries});

            expect(result).to.be.an('array');
            // 3 europe + 2 apac + 7 america = 12
            expect(result.length).to.equal(12);
            result.forEach(salesRepresentative => {
                expect(salesRepresentative).to.be.an('object');
                expect(salesRepresentative).to.have.keys(
                    'region', 'countryList', 'countryCount'
                );
            });

            expect(result[0]).to.deep.equal(
                {
                    region: 'europe',
                    countryList: ['countryeurope14', 'countryeurope11', 'countryeurope8', 'countryeurope5', 'countryeurope2'],
                    countryCount: 5
                }
            );
            expect(result[11]).to.deep.equal(
                {
                    region: 'america',
                    countryList: ['countryamerica38', 'countryamerica31', 'countryamerica24', 'countryamerica17', 'countryamerica10', 'countryamerica3'],
                    countryCount: 6
                }
            );
        }
    )

});


describe('findRegionsAndCountryList', () => {
    it("should return regions and country numbers", () => {
        const result = findRegionsAndCountryList({
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
            expect(country).to.be.an('array');
        });

        expect(Object.keys(result).length).to.equal(3);

        expect(result["europe"]).to.deep.equal(
            ['romania', 'netherlands', 'hungary', 'cyprus']
        );
        expect(result["apac"]).to.deep.equal(['australia']);
        expect(result["america"]).to.deep.equal(['costa rica']);
    });
});

describe('divideCountriesToSalesRepresentatives', () => {

    it('should return an array of array', () => {
            const countries = [];
            for (let i = 0; i < 15; i++) {
                countries.push(`country${i}`)
            }
            const result = divideCountriesToSalesRepresentatives(
                {
                    countries,
                    salesRepresentativeCount: 3
                }
            )

            expect(result).to.be.an('array');
            expect(result.length).to.equal(3);
            result.forEach(salesRepresentative => {
                expect(salesRepresentative).to.be.an('array');
                expect(salesRepresentative.length).to.equal(5);
            });
            expect(result[0]).to.deep.equal(
                ['country14', 'country11', 'country8', 'country5', 'country2']
            );
        }
    );

    it('should divide an array that includes 6 elements when there are 6 countries'
        , () => {
            const countries = [];
            for (let i = 0; i < 6; i++) {
                countries.push(`country${i}`)
            }
            const result = divideCountriesToSalesRepresentatives(
                {
                    countries,
                    salesRepresentativeCount: 1
                }
            )
            expect(result).to.be.an('array');
            expect(result.length).to.equal(1);
            expect(result[0].length).to.equal(6);
        }
    );


    it('should divide 4+4 if there are 8 countries'
        , () => {
            const countries = [];
            for (let i = 0; i < 8; i++) {
                countries.push(`country${i}`)
            }
            const result = divideCountriesToSalesRepresentatives(
                {
                    countries,
                    salesRepresentativeCount: 2
                }
            )

            expect(result).to.be.an('array');
            expect(result.length).to.equal(2);
            result.forEach(salesRepresentative => {
                expect(salesRepresentative).to.be.an('array');
                expect(salesRepresentative.length).to.equal(4);
            });
            expect(result[0]).to.deep.equal(
                ['country7', 'country5', 'country3', 'country1']
            );
        }
    );

    it('should divide 2x7+4*6 if there are 38 countries'
        , () => {
            const countries = [];
            for (let i = 0; i < 38; i++) {
                countries.push(`country${i}`)
            }
            const result = divideCountriesToSalesRepresentatives(
                {
                    countries,
                    salesRepresentativeCount: 6
                }
            )

            expect(result).to.be.an('array');
            expect(result.length).to.equal(6);
            result.forEach(salesRepresentative => {
                expect(salesRepresentative).to.be.an('array');
                expect(salesRepresentative.length).greaterThanOrEqual(6);
                expect(salesRepresentative.length).lessThanOrEqual(7);
            });
            expect(result[1].length).to.equal(7);
            expect(result[5].length).to.equal(6);

        }
    );

});
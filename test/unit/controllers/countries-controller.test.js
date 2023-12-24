import chai from "chai";
import chaiAsPromised from "chai-as-promised";

import {connectMongoDB} from "../../../database/mongo.js";
import {getAllCountries} from "../../../controllers/countries-controller.js";
import config from "../../test.config.js";


chai.use(chaiAsPromised);
const expect = chai.expect;

before(async () => {
        await connectMongoDB(config.mongoDBUri);
    }
);


describe('getAllCountries Test', () => {
    it("should return all countries when region is empty", async () => {
        const result = await getAllCountries({region: undefined});

        expect(result).to.be.an('array');
        expect(result.length).to.equal(68);

        // _id and __v should not be returned.
        expect(
            result.every(country =>
                !Object.keys(country).includes('_id') && !Object.keys(country).includes('__v')
            )
        ).to.be.true;


        expect(result.some(country => country.name === 'countryeurope3' && country.region === 'europe')).to.be.true;
        expect(result.some(country => country.name === 'countryamerica24' && country.region === 'america')).to.be.true;
        expect(result.some(country => country.name === 'countryapac5' && country.region === 'apac')).to.be.true;
    });

    it("should return only countries that are the given region when region is given", async () => {
            const result = await getAllCountries({region: 'europe'});

            expect(result).to.be.an('array');
            expect(result.length).to.equal(15);
            expect(
                result.every(country =>
                    country.region === 'europe'
                )
            ).to.be.true;
        }
    );

    it("raises an error if there is no country for the given region", async () => {
            await expect(getAllCountries({region: 'invalidregion'})).to.be.rejectedWith(Error, "No countries found!");
        }
    );


});
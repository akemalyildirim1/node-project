import {calculateMinSalesRepresentativeCount} from "./salesrep-controller.js";

/**
 * Find the optimal number of sales representatives for each region based on the given array of countries.
 *
 * @param {Object} options - The options object.
 * @param {Array} options.countries - The array of countries' name to determine optimal sales representative counts.
 *
 * @returns {Array<Object>} An array of objects representing sales representatives for each region.
 * Each object includes region, countryList, and countryCount keys.
 */
export const getOptimalSalesRepresentativeCount = ({countries}) => {
    const regionsAndCountryList = findRegionsAndCountryList({countries});

    const salesRepresentatives = [];

    // Find regions' min and max sales representative counts.
    for (const [region, countries] of Object.entries(regionsAndCountryList)) {
        const representativesOfRegion = divideCountriesToSalesRepresentatives(
            {
                countries,
                salesRepresentativeCount: calculateMinSalesRepresentativeCount({countryCount: countries.length})
            }
        );

        for (const representative of representativesOfRegion) {
            salesRepresentatives.push({
                region,
                countryList: representative,
                countryCount: representative.length
            });
        }
    }

    return salesRepresentatives;
}

/**
 * Group an array of countries by their regions and create a list of countries for each region.
 *
 * @param {Object} options - The options object.
 * @param {Array} options.countries - The array of countries to be grouped.
 *
 * @returns {Object} An object where each key represents a region, and the corresponding value is an array
 *                   containing the names of countries in that region.
 */
export const findRegionsAndCountryList = ({countries}) => {
    const regions = {};

    for (const country of countries) {
        const {region, name} = country;
        if (!regions[region]) {
            regions[region] = [name];
        } else {
            regions[region].push(name);
        }
    }

    return regions;
}

/**
 * Divide the given array of countries among a specified number of sales representatives.
 *
 * salesRepresentativeCount should be selected very carefully. If it is given less than the possible values,
 * infinite loop may occur. Also, if it given too much, there might be a representative who takes less than
 * 3 countries and this status is not acceptable. So, be careful when selecting salesRepresentativeCount.
 *
 * @param {Object} options - The options object.
 * @param {Array} options.countries - The array of countries to be divided.
 * @param {number} options.salesRepresentativeCount - The number of sales representatives.
 *
 * @returns {Array<Array>} An array representing the distribution of countries among sales representatives.
 * Each inner array corresponds to a sales representative and contains the assigned countries.
 */
export const divideCountriesToSalesRepresentatives = (
    {countries, salesRepresentativeCount}
) => {
    const salesRepresentatives = Array.from(
        Array(salesRepresentativeCount)
        , () => []);

    // Each representative can get at most 7 countries.
    while (countries.length > 0) {
        for (let i = 0; i < salesRepresentativeCount; i++) {
            if (salesRepresentatives[i].length < 7) {
                salesRepresentatives[i].push(countries.pop());
            }

            if (countries.length === 0) {
                break;
            }
        }
    }

    return salesRepresentatives;
};


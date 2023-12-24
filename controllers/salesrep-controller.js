/**
 * Find required max and min number of sales representatives for each region.
 *
 * @param {Object} options - The options object.
 * @param {Object[]} options.countries - An array of country objects.
 *
 * @returns {Array} An array containing objects with region, minSalesReq, and maxSalesReq.
 */
export const getSalesRepresentativeCount = ({countries}) => {
    // Find regions and country numbers.
    const regionsAndCountryNumbers = findRegionsAndCountryNumbers(
        {countries}
    );

    let regionsAndRepresentativeNumbers = [];

    // Find regions' min and max sales representative counts.
    for (const [region, count] of Object.entries(regionsAndCountryNumbers)) {
        const minSalesReq = calculateMinSalesRepresentativeCount({countryCount: count});
        const maxSalesReq = calculateMaxSalesRepresentativeCount({countryCount: count});

        regionsAndRepresentativeNumbers.push({region, minSalesReq, maxSalesReq});
    }

    return regionsAndRepresentativeNumbers;
}


/**
 * Find the regions and the count of countries for each region.
 *
 * @param {Object} options - The options object.
 * @param {Object[]} options.countries - An array of country objects.
 *
 * @returns {Object} An object where keys are regions and values are the count
 *                      of countries in each region.
 *
 * @example
 * const result = findRegionsAndCountryNumbers({
 *   countries: [
 *     { name: 'Japan', region: 'APAC' },
 *     { name: 'France', region: 'Europe' },
 *   ]
 * });
 * // result will be like: { APAC: 1, Europe: 1}
 */
export const findRegionsAndCountryNumbers = ({countries}) => {
    return countries.reduce((acc, country) => {
        const {region} = country;
        acc[region] = (acc[region] || 0) + 1;
        return acc;
    }, {});
}


/**
 * Calculates the maximum number of sales representatives allowed based on the given count of countries.
 *
 * @param {Object} options - The options object.
 * @param {number} options.countryCount - The count of countries for which representatives need to be assigned.
 *
 * @returns {number} The maximum number of sales representatives allowed.
 *
 * @example
 * const result = calculateMaxSalesRepresentativeCount({ countryCount: 8 });
 * // result will be 2, as 8 countries allow up to 2 representative.
 */
export const calculateMaxSalesRepresentativeCount = ({countryCount}) => {
    if (countryCount < 6) return 1;
    return Math.floor(countryCount / 3);
}


/**
 * Calculates the minimum number of sales representatives allowed based on the given count of countries.
 *
 * Each representative can be assigned minimum 3 and maximum 7 countries. So, when there are 7 countries, 1 representative
 * is needed. After adding one more country, the number of representatives needed is 2. (The first one will take 5 and the
 * second one will take 3 countries.). When we reach the 15th country, we need 3 representatives. (The first one will take 7,
 * the second one will take 5 and the third one will take 3 country.) Therefore, the algorithm is designed by considering
 * it. We need 4 representative for 22 countries and 5 representative for 29 countries.
 *
 * @param {Object} options - The options object.
 * @param {number} options.countryCount - The count of countries for which representatives need to be assigned.
 *
 * @returns {number} The minimum number of sales representatives allowed.
 *
 * @example
 * const result = calculateMinSalesRepresentativeCount({ countryCount: 15 });
 * // result will be 3, as 15 countries allow up to 3 representative.
 */
export const calculateMinSalesRepresentativeCount = ({countryCount}) => {
    countryCount -= 1;
    return Math.floor(countryCount / 7) + 1;
}


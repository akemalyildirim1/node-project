import Countries from "../models/Countries.js";


/**
 * Retrieves a list of countries based on the specified region.
 *
 * @param {Object} options - The options object.
 * @param {string} options.region - The region to filter countries by.
 * @returns {Promise<Array<Object>>} - A promise that resolves to an array of country objects.
 * @throws {Error} If no countries are found for the given region.
 *
 * @example
 * // Retrieve all countries
 * const allCountries = await getAllCountries({ region: undefined });
 *
 * // Retrieve countries in a specific region
 * const europeanCountries = await getAllCountries({ region: 'Europe' });
 */
export const getAllCountries = async ({region}) => {
    let countriesQuery = Countries.find({}, {_id: 0}).select('name region -__v');

    if (!!region) {
        countriesQuery = countriesQuery.where('region', region);
    }

    const countries = await countriesQuery.exec();

    if (!countries || countries.length === 0) {
        throw new Error("No countries found!");
    }

    return countries;
}


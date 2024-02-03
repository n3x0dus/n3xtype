
/*
 * JsonTools.mjs
 */

/**
 * Loads a JSON file from the given URL and returned parsed data.
 * @param {URL} url The URL that has JSON information.
 * @returns Parsed JSON data.
 */
export async function loadJson(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (err) {
        console.error(`Could not load ${url}: ${err}`);
    }
}
/**
 * Performs a general GET request for the specified url resource on the server.
 * See server.js for specific routes.
 * @param {string} url The url resource to request.
 * @returns {Promise} Returns a promise containing data from the server when fulfilled.
 */
 const getData = async (url = '') => {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log('Error: ', error);
        throw error;
    }
}

/**
 * Performs a general POST request for the specified url resource to the server.
 * See server.js for specific routes.
 * @param {string} url The url resource to post to.
 * @param {Object} data The data to post to the server.
 * @returns {Promise} Returns a promise containing data from the server (where relevant) when fulfilled.
 */
 const postData = async (url = '', data = {}) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const receivedData = await response.json();
        return receivedData;
    } catch (error) {
        console.log('Error: ', error);
        throw error;
    }
}

export { getData, postData }
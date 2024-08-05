/* eslint-disable style/brace-style */

import { getAccessToken } from '../utils/authUtils';

/* eslint-disable style/indent */
async function requester(method, url, data) {
    const options = {};

    const accessToken = getAccessToken();

    // console.log('Access Token:', accessToken); // Debugging line

    if (accessToken) {
        options.headers = {
            ...options.headers,
            'X-Authorization': accessToken,
        };
    }
    // } else {
    //     // Handle the case when accessToken is not available
    //     console.warn('No access token found, redirecting to login.');
    //     window.location.href = '/login'; // Example redirection
    //     return;
    // };

    if (method !== 'GET') {
        options.method = method;
    }

    if (data) {
        options.headers = {
            ...options.headers,
            'Content-Type': 'application/json',
        };
        options.body = JSON.stringify(data);
    }

    try {
        const response = await fetch(url, options);
        if (response.status === 204) {
            return;
        };

        const result = await response.json();

        if (!response.ok) {
            throw result;
        }

        return result;
    } catch (error) {
        console.error('Request failed:', error); // Debugging line
        throw error;
    }
}

export const get = requester.bind(null, 'GET');
export const post = requester.bind(null, 'POST');
export const put = requester.bind(null, 'PUT');
export const del = requester.bind(null, 'DELETE');

// export const get = (url, data) => requester('GET', url, data);
// export const post = (url, data) => requester('POST', url, data);
// export const put = (url, data) => requester('PUT', url, data);
// export const del = (url, data) => requester('DELETE', url, data);

export default {
    get,
    post,
    put,
    del,
};

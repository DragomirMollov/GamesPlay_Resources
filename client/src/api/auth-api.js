/* eslint-disable antfu/top-level-function */
/* eslint-disable style/indent */
import requester from './requester';

const BASE_URL = 'http://localhost:3030/users';

/**
 *
 * @param {string} email
 * @param {string} password
 */
export const login = (email, password) => requester.post(`${BASE_URL}/login`, { email, password });

export const register = (email, password) => requester.post(`${BASE_URL}/register`, { email, password });

export const logout = () => requester.get(`${BASE_URL}/logout`);

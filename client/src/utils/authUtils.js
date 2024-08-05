/* eslint-disable antfu/top-level-function */
/* eslint-disable style/indent */
export const getAccessToken = () => {
    const authJSON = localStorage.getItem('auth');

    if (!authJSON) {
        return '';
    }

    const authData = JSON.parse(authJSON);

    return authData?.accessToken;
};

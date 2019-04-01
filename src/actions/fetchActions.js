import { FETCH_START, FETCH_ERROR, FETCH_SUCCESS } from 'actions/constants/fetch';
import { GET_FIRMWARE, SUBMIT_EMAIL, GET_LOCALIZATION } from 'actions/constants/fetchCalls';
import {
    MAILCHIMP_U, MAILCHIMP_ID, MAILCHIMP_BASE, MAILCHIMP_GROUP_ID,
} from 'config/mailchimp';

// this is a little scary way how to add more checkboxes, just add the section: &group[${MAILCHIMP_GROUP_ID}][3]=3

const getParams = (name) => {
    switch (name) {
        case GET_FIRMWARE:
            return { options: { method: 'GET' } };
        case SUBMIT_EMAIL:
            return { options: { method: 'GET', mode: 'no-cors' } };
        case GET_LOCALIZATION:
            return { options: { method: 'GET' } };
        default:
            throw new Error(`fetchCall ${name} is not defined`);
    }
};

const fetchResource = (name, url) => async (dispatch) => {
    dispatch({ type: FETCH_START, name });
    try {
        const params = getParams(name);
        console.warn(params);
        const response = await fetch(url, params.options);
        // todo: response.status === 0 is cors-hack, cors doest allow us to read response status, we will need to use
        // mailchimp API directly.
        if (response.ok || response.status === 0) {
            dispatch({ type: FETCH_SUCCESS, result: response });
        } else {
            dispatch({ type: FETCH_ERROR, error: response.status });
        }
        return response;
    } catch (error) {
        dispatch({ type: FETCH_ERROR, error });
        return error;
    }
};

const getFirmware = (urlSuffix) => {
    const TREZOR_FIRMWARE_SRC_URL = 'https://beta-wallet.trezor.io/data/firmware';
    return fetchResource(GET_FIRMWARE, TREZOR_FIRMWARE_SRC_URL + urlSuffix);
};

const getLocalization = url => fetchResource(GET_LOCALIZATION, `l10n/locales${url}`);

export {
    // abstract action
    fetchResource,
    // parametrized actions
    getFirmware,
    getLocalization,
};

export const deviceIsConnected = state => !!state.device;

// is same device is not entry but reconnect condition that applies for all steps
// with deviceIsConnected
export const isSameDevice = (state) => {
    if (!state.device) {
        return null; // null means we cant tell
    }
    return state.device.isSameDevice;
};
export const deviceIsNotInitialized = state => state.device && state.device.features.initialized === false;

export const deviceHasBackup = state => state.device && state.device.features.needs_backup === false && state.device.features.unfinished_backup !== true;

export const IS_SAME_DEVICE = 'is-same-device';
export const DEVICE_IS_NOT_INITIALIZED = 'device-is-not-initialized';
export const DEVICE_HAS_BACKUP = 'device-has-backup';
export const DEVICE_IS_CONNECTED = 'device-is-connected'; // kokotina?

export const resolve = (state, conditions) => {
    console.log(state.device)
    if (!conditions) {
        return [];
    }
    const results = conditions.map((condition) => {
        let checkFn;
        switch (condition) {
            case IS_SAME_DEVICE:
                checkFn = isSameDevice;
                break;
            case DEVICE_IS_NOT_INITIALIZED:
                checkFn = deviceIsNotInitialized;
                break;
            case DEVICE_HAS_BACKUP:
                checkFn = deviceHasBackup;
                break;
            case DEVICE_IS_CONNECTED:
                checkFn = deviceIsConnected;
                break;
            default:
                throw new Error(`Wrong condition passed: ${condition}`);
        }
        if (!checkFn(state) === null) {
            return { condition, result: null };
        }
        return { condition, result: checkFn(state) };
    });
    return results;
};

export const filterUnmet = conditions => conditions.filter(condition => condition.result === false);
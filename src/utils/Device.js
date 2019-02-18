let previousDeviceId = null;

class Device {
    constructor(device) {
        Object.assign(this, device);
        if (!previousDeviceId || previousDeviceId === device.features.device_id) {
            this.isSameDevice = true;
        } else {
            this.isSameDevice = false;
        }
        previousDeviceId = device.features.device_id;
    }

    isFresh() {
        if (!this.features) {
            return null;
        }
        // todo: what about if newest firmware installed?
        if (this.features.initialized === true) {
            return false;
        }
        return true;
    }
}

export default Device;
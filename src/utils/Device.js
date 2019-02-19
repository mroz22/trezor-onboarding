
class DeviceManager {
    previousDeviceId = null;

    static createDevice(device) {
        const d = new Device(device);

        if (!DeviceManager.previousDeviceId || device.features.device_id === DeviceManager.previousDeviceId) {
            d.isSameDevice = true;
        } else {
            d.isSameDevice = false;
        }
        if (!DeviceManager.previousDeviceId || d.isSameDevice) {
            DeviceManager.previousDeviceId = device.features.device_id;
        }
        return d;
    }
}
class Device {
    constructor(device) {
        Object.assign(this, device);
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

export default DeviceManager;
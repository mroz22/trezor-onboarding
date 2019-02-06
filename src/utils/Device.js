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

export default Device;
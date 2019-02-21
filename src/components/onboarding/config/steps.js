import { ID, TITLE } from 'constants/steps';
import * as conditions from 'utils/conditions';

export default [
    {
        id: ID.WELCOME_STEP,
        reconnectConditions: [conditions.IS_SAME_DEVICE],
    }, {
        id: ID.SELECT_DEVICE_STEP,
        title: TITLE.SELECT_DEVICE_STEP,
    }, {
        id: ID.UNBOXING_STEP,
        title: TITLE.UNBOXING_STEP,
    }, {
        id: ID.BRIDGE_STEP,
        title: TITLE.BRIDGE_STEP,
    }, {
        id: ID.CONNECT_STEP,
        title: TITLE.BRIDGE_STEP,
    }, {
        id: ID.FIRMWARE_STEP,
        title: TITLE.FIRMWARE_STEP,
        entryConditions: [conditions.DEVICE_IS_NOT_INITIALIZED],
        reconnectConditions: [conditions.IS_SAME_DEVICE],
    }, {
        id: ID.START_STEP,
        title: TITLE.START_STEP,
        entryConditions: [conditions.DEVICE_IS_CONNECTED, conditions.DEVICE_IS_NOT_INITIALIZED],
        reconnectConditions: [conditions.IS_SAME_DEVICE],
    }, {
        id: ID.BACKUP_STEP,
        title: TITLE.SECURITY_STEP,
        entryConditions: [conditions.DEVICE_IS_CONNECTED],
        reconnectConditions: [conditions.IS_SAME_DEVICE],
    }, {
        id: ID.SET_PIN_STEP,
        title: TITLE.SECURITY_STEP,
        entryConditions: [conditions.DEVICE_IS_CONNECTED, conditions.DEVICE_HAS_BACKUP],
        reconnectConditions: [conditions.IS_SAME_DEVICE],
    }, {
        id: ID.NAME_STEP,
        title: TITLE.SECURITY_STEP,
        entryConditions: [conditions.DEVICE_IS_CONNECTED, conditions.DEVICE_HAS_BACKUP],
        reconnectConditions: [conditions.IS_SAME_DEVICE],
    }, {
        id: ID.BOOKMARK_STEP,
        title: TITLE.SECURITY_STEP,
        entryConditions: [conditions.DEVICE_IS_CONNECTED, conditions.DEVICE_HAS_BACKUP],
        reconnectConditions: [conditions.IS_SAME_DEVICE],
    }, {
        id: ID.NEWSLETTER_STEP,
        title: TITLE.SECURITY_STEP,
        entryConditions: [conditions.DEVICE_IS_CONNECTED, conditions.DEVICE_HAS_BACKUP],
        reconnectConditions: [conditions.IS_SAME_DEVICE],
    }, {
        id: ID.FINAL_STEP,
        showControls: false,
    }];
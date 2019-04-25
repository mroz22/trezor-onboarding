import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import { Link, P, Prompt } from 'trezor-ui-components';
import { CSSTransition } from 'react-transition-group';
import { hot } from 'react-hot-loader/root';

import * as EVENTS from 'actions/constants/events';
import types from 'config/types';
import colors from 'config/colors';
import { SM } from 'config/breakpoints';
import { TOS_URL } from 'config/urls';
import {
    PROGRESSBAR_HEIGHT,
    PROGRESSBAR_HEIGHT_UNIT,
    STEP_HEIGHT,
    STEP_HEIGHT_UNIT,
    NAVBAR_HEIGHT,
    NAVBAR_HEIGHT_UNIT,
} from 'config/layout';
import ProgressSteps from 'components/ProgressSteps';

import { ID } from 'constants/steps';
import { getFnForRule } from 'utils/rules';

import UnexpectedState from 'components/UnexpectedState';
import BackupStep from 'onboarding/steps/Backup';
import BookmarkStep from 'onboarding/steps/Bookmark';
import BridgeStep from 'onboarding/steps/Bridge';
import FinalStep from 'onboarding/steps/Final';
import FirmwareStep from 'onboarding/steps/Firmware';
import HologramStep from 'onboarding/steps/Hologram';
import NewsletterStep from 'onboarding/steps/Newsletter';
import SelectDeviceStep from 'onboarding/steps/SelectDevice';
import SetPinStep from 'onboarding/steps/Pin';
import StartStep from 'onboarding/steps/Start';
import SecurityStep from 'onboarding/steps/Security';
import WelcomeStep from 'onboarding/steps/Welcome';
import NameStep from 'onboarding/steps/Name';
import ConnectStep from 'onboarding/steps/Connect';

import background2 from './background2.jpg';

const BORDER_RADIUS = 12;
const ANIMATION_DURATION = 401;

const WrapperOutside = styled.div`
    display: flex;
    flex-direction: column;
    background-image: url(${background2});
    background-size: cover;
    
    @media only screen and (min-width: ${SM}px) {
        ${props => (props.animate && css`animation: ${backgroundAnimation} 1s linear`)};
    }
`;

const WrapperInside = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    background-color: ${colors.white};
    border-radius: ${BORDER_RADIUS}px;
    z-index: 1;
    max-height: ${({ isGlobalInteraction }) => (isGlobalInteraction ? `calc(100vh - ${PROGRESSBAR_HEIGHT}${PROGRESSBAR_HEIGHT_UNIT} - ${NAVBAR_HEIGHT}${NAVBAR_HEIGHT_UNIT})` : 'none')};

    @media only screen and (min-width: ${SM}px) {
        width: calc(55vw + 150px) ;
        margin: 50px auto;
        overflow: hidden;
    } 
`;

const backgroundAnimation = keyframes`
    0% { opacity: 0 }
    100% { opacity: 1 }
`;

const ProgressStepsWrapper = styled.div`
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid ${colors.grayLight};
`;

const ProgressStepsSlot = styled.div`
    height: ${PROGRESSBAR_HEIGHT}${PROGRESSBAR_HEIGHT_UNIT};
`;

const ComponentWrapper = styled.div`
    display: flex;
    margin-bottom: 5%;
    min-height: ${STEP_HEIGHT}${STEP_HEIGHT_UNIT}
`;

const TrezorActionOverlay = styled.div`
    position: absolute;
    margin-top: auto;
    margin-bottom: auto;
    width: 100%;
    height: calc(100vh - ${PROGRESSBAR_HEIGHT}${PROGRESSBAR_HEIGHT_UNIT} - ${NAVBAR_HEIGHT}${NAVBAR_HEIGHT_UNIT});
    display: flex;
    justify-content: center;
    background-color: ${colors.white};
    z-index: 405;
    border-radius: ${BORDER_RADIUS}px;
`;

const UnexpectedStateOverlay = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: ${colors.white};
    z-index: 405;
    display: flex
`;

class Onboarding extends React.PureComponent {
    componentDidMount() {
        window.onbeforeunload = () => {
            if (this.props.activeStepId !== ID.FINAL_STEP) {
                return 'Are you sure want to close';
            }
            return null;
        };
        this.props.connectActions.init();
    }

    getStep(activeStepId) {
        return this.props.steps.find(step => step.id === activeStepId);
    }

    getScreen() {
        return this.props.activeStepId;
    }

    handleErrors() {
        const {
            device,
            prevDeviceId,
            activeStepId,
            connectError,
            uiInteraction,
        } = this.props;

        if (!this.getStep(activeStepId).disallowedDeviceStates) {
            return [];
        }

        const errorStates = [];
        this.getStep(activeStepId).disallowedDeviceStates.forEach((state) => {
            const fn = getFnForRule(state);
            if (fn({ device, prevDeviceId, uiInteraction }) === true) {
                errorStates.push(state);
            }
        });
        // we can also have error from deviceCall
        // todo: maybe distinguish between deviceCall unexpected state errors (which go here) and other errors;
        if (connectError) {
            errorStates.push(`Failed to establish connection with Trezor servers. Please check your internet connection. [Error: ${connectError}]`);
        }
        return errorStates;
    }

    isGlobalInteraction() {
        const { deviceInteraction, deviceCall } = this.props;
        const globals = [
            EVENTS.BUTTON_REQUEST__PROTECT_CALL,
            EVENTS.BUTTON_REQUEST__WIPE_DEVICE,
            EVENTS.BUTTON_REQUEST__RESET_DEVICE,
            EVENTS.BUTTON_REQUEST__MNEMONIC_WORD_COUNT,
            EVENTS.BUTTON_REQUEST__MNEMONIC_INPUT,
            EVENTS.BUTTON_REQUEST__OTHER,
        ];
        return deviceInteraction && globals.includes(deviceInteraction.name) && deviceCall.isProgress;
    }

    isStepResolved(stepId) {
        return Boolean(this.props.steps.find(step => step.id === stepId).resolved);
    }

    shouldDisplaySkipSecurity() {
        const displayOn = [ID.BACKUP_STEP, ID.SET_PIN_STEP, ID.NAME_STEP, ID.BOOKMARK_STEP, ID.NEWSLETTER_STEP];
        return displayOn.includes(this.props.activeStepId);
    }

    shouldDisplayGoBack() {
        const doNotDisplayOn = [ID.WELCOME_STEP, ID.FINAL_STEP];
        return !doNotDisplayOn.includes(this.props.activeStepId);
    }

    render() {
        const {
            onboardingActions,
            connectActions,
            recoveryActions,
            firmwareUpdateActions,
            newsletterActions,
            selectedModel,
            transport,
            activeStepId,
            activeSubStep,
            device,
            deviceCall,
            deviceInteraction,
            uiInteraction,
            steps,
            fetchCall,
            recovery,
            firmwareUpdate,
            newsletter,
        } = this.props;

        // model is either selected by user or later overrided by connected device

        const model = device && device.features && device.features.major_version ? device.features.major_version : selectedModel;
        // todo: solve how to handle cases we fail to init connect;
        const errorStates = this.handleErrors();
        // todo: wrap this up to separete component probably
        let TrezorActionText;
        if (activeStepId === ID.START_STEP) {
            // StartStep call require custom text
            TrezorActionText = () => <P>Complete action on your device. By clicking continue you agree with <Link href={TOS_URL}>Terms of services</Link></P>;
        } else {
            TrezorActionText = () => <P>Complete action on your device.</P>;
        }

        return (
            <WrapperOutside
                animate={![ID.WELCOME_STEP, ID.FINAL_STEP].includes(activeStepId)}
            >
                <WrapperInside isGlobalInteraction={this.isGlobalInteraction()}>
                    {
                        errorStates.length > 0 && (
                            <UnexpectedStateOverlay>
                                <UnexpectedState
                                    caseType={errorStates[0]}
                                    model={model}
                                    connectActions={connectActions}
                                    onboardingActions={onboardingActions}
                                />
                            </UnexpectedStateOverlay>
                        )
                    }
                    <ProgressStepsSlot>
                        { this.getStep(activeStepId).title && this.getStep(activeStepId).title !== 'Basic setup' && (
                            <ProgressStepsWrapper>
                                <ProgressSteps
                                    steps={steps}
                                    activeStep={this.getStep(activeStepId)}
                                    onboardingActions={onboardingActions}
                                />
                            </ProgressStepsWrapper>
                        )}
                    </ProgressStepsSlot>
                    <ComponentWrapper>
                        <TrezorActionOverlay style={{ display: !this.isGlobalInteraction() ? 'none' : 'flex' }}>
                            <Prompt model={model} size={100}>
                                <TrezorActionText />
                            </Prompt>
                        </TrezorActionOverlay>

                        {/* todo [vladimir]: how to find that I pass props and dont use them in component? any tooling? */}
                        <CSSTransition
                            in={activeStepId === ID.WELCOME_STEP}
                            timeout={ANIMATION_DURATION}
                            classNames="step-transition"
                            unmountOnExit
                        >
                            <WelcomeStep
                                onboardingActions={onboardingActions}
                                transport={transport}
                            />
                        </CSSTransition>

                        <CSSTransition
                            in={activeStepId === ID.SELECT_DEVICE_STEP}
                            timeout={ANIMATION_DURATION}
                            classNames="step-transition"
                            unmountOnExit
                        >
                            <SelectDeviceStep
                                deviceCall={deviceCall}
                                onboardingActions={onboardingActions}
                            />
                        </CSSTransition>

                        <CSSTransition
                            in={activeStepId === ID.UNBOXING_STEP}
                            timeout={ANIMATION_DURATION}
                            classNames="step-transition"
                            unmountOnExit
                        >
                            <HologramStep
                                onboardingActions={onboardingActions}
                                model={model}
                                activeSubStep={activeSubStep}
                            />
                        </CSSTransition>

                        <CSSTransition
                            in={activeStepId === ID.BRIDGE_STEP}
                            timeout={ANIMATION_DURATION}
                            classNames="step-transition"
                            unmountOnExit
                        >
                            <BridgeStep
                                onboardingActions={onboardingActions}
                                activeSubStep={activeSubStep}
                                transport={transport}
                            />
                        </CSSTransition>

                        <CSSTransition
                            in={activeStepId === ID.CONNECT_STEP}
                            timeout={ANIMATION_DURATION}
                            classNames="step-transition"
                            unmountOnExit
                        >
                            <ConnectStep
                                onboardingActions={onboardingActions}
                                connectActions={connectActions}
                                model={model}
                                device={device}
                                deviceCall={deviceCall}
                                activeSubStep={activeSubStep}
                                isResolved={this.isStepResolved(ID.CONNECT_STEP)}
                            />
                        </CSSTransition>

                        <CSSTransition
                            in={activeStepId === ID.FIRMWARE_STEP}
                            timeout={ANIMATION_DURATION}
                            classNames="step-transition"
                            unmountOnExit
                        >
                            <FirmwareStep
                                onboardingActions={onboardingActions}
                                connectActions={connectActions}
                                firmwareUpdateActions={firmwareUpdateActions}
                                device={device}
                                fetchCall={fetchCall}
                                deviceCall={deviceCall}
                                firmwareUpdate={firmwareUpdate}
                            />
                        </CSSTransition>

                        <CSSTransition
                            in={activeStepId === ID.START_STEP}
                            timeout={ANIMATION_DURATION}
                            classNames="step-transition"
                            unmountOnExit
                        >
                            <StartStep
                                onboardingActions={onboardingActions}
                                connectActions={connectActions}
                                deviceCall={deviceCall}
                                isResolved={this.isStepResolved(ID.START_STEP)}
                                activeSubStep={activeSubStep}
                                recoveryActions={recoveryActions}
                                recovery={recovery}
                                device={device}
                                uiInteraction={uiInteraction}

                            />
                        </CSSTransition>

                        <CSSTransition
                            in={activeStepId === ID.SECURITY_STEP}
                            timeout={ANIMATION_DURATION}
                            classNames="step-transition"
                            unmountOnExit
                        >
                            <SecurityStep
                                onboardingActions={onboardingActions}
                            />
                        </CSSTransition>

                        <CSSTransition
                            in={activeStepId === ID.BACKUP_STEP}
                            timeout={ANIMATION_DURATION}
                            classNames="step-transition"
                            unmountOnExit
                        >
                            <BackupStep
                                onboardingActions={onboardingActions}
                                connectActions={connectActions}
                                device={device}
                                deviceCall={deviceCall}
                                deviceInteraction={deviceInteraction}
                                activeSubStep={activeSubStep}
                            />
                        </CSSTransition>

                        <CSSTransition
                            in={activeStepId === ID.SET_PIN_STEP}
                            timeout={ANIMATION_DURATION}
                            classNames="step-transition"
                            unmountOnExit
                        >
                            <SetPinStep
                                device={device}
                                onboardingActions={onboardingActions}
                                connectActions={connectActions}
                                deviceCall={deviceCall}
                                uiInteraction={uiInteraction}
                                activeSubStep={activeSubStep}
                            />
                        </CSSTransition>


                        <CSSTransition
                            in={activeStepId === ID.NAME_STEP}
                            timeout={ANIMATION_DURATION}
                            classNames="step-transition"
                            unmountOnExit
                        >
                            <NameStep
                                onboardingActions={onboardingActions}
                                connectActions={connectActions}
                                deviceCall={deviceCall}
                                device={device}
                            />
                        </CSSTransition>

                        <CSSTransition
                            in={activeStepId === ID.NEWSLETTER_STEP}
                            timeout={ANIMATION_DURATION}
                            classNames="step-transition"
                            unmountOnExit
                        >
                            <NewsletterStep
                                onboardingActions={onboardingActions}
                                connectActions={connectActions}
                                newsletterActions={newsletterActions}
                                newsletter={newsletter}
                                device={device}
                                deviceCall={deviceCall}
                                fetchCall={fetchCall}
                            />
                        </CSSTransition>

                        <CSSTransition
                            in={activeStepId === ID.BOOKMARK_STEP}
                            timeout={ANIMATION_DURATION}
                            classNames="step-transition"
                            unmountOnExit
                        >
                            <BookmarkStep
                                onboardingActions={onboardingActions}
                                connectActions={connectActions}
                                device={device}
                            />
                        </CSSTransition>

                        <CSSTransition
                            in={activeStepId === ID.FINAL_STEP}
                            timeout={ANIMATION_DURATION}
                            classNames="step-transition"
                            unmountOnExit
                        >
                            <FinalStep
                                onboardingActions={onboardingActions}
                            />
                        </CSSTransition>
                    </ComponentWrapper>
                </WrapperInside>
            </WrapperOutside>

        );
    }
}

Onboarding.propTypes = {
    // connectReducer
    device: types.device,
    prevDeviceId: types.prevDeviceId,
    transport: types.transport,
    deviceCall: types.deviceCall,
    deviceInteraction: types.deviceInteraction,
    uiInteraction: types.uiInteraction,
    connectError: types.connectError,
    connectActions: types.connectActions,

    // onboardingReducer
    selectedModel: types.selectedModel,
    activeStepId: types.activeStepId,
    activeSubStep: types.activeSubStep,
    steps: types.steps,
    onboardingActions: types.onboardingActions,

    // newsletterReducer
    newsletter: types.newsletter,
    newsletterActions: types.newsletterActions,

    // recoveryReducer
    recovery: types.recovery,
    recoveryActions: types.recoveryActions,

    // firmwareUpdateReducer
    firmwareUpdate: types.firmwareUpdate,
    firmwareUpdateActions: types.firmwareUpdateActions,

    // fetchReducer
    fetchCall: types.fetchCall,
};

export default hot(Onboarding);
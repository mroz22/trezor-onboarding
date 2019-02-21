import React from 'react';
import ReactSVG from 'react-svg';

import { types } from 'config/types';
import { DONUT_RADIUS, DONUT_STROKE } from 'config/constants';
import { TOS_URL } from 'config/urls';

import { Donut } from 'components/Loaders';
import { TrezorAction } from 'components/Prompts';
import { OptionsList } from 'components/Options';
import {
    Button, P, H1, Link,
} from 'trezor-ui-components';
import {
    StepWrapper, StepBodyWrapper, StepHeadingWrapper, ControlsWrapper,
} from '../../Wrapper';
import CreateImg from './images/create-2.svg';
import RecoverImg from './images/recover-2.svg';

const StartOption = () => (
    <React.Fragment>
        <P>Start from scratch</P>
        <ReactSVG svgStyle={{ width: '100%' }} src={CreateImg} alt="create new wallet" />
    </React.Fragment>
);

const RecoverOption = () => (
    <React.Fragment>
        <P>Recover</P>
        <ReactSVG svgStyle={{ width: '100%' }} src={RecoverImg} alt="recover wallet from seed" />
    </React.Fragment>
);

const TrezorActionText = () => <P>Complete action on your device. By clicking continue you agree with <Link href={TOS_URL}>Terms of services</Link></P>;
class StartStep extends React.Component {
    constructor() {
        super();
        this.state = {
            status: 'initial',
            progress: 0,
            options: [{
                content: <StartOption />,
                value: 1, // todo
                key: 1,
            }, {
                content: <RecoverOption />,
                value: 2, // todo
                key: 2,
            }],
        };
    }

    createNew = async () => {
        // const { Connect } = this.props.state;
        // const onCreateNewHandler = (event) => {
        //     console.warn('Event', event);
        //     console.warn('this.state.status', this.state.status);
        //     if (event.type === 'button' && this.state.status === 'initial') {
        //         this.props.actions.toggleDeviceInteraction(true);
        //     }
        //     // else if (event.type === 'ui-close_window' && this.state.status === 'initial') {

        //     // }
        // };
        // Connect.default.on(Connect.DEVICE_EVENT, onCreateNewHandler);
        // Connect.default.on(Connect.UI_EVENT, onCreateNewHandler);
        // Connect.default.on(Connect.RESPONSE_EVENT, onCreateNewHandler);
        this.props.onboardingActions.toggleDeviceInteraction(true);
        setTimeout(() => {
            this.props.onboardingActions.toggleDeviceInteraction(false);
            this.props.onboardingActions.goToNextStep();
        }, 2000);
        // let response;
        // try {
        //     response = await this.props.onboardingActions.resetDevice();
        //     console.log('response', response);
        // } catch (err) {
        //     console.warn('catch', err);
        //     // ?
        // } finally {
        //     console.log('finally');
        //     this.props.onboardingActions.toggleDeviceInteraction(false);

        //     if (!response || !response.success) {
        //         this.setState({ status: 'initial' });
        //     } else {
        //         this.setState({ status: 'creating' });
        //         const progressFn = () => {
        //             this.setState(prevState => ({ progress: prevState.progress + 1 }));
        //         };
        //         const tresholds = {
        //             creating: 100,
        //         };
        //         const interval = setInterval(() => {
        //             if (this.state.progress <= tresholds[this.state.status]) {
        //                 progressFn();
        //             }
        //             if (this.state.progress === 100) {
        //                 this.setState({ status: 'finished' });
        //             }
        //             if (this.state.status === 'finished') {
        //                 clearInterval(interval);
        //                 // this.props.actions.reorganizeSteps();
        //             }
        //         }, 20);
        //     }
        //     Connect.default.off(Connect.DEVICE_EVENT, onCreateNewHandler);
        // }
    }

    render() {
        const { status } = this.state;
        const { deviceInteraction, device } = this.props;
        if (deviceInteraction) {
            return (
                <div style={{
                    marginTop: 'auto',
                    position: 'absolute',
                    top: '50%',
                    left: '35%',
                    right: '35%',
                }}
                >
                    <TrezorAction text={<TrezorActionText />} />
                </div>

            );
        }
        return (
            <StepWrapper>
                <StepHeadingWrapper>
                    <H1>
                        {
                            status === 'initial' && 'Create or recover'
                        }
                        {
                            status === 'creating' && 'Creating new wallet'
                        }

                    </H1>
                </StepHeadingWrapper>
                <StepBodyWrapper>
                    {
                        status === 'initial'
                            && (
                                <React.Fragment>
                                    <OptionsList
                                        options={this.state.options}
                                        selected={null}
                                        selectedAccessor="value"
                                        onSelect={() => { this.createNew(); }}
                                    />
                                </React.Fragment>
                            )
                    }

                    {
                        status === 'creating' && <Donut progress={this.state.progress} radius={DONUT_RADIUS} stroke={DONUT_STROKE} />
                    }

                    {
                        status === 'finished'
                            && (
                                <React.Fragment>
                                    <P>Good job, your wallet is ready. But we strongly recommend you to spend few more minutes and improve your security</P>
                                    <ControlsWrapper>
                                        <Button onClick={this.props.onboardingActions.nextStep}>
                                        Take me to security <br />
                                        (5 minutes)
                                        </Button>
                                        <Button isWhite>Skip for now</Button>
                                    </ControlsWrapper>
                                </React.Fragment>
                            )
                    }
                </StepBodyWrapper>
            </StepWrapper>
        );
    }
}

StartStep.propTypes = {
    actions: types.actions,
    state: types.state,
};

export default StartStep;
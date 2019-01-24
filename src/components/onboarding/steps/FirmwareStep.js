import React from 'react';
import { Heading1 } from 'components/headings';
import Progress from 'components/loaders';

import { StepWrapper, StepHeadingWrapper, StepBodyWrapper } from '../components/Wrapper';

class FirmwareStep extends React.Component {
    constructor() {
        super();
        this.state = {
            progress: 0,
        };
    }

    install = () => {
        const progressFn = () => {
            this.setState(prevState => ({ progress: prevState.progress + 1 }));
        };

        const interval = setInterval(() => {
            if (this.state.progress >= 99) {
                clearInterval(interval);
            }
            progressFn();
        }, 100);
    }

    render() {
        return (
            <StepWrapper className="wrapper">
                <StepHeadingWrapper className="blabla">
                    <Heading1>Firmware</Heading1>
                </StepHeadingWrapper>
                <StepBodyWrapper>
                    <Progress progress={this.state.progress} radius={60} stroke={20} />
                    {
                        this.state.progress === 0 && (
                            <React.Fragment>
                                <div>Your device is shipped without firmware. Its time to install it.</div>
                                <button type="button" onClick={this.install}>Install</button>
                            </React.Fragment>
                        )
                    }

                    {
                        this.state.progress === 100 && <div>Perfect. The newest firwmare is installed. Time to continue</div>
                    }

                </StepBodyWrapper>
            </StepWrapper>
        );
    }
}


export default FirmwareStep;
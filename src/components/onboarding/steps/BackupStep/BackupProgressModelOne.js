import React from 'react';

class BackupProgressModelOne extends React.Component {
    constructor() {
        super();
        this.state = {
            nthWord: 0,
            checkingWords: false,
        };
    }

    componentDidMount() {
        this.startBackup();
    }

    startBackup = () => {
        const { Connect, device } = this.props.state;
        const onStartBackupHandler = (event) => {
            if (event.type === 'button' && event.payload.code === 'ButtonRequest_ConfirmWord') {
                // this.setState({ callToActionVisible: true });
                console.log('onStartBackupHandler', event);
                this.setState(prevState => ({ nthWord: prevState.nthWord + 1 }));
                this.setState(prevState => ({ checkingWords: (prevState.nthWord - 24) > 0 }));
            }
        };
        Connect.default.on(Connect.DEVICE_EVENT, onStartBackupHandler);
        this.props.actions.startBackup();
    }

    render() {
        return (
            <React.Fragment>
                {
                    this.state.checkingWords
                        ? <div>Check {this.state.nthWord - 24}. word </div>
                        : <div>Write down {this.state.nthWord}. word</div>
                }

            </React.Fragment>
        );
    }
}

export default BackupProgressModelOne;

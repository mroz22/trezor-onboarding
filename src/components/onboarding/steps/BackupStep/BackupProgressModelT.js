import React from 'react';

import { OrderedList } from 'components/lists';

class BackupProgressModelT extends React.Component {
    constructor() {
        super();
    }

    componentDidMount() {
        // this.startBackup();
    }

    // startBackup = () => {
    //     const { Connect, device } = this.props.state;
    //     const onStartBackupHandler = (event) => {
    //         if (event.type === 'button' && event.payload.code === 'ButtonRequest_ConfirmWord') {
    //             // this.setState({ callToActionVisible: true });
    //             console.log('onStartBackupHandler', event);
    //             this.setState(prevState => ({ nthWord: prevState.nthWord + 1 }));
    //             this.setState(prevState => ({ checkingWords: (prevState.nthWord - 24) > 0 }));
    //         }
    //     };
    //     Connect.default.on(Connect.DEVICE_EVENT, onStartBackupHandler);
    //     this.props.actions.startBackup();
    // }

    render() {
        return (
            <React.Fragment>
                <OrderedList items={[
                    'Swipe on your device to see all 12 words',
                    'Write down all 12 words to your recovery card',
                    'When you are finished, hold confirm button on your device',
                ]}
                />
            </React.Fragment>
        );
    }
}

export default BackupProgressModelT;

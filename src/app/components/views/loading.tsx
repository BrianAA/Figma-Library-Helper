import * as React from 'react';
import {styled, theme} from '../../../../stiches.theme';
import {Heading} from '../ui/Heading';
//@ts-ignore
import Spinner from '../../assets/loader.gif';
import {BodyText} from '../ui/body';
import {Button} from '../ui/button';

const ProgressStatus = ({setView, setResults}) => {
    const [progress, setProgress] = React.useState(0);
    React.useEffect(() => {
        window.onmessage = (event) => {
            const {type, message} = event.data.pluginMessage;
            if (type === 'Progress') {
                setProgress(message.progress);
                if (message.progress == 100) {
                    const data = JSON.parse(message.results);
                    setResults(data);
                    setView('results');
                }
            }
        };
    }, []);

    return (
        <>
            {progress > 0 && <img src={Spinner} height="16px" width="16px" />}
            <Heading>{progress == 0 ? 'Initializing scan' : 'Scanning'}</Heading>
            <BodyText css={{color: theme.colors.accessible, paddingLeft: 8, marginBottom: 0}}>
                {progress == 0 ? '...' : progress + '%'}
            </BodyText>
        </>
    );
};
export default function Loading({setView, setResults}) {
    const [cancel, setCancel] = React.useState(false);
    React.useEffect(() => {
        window.onmessage = (event) => {
            const {type, message} = event.data.pluginMessage;
            if (type === 'Cancel') {
                setCancel(message.cancel);
            }
        };
    }, []);
    const Container = styled('main', {
        padding: 16,
    });
    const FlexBox = styled('div', {
        display: 'flex',
        alignItems: 'center',

        '& img': {
            padding: '8px',
        },
    });
    const CancelOp = () => {
        setView('main');
        parent.postMessage({pluginMessage: {type: 'Close'}}, '*');
    };
    return (
        <Container>
            <FlexBox>
                <ProgressStatus setResults={setResults} setView={setView} />
            </FlexBox>
            <BodyText>
                For large libraries this can take some time to intialize, but once it initializes you can cancel.
            </BodyText>
            {cancel && (
                <Button onClick={CancelOp} css={{backgroundColor: theme.colors.error}}>
                    Cancel
                </Button>
            )}
        </Container>
    );
}

import * as React from 'react';
import {GlobalStyles, styled} from '../../../stiches.theme';
import '../styles/ui.css';
import Main from './views/main';
import * as WebFont from 'webfontloader';
import Loading from './views/loading';
const App = ({}) => {
    const [currentView, setView] = React.useState('main');
    const [progress, setProgress] = React.useState(0);
    const onEval = () => {
        console.log('Evaluating');
        setView('loading');
        parent.postMessage({pluginMessage: {type: 'evaluate'}}, '*');
    };
    const Container = styled('main', {
        overflowY: 'hidden',
    });
    React.useEffect(() => {
        GlobalStyles();
        try {
            WebFont.load({
                google: {
                    families: ['Inter', 'Roboto'],
                },
            });
        } catch (error) {
            console.log('Failed to load a font');
        }
        // This is how we read messages sent from the plugin controller
        window.onmessage = (event) => {
            const {type, message} = event.data.pluginMessage;
            if (type === 'Loading') {
                console.log(message.progress);
                if (message.done) {
                    setView('main');
                    setProgress(100);
                } else {
                    setView('loading');
                }
            } else if (type === 'Progress') {
                setProgress(message.progress);
            }
        };
    }, []);

    return (
        <Container>
            {currentView == 'main' && <Main onEval={onEval} />}
            {currentView == 'loading' && <Loading progress={progress} />}
        </Container>
    );
};

export default App;

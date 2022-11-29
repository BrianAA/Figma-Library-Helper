import * as React from 'react';
import {GlobalStyles, css, styled} from '../../../stiches.theme';
import '../styles/ui.css';
import Main from './views/main';
import * as WebFont from 'webfontloader';
import Loading from './views/loading';
import ReactJson from 'react-json-view';

const App = ({}) => {
    const [currentView, setView] = React.useState('main');
    const [results, setResults] = React.useState({});
    const onEval = () => {
        console.log('Evaluating');
        setView('loading');
        parent.postMessage({pluginMessage: {type: 'evaluate'}}, '*');
    };
    const JSONContainer = css({
        padding: 16,
        height: 800,
        overflowY: 'scroll',
    });
    const Container = styled('main', {});
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
            console.log(type);
            if (type == 'Home') {
                setView('main');
            }
            if (type == 'Progress') {
                console.log(message.results);
            }
        };
    }, []);

    return (
        <Container>
            {currentView == 'main' && <Main onEval={onEval} />}
            {currentView == 'loading' && <Loading setView={setView} setResults={setResults} />}
            {currentView == 'results' && (
                <div className={`${JSONContainer}`}>
                    <ReactJson
                        theme={'summerfruit:inverted'}
                        collapsed={2}
                        displayDataTypes={false}
                        iconStyle={'triangle'}
                        indentWidth={3}
                        enableClipboard={true}
                        src={results}
                    />
                </div>
            )}
        </Container>
    );
};

export default App;

import React from 'react';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { Provider } from 'react-native-basic-elements/lib/Components/Theme';

const Main = () => {
    return (
        <Provider>
            <App />
        </Provider>
    )
}

AppRegistry.registerComponent(appName, () => Main);

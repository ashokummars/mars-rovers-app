import { createStore, applyMiddleware } from 'redux';
import reducer from './reducer';

import thunkMiddleware from 'redux-thunk';

export const makeStore = initialState => {
    const store = createStore(reducer, initialState, applyMiddleware(thunkMiddleware));

    if (module.hot) {
        module.hot.accept('./reducer', () => {
            console.log('Replacing reducer');
            store.replaceReducer(require('./reducer').default);
        });
    }

    return store;
};
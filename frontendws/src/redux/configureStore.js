import { createStore , applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import authReducer from './authReducer';
import SecureLS from 'secure-ls';
import { setAuthorizationHeader } from '../api/apiCalls';

const secureLS= new SecureLS(); // secureLS storage dan data okurken encrypt decrypt yapar


const getStateFromStorage = () => {
    const jokeAuth = secureLS.get('joke-auth');

    let stateInLocalStorage = {
        isLoggedIn: false,
        username: undefined,
        displayName: undefined,
        image: undefined,
        password: undefined
    };

    if (jokeAuth) {
        return jokeAuth;
    }
    return stateInLocalStorage;
}

const updateStateInStorage = newState =>{
    secureLS.set('joke-auth',newState);
}

const configureStore = () => {
    const initialState = getStateFromStorage();
    setAuthorizationHeader(initialState);
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
   
    const store = createStore(authReducer, initialState, composeEnhancers(applyMiddleware(thunk)));
    store.subscribe(() => {
        updateStateInStorage(store.getState());
        setAuthorizationHeader(store.getState());
    })
    return store;
}

export default configureStore;
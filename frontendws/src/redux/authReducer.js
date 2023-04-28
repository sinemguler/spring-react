import * as ACTIONS from './Constants'; // constansdaki bütün export edilen değerleri actions olarak import et

const defaultState = {
    isLoggedIn: false,
    username: undefined,
    displayName: undefined,
    image: undefined,
    password: undefined
 };
 
 const authReducer = (state = {...defaultState }, action) => {
    if (action.type === ACTIONS.LOGOUT_SUCCESS) {
       return defaultState;
    }else if(action.type === ACTIONS.LOGIN_SUCCESS){
      return {
         ...action.payload,
         isLoggedIn: true
      };
    }
    return state;
 };

 export default authReducer;
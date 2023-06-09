import axios from 'axios';

export const signup = (body) => {
    return  axios.post('/api/1.0/users', body);
};

export const login = creds => {
   return axios.post('/api/1.0/auth', {}, {auth : creds});
};

export const changeLanguage = language => {
    axios.defaults.headers['accept-language'] = language;
};

export const getUsers = (page = 0 ,size = 3) => {
    return axios.get(`/api/1.0/users?page=${page}&size=${size}`);
};

export const setAuthorizationHeader = ({username, password, isLoggedIn}) => {
    if(isLoggedIn){
    const authorizationHeaderValue = `Basic ${btoa(username + ':'+password)}`; //btoa fonksiyonu stringi base64 e çevirir
    axios.defaults.headers['Authorization'] = authorizationHeaderValue;
    } else {
        delete axios.defaults.headers['Authorization'];
    }
};


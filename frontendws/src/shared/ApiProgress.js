import { useEffect, useState } from 'react';
import axios from 'axios';

export const useApiProgress = (apiPath) => {
    const [pendingApiCall, setPendingApiCall] = useState(false)

    useEffect(() => {
        let requestInterceptors, responseInterceptors;

        const updateApiCallFor = (url, inProgress) => {
            if (url.startsWith(apiPath)) {
                setPendingApiCall(inProgress);
            }
        };

        const registerInterceptors = () => {
            requestInterceptors = axios.interceptors.request.use(request => {
                console.log('running request interceptor', apiPath);
                updateApiCallFor(request.url, true);
                return request;
            });

            responseInterceptors = axios.interceptors.response.use(response => {
                updateApiCallFor(response.config.url, false);
                return response;
            }, error => {
                updateApiCallFor(error.config.url, false);
                throw error;
            }
            );
        };

        const unregisterInterceptors = () => {
            axios.interceptors.request.eject(requestInterceptors);
            axios.interceptors.response.eject(responseInterceptors);
        }

        registerInterceptors();

        return function unmount() {
            unregisterInterceptors();
        };
    }, []);
    
    return pendingApiCall;
};



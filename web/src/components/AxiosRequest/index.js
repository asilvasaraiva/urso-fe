import axios from 'axios';

const URL = 'http://localhost:8080/api';

const AxiosRequest =  axios.create({
    baseURL:URL
});

AxiosRequest.interceptors.response.use(response => {
    return response;
}, error => {    
    return Promise.reject(error.response);
});

export default AxiosRequest;
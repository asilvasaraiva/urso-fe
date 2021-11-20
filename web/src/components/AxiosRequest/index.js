import axios from 'axios';
import retrieveToken from '../useToken';

const URL = 'http://localhost:8080/api';

export default axios.create({
    baseURL:URL
});
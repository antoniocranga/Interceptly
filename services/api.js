import Axios from 'axios';
import { setCookie, getCookie } from 'cookies-next';


export default class Api {
    constructor() {
        this.baseUrl = process.env.ENVIRONMENT == 'development' ? process.env.BASE_URL_TEST : process.env.BASE_URL_PRODUCTION;
        this.apiKey = null;
        this.client = null;
        this.apiUrl = 'localhost:8080';
    }
    
    init = () => {
        this.apiToken = getCookie('access_token');
        let headers = {
            Accept: 'application/json'
        };
        if (this.apiKey) {
            headers.Authorization = `Bearer ${apiKey}`;
        }
        this.client = axios.create({ baseURL: this.apiUrl, timeout: 31000, headers: headers });
        return this.client;
    };
    getUser = (data) => {
        return this.init().get('/users', { params: params });
    };
}

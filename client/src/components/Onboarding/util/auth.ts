import {init} from 'nocknock-sdk';
import environment from '../../../config/environment';

const {authDomainApi} = environment;

const auth = init({baseURL: `${authDomainApi}`, withCredentials: true});

export default auth;

import {Alert} from 'react-native';
import {store} from '../redux/index';
import config from '../../app.json';
import axios from 'axios';
import {setAuthEmail, setAuthPassword, setAuthToken} from '../redux/auth';

export default class LoginService {
  /**
   * @type {string}
   */
  email: '';
  /**
   * @type {string}
   */
  password: '';
  /**
   * @type {string}
   */
  token: '';

  constructor(email, password) {
    this.email =
      email !== undefined && email !== '' ? email : store.getState().Auth.email;

    this.password =
      password !== undefined && password !== ''
        ? password
        : store.getState().Auth.password;

    this.token = store.getState().Auth.token;

    setTimeout(() => {
      const networkStatus = store.getState().Network.connected;
      if (!networkStatus) {
        Alert.alert('Seu aparelho está sem internet');
      }
    }, 500);
  }

  async auth(justCheck = false) {
    try {
      const data = {
          email: this.email,
          password: this.password,
        },
        headers = {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        };

      const response = await axios({
        method: 'post',
        responseType: 'json',
        url: `${config.api}/api/login`,
        data: data,
        headers: headers,
      });

      if (!justCheck && response.data?.token) {
        store.dispatch(setAuthToken(response.data.token));
        store.dispatch(setAuthEmail(this.email));
        store.dispatch(setAuthPassword(this.password));
      }

      return true;
    } catch (exception) {
      if (exception.response.data?.error) {
        Alert.alert(exception.response.data?.error);
        return false;
      }

      if (__DEV__) {
        Alert.alert(exception.message);
        return false;
      }

      Alert.alert(
        'Houve um problema de comunicação com servidores de autenticação',
      );

      return false;
    }
  }
}

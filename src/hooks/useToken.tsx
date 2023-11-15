import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';
import useAuth from './useAuth';

const key = 'pecel-ayam_123';

const useToken = () => {
  const { setAuth } = useAuth();

  // Encrypt auth and then store it in cookie
  const encryptToken = (text: string) => {
    const data = CryptoJS.AES.encrypt(
      JSON.stringify(text),
      key
    ).toString();

    Cookies.set('userdata', data);
  };

  // Decrypt auth and then return the data
  const decryptToken = () => {
    const data = Cookies.get('userdata');

    if (data) {
      const bytes = CryptoJS.AES.decrypt(
        data.toString(),
        key
      ) ;
      return JSON.parse(JSON.parse(bytes.toString(CryptoJS.enc.Utf8)));
    }

    return ({
      user: null,
      token: null,
      role: 1573
    });
  };

  // Remove auth from cookie
  const removeToken = () => {
    Cookies.remove('userdata');
    // window.location.reload();
    setAuth({
      user: null,
      token: null,
      role: 1573
    });
  };

  return {
    encryptToken,
    decryptToken,
    removeToken,
  }
};

export default useToken;
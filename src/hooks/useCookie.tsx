import { useState } from 'react';
import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';

const key = 'pecel-ayam_123';

const useCookie = () => {
  const decryptCookie = () => {
    const userdata = Cookies.get('userdata');

    if (userdata) {
      const bytes = CryptoJS.AES.decrypt(
        userdata.toString(),
        key
      ) ;
      const data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      return JSON.parse(data);
    }

    return {
      user: null,
      token: null,
      role: 1573
    };
  };

  const [userdata, setUserdata] = useState(decryptCookie());

  const encryptCookie = (text: string) => {
    const temp = JSON.parse(JSON.parse(text));
    setUserdata(temp);

    const encryptedData = CryptoJS.AES.encrypt(
      JSON.stringify(text),
      key
    ).toString();

    Cookies.set('userdata', encryptedData);
    
  };

  const removeCookie = (name: string) => {
    Cookies.remove(name);
    setUserdata({
      user: null,
      token: null,
      role: 1573
    });
  };

  return {
    encryptCookie,
    removeCookie,
    userdata
  }
};

export default useCookie;
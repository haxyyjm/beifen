import CryptoJS from 'crypto-js'
export default {//加密
    encrypt(word, keyStr){ 
      keyStr = keyStr ? keyStr : 'kgjp20190614java';
      var key  = CryptoJS.enc.Utf8.parse(keyStr);//Latin1 w8m31+Yy/Nw6thPsMpO5fg==
      var srcs = CryptoJS.enc.Utf8.parse(word);
      var encrypted = CryptoJS.AES.encrypt(srcs, key, {mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7});
      return encrypted.toString();
    },
    //解密
    decrypt(word, keyStr){  
      keyStr = keyStr ? keyStr : 'kgjp20190614java';
      var key  = CryptoJS.enc.Utf8.parse(keyStr);//Latin1 w8m31+Yy/Nw6thPsMpO5fg==
      var decrypt = CryptoJS.AES.decrypt(word, key, {mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7});
      return CryptoJS.enc.Utf8.stringify(decrypt).toString();
    }
    // encrypt(word){
    //   let key = 'kgjp20190614java'
    //   let iv  = 'kgjp20190614java' 
    //   let srcs = CryptoJS.enc.Utf8.parse(word);
    //   var encrypted = CryptoJS.AES.encrypt(srcs, key, { iv: iv,mode:CryptoJS.mode.CBC,padding: CryptoJS.pad.ZeroPadding});
    //   return encrypted.ciphertext.toString().toUpperCase();
    // },
    // decrypt(word){  
    //   let key = 'kgjp20190614java'
    //   let iv  = 'kgjp20190614java' 
    //   var encryptedHexStr = CryptoJS.enc.Hex.parse(word);
    //   var srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
    //   var decrypt = CryptoJS.AES.decrypt(srcs, key, { iv: iv,mode:CryptoJS.mode.CBC,padding: CryptoJS.pad.ZeroPadding});
    //   var decryptedStr = decrypt.toString(CryptoJS.enc.Utf8); 
    //   return decryptedStr.toString();
    // }
}

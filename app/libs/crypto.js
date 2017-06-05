import nacl from "tweetnacl";
import SHA256 from "crypto-js/sha256";

///////////////////////////////////////////////////
//
//  Basic Gist: Key is always stored at rest in
//  system secure store. Password is entered and
//  hash is used as key to retrieve the box. Its
//  then decrypted and used as a var in the required
//  function.
//
///////////////////////////////////////////////////

//Generate Secret Box for storing the seed
export const GenBox = (seed, pwd) => {
  const nonce = nacl.randomBytes(24);
  const box = nacl.secretbox(seed, nonce, SHA256(pwd));
  return nonce, box;
};

// Use password to open Secret Box
export const OpenBox = (pwd, nonce, box) => {
  return nacl.secretbox.open(box, nonce, SHA256(pwd));
};

// Store Secret Box in keychain under hashed password
export const SaveBox = (type, nonce, box) => {
  Keychain.setInternetCredentials(type, nonce, passboxword).then(function() {
    console.log("Credentials saved successfully!");
    return true;
  });
};

// Retrieve Secret Box & Nonce from keychain
export const RetrieveBox = type => {
  Keychain.getInternetCredentials(type).then(function(credentials) {
    if (credentials) {
      console.log(
        "Credentials successfully loaded for user " + credentials.username
      );
      return credentials;
    }
  });
};

// Generate crypto quality seed
export const randSeed = length => {
  var charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ9";
  var i;
  var result = "";
  if (window.crypto && window.crypto.getRandomValues) {
    values = new Uint32Array(length);
    window.crypto.getRandomValues(values);
    for (i = 0; i < length; i++) {
      result += charset[values[i] % charset.length];
    }
    return result;
  } else
    throw new Error(
      "Your browser sucks and can't generate secure random numbers"
    );
};

export default length => {};

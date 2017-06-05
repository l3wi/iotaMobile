import nacl from "tweetnacl";
import encUtils from "tweetnacl-util";
import Iota, { Valid } from "./iota";
import CryptoJS from "crypto-js";
import { TextEncoder, TextDecoder } from "text-encoding";
import * as Keychain from "react-native-keychain";
import { AsyncStorage } from "react-native";

///////////////////////////////////////////////////
//
//  Basic Gist: Key is always stored at rest in
//  system secure store. Password is entered and a
//  hash is used as key to retrieve the box and
//  then decrypted. Then its passed as a var in
//  the required function.
//
///////////////////////////////////////////////////

export const InitialiseSeed = async (seed, password) => {
  if (!Valid.isTrytes(seed)) return [false, "Please enter valid seed."];
  await GenBox(seed, password);
  Iota.getAccount(await OpenBox("seed", password), function(error, success) {
    if (success) {
      console.log(success);
    }
  });
};

//Generate Secret Box for storing the seed
export const GenBox = async (seed, pwd) => {
  const nonce = await nacl.randomBytes(24);
  const box = await nacl.secretbox(
    stringToU8(seed),
    nonce,
    wordToArray(CryptoJS.SHA256(pwd))
  );
  return await SaveBox("seed", {
    nonce: encUtils.encodeBase64(nonce),
    box: encUtils.encodeBase64(box)
  });
};

// Store Secret Box in keychain under hashed password
export const SaveBox = async (type, box) => {
  await AsyncStorage.setItem(type, JSON.stringify(box), err => {
    if (err) return false;
    return true;
  });
  // Keychain.setInternetCredentials(type, nonce, passboxword).then(function() {
  //   console.log("Credentials saved successfully!");
  //   return true;
  // });
};

// Use password to open Secret Box
export const OpenBox = async (type, pwd) => {
  const BoxObj = JSON.parse(await RetrieveBox(type));
  return uintToS(
    await nacl.secretbox.open(
      encUtils.decodeBase64(BoxObj.box),
      encUtils.decodeBase64(BoxObj.nonce),
      wordToArray(CryptoJS.SHA256(pwd))
    )
  );
};

// Retrieve Secret Box & Nonce from keychain
export const RetrieveBox = async type => {
  try {
    const value = await AsyncStorage.getItem(type);
    if (value !== null) {
      return value;
    }
  } catch (error) {
    // Error retrieving data
  }

  // Keychain.getGenericPassword()
  //   .then(function(credentials) {
  //     console.log(
  //       "Credentials successfully loaded for user " + credentials.username
  //     );
  //   })
  //   .catch(function(error) {
  //     console.log("Keychain couldn't be accessed! Maybe no value set?", error);
  //   });
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
//////////////////////////
// Helpers
//Word Array to Uint8Array
const wordToArray = wordArray => {
  // Shortcuts
  var words = wordArray.words;
  var sigBytes = wordArray.sigBytes;
  // Convert
  var u8 = new Uint8Array(sigBytes);
  for (var i = 0; i < sigBytes; i++) {
    var byte = (words[i >>> 2] >>> (24 - i % 4 * 8)) & 0xff;
    u8[i] = byte;
  }
  return u8;
};

//String to Uint8Array
const stringToU8 = string => {
  return new TextEncoder().encode(string);
};

//Uint8Array to string
const uintToS = uintArray => {
  return new TextDecoder("utf-8").decode(uintArray);
};

export default length => {};

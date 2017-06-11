import nacl from "tweetnacl";
// import encUtils from "tweetnacl-util";
import Iota, { Valid } from "./iota";
import CryptoJS from "crypto-js";
import { TextEncoder, TextDecoder } from "text-encoding";
import * as Keychain from "react-native-keychain";

///////////////////////////////////////////////////
//
//  Basic Gist: Key is always stored at rest in
//  system secure store. Password is entered  and a
//  hash is used as key to retrieve the box and
//  then decrypted. Then its passed as a var in
//  the required function.
//
///////////////////////////////////////////////////

export const InitialiseSeed = async (seed, password) => {
  if (!Valid.isTrytes(seed)) return [false, "Please enter valid seed."];
  return await GenBox(seed, password);
};

//Generate Secret Box for storing the seed
export const GenBox = async (seed, pwd) => {
  const nonce = await nacl.randomBytes(24);
  const box = await nacl.secretbox(stringToU8(seed), nonce, pwd);
  return await SaveBox("seed", {
    nonce: encodeBase64(nonce),
    box: encodeBase64(box)
  });
};

// Store Secret Box in keychain under hashed password
export const SaveBox = async (type, box) => {
  await Keychain.setInternetCredentials(
    type,
    box.nonce,
    box.box
  ).then(function() {
    console.log("Credentials saved successfully!");
    return true;
  });
};

// Retrieve Secret Box & Nonce from keychain
export const RetrieveBox = async type => {
  const box = await Keychain.getInternetCredentials(type)
    .then(function(credentials) {
      if (!credentials) return false;
      return credentials;
    })
    .catch(function(error) {
      console.log("Keychain couldn't be accessed! Maybe no value set?", error);
      return false;
    });
  return box;
};

// Use password to open Secret Box
export const OpenBox = async (type, pwd) => {
  const EncBox = await RetrieveBox(type);
  const box = await nacl.secretbox.open(
    decodeBase64(EncBox.password),
    decodeBase64(EncBox.username),
    pwd
  );
  if (!box) return false;
  return uintToS(box);
};

// Delete Secret Box & Nonce from keychain
export const DeleteBox = type => {
  Keychain.resetInternetCredentials(type).then(function() {
    console.log("Credentials successfully deleted");
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
//////////////////////////
// Helpers
//Word Array to Uint8Array
export const hashPwd = pwd => {
  return wordToArray(CryptoJS.SHA256(pwd));
};
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
export const stringToU8 = string => {
  return new TextEncoder().encode(string);
};

//Uint8Array to string
export const uintToS = uintArray => {
  return new TextDecoder("utf-8").decode(uintArray);
};

/// uint8 to Base64
const encodeBase64 = function(arr) {
  var i, s = [], len = arr.length;
  for (i = 0; i < len; i++)
    s.push(String.fromCharCode(arr[i]));
  console.log(btoa(s.join("")));
  return btoa(s.join(""));
};

/// Base64 to Uint8
const decodeBase64 = function(s) {
  // validateBase64(s);
  var i, d = atob(s), b = new Uint8Array(d.length);
  for (i = 0; i < d.length; i++)
    b[i] = d.charCodeAt(i);
  console.log(b);
  return b;
};

const validateBase64 = s => {
  if (
    !/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(s)
  ) {
    throw new TypeError("invalid encoding");
  }
};

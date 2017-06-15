// NaCl JS implimentation
import nacl from "tweetnacl";
// Standford Javascript Crypto Lib (Used for secure PRNG & SHA256 in React Native)
import sjcl from "sjcl";
// Simple wrapper for iota.lib.js
import Iota, { Valid } from "./iota";
// Basic Encoding Shims
import { TextEncoder, TextDecoder } from "text-encoding";
// RN Keychain module
import * as Keychain from "react-native-keychain";

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

// Use SJCL for generating Rand Array
const randArray = length => {
  return sjcl.random.randomWords(length, 10);
};

// Generate crypto quality seed from a rand array
export const randSeed = length => {
  var charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ9";
  var i;
  var result = "";
  var values = randArray(length);
  for (i = 0; i < length; i++) {
    result += charset[Math.abs(values[i]) % charset.length];
  }
  return result;
};
//////////////////////////
// Helpers

//Word Array to Uint8Array
export const hashPwd = pwd => {
  const hash = sjcl.hash.sha256.hash(pwd);
  return decodeBase64(sjcl.codec.base64.fromBits(hash));
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
  var i,
    s = [],
    len = arr.length;
  for (i = 0; i < len; i++) s.push(String.fromCharCode(arr[i]));
  return btoa(s.join(""));
};

/// Base64 to Uint8
const decodeBase64 = function(s) {
  // validateBase64(s);
  var i,
    d = atob(s),
    b = new Uint8Array(d.length);
  for (i = 0; i < d.length; i++) b[i] = d.charCodeAt(i);
  return b;
};

// Setting char set for atob/btoa
const chars =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

/// Btoa Polyfill
const btoa = input => {
  let str = input;
  let output = "";

  for (
    let block = 0, charCode, i = 0, map = chars;
    str.charAt(i | 0) || ((map = "="), i % 1);
    output += map.charAt(63 & (block >> (8 - i % 1 * 8)))
  ) {
    charCode = str.charCodeAt((i += 3 / 4));

    block = (block << 8) | charCode;
  }

  return output;
};

/// Atob Polyfill
const atob = input => {
  let str = input.replace(/=+$/, "");
  let output = "";

  if (str.length % 4 == 1) {
    throw new Error(
      "'atob' failed: The string to be decoded is not correctly encoded."
    );
  }
  for (
    let bc = 0, bs = 0, buffer, i = 0;
    (buffer = str.charAt(i++));
    ~buffer && ((bs = bc % 4 ? bs * 64 + buffer : buffer), bc++ % 4)
      ? (output += String.fromCharCode(255 & (bs >> ((-2 * bc) & 6))))
      : 0
  ) {
    buffer = chars.indexOf(buffer);
  }

  return output;
};

// Make sure base64 is ok
const validateBase64 = s => {
  if (
    !/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(s)
  ) {
    throw new TypeError("invalid encoding");
  }
};

# IOTA Mobile

A simple wallet application for IOTA token.

### Overview

This wallet application will enable iOS & Android users to securely access or generate a wallet on their mobile device. It will allow a user to send, receive, and generate addresses.

Security of the seed while the app is in active use will be handled by the audited [TweetNaCl](https://github.com/dchest/tweetnacl-js) using the secrect box function (Sand box: [here](https://tweetnacl.js.org/#/secretbox)). At rest the secret box will be stored by iOS [Keychain](https://developer.apple.com/library/content/documentation/Security/Conceptual/keychainServConcepts/iPhoneTasks/iPhoneTasks.html#//apple_ref/doc/uid/TP30000897-CH208-SW1) and on Android Facebook's [Conceal](http://facebook.github.io/conceal/).

### Technology

- [React Native](https://facebook.github.io/react-native/) - Facebook's crossplatform mobile framework
- [iota.lib.js](https://github.com/iotaledger/iota.lib.js) - IOTA foundation's client library for the IOTA Token
- [TweetNaCl.js](https://github.com/dchest/tweetnacl-js) - A javascript port of popular encryption library NaCl
- [react-native-keychain](https://github.com/oblador/react-native-keychain) - A native wrapper for iOS's Keychain & Android's SharedPreferences
- [Styled Components](https://github.com/styled-components/styled-components) - A styling library so the app doesn't look crap.

### Features - V0.1

As specificed in the bounty it will have the following functions:

- [x] Seed
      - [x] Generate Seed
      - [x] Hydrate a pre-exisiting seed
- [x] Send Transfer
      - [ ] Specify amount
      - [ ] Specify address
      - [x] Attach to tangle
- [ ] Receive Transfer
      - [x] Get latest confirmed balance
      - [x] Display all pending transfers
- [x] Generate New Address
      - [ ] Show as qr code - V0.2


- [ ] Settings
      - [ ] Change node address
- [ ] Security
      - [x] Integrate into Native Keystores
      - [x] Encrypt seed in secure box
      - [ ] Remember Me - V0.2
      - [ ] Destory memory on Background

### License

The app will be kept private for it's initial development. When it is ready for auditing it will be shared with the independent developers for inspection. If the review succeeds then the repo will be made public with the GPL-v3 license.
# IOTA Mobile

A simple wallet application for IOTA token.

### Overview

This wallet application will enable iOS & Android users to securely access or generate a wallet on their mobile device. It will allow a user to send, receive, and generate addresses.

Security of the seed while the app is in active use will be handled by the audited [TweetNaCl](https://github.com/dchest/tweetnacl-js) using the secrect box function (Sand box: [here](https://tweetnacl.js.org/#/secretbox)). At rest the secret box will be stored by iOS [Keychain](https://developer.apple.com/library/content/documentation/Security/Conceptual/keychainServConcepts/iPhoneTasks/iPhoneTasks.html#//apple_ref/doc/uid/TP30000897-CH208-SW1) and on Android Facebook's [Conceal](http://facebook.github.io/conceal/).

It also includes a seed generator that is using SJCL's random-words.

### Technology

- [React Native](https://facebook.github.io/react-native/) - Facebook's crossplatform mobile framework
- [Redux](http://redux.js.org/) & [Redux-Persist](https://github.com/rt2zz/redux-persist) - Manages the application state and persists it locally.
- [iota.lib.js](https://github.com/iotaledger/iota.lib.js) - IOTA foundation's client library for the IOTA Token
- [TweetNaCl.js](https://github.com/dchest/tweetnacl-js) - A javascript port of popular encryption library NaCl, used to encrypt the seed
- [Stanford Javascript Crypto Library](https://github.com/bitwiseshiftleft/sjcl) - Standford's JS crypto library, handles hashing and PRNG for the app
- [react-native-keychain](https://github.com/oblador/react-native-keychain) - A native wrapper for iOS's Keychain, stores the seed
- [Styled Components](https://github.com/styled-components/styled-components) - A styling library so the app doesn't look crap.

### Security

For more info on security go [here](https://github.com/l3wi/iotaMobile/wiki/Security)

### Features - V0.1

As specificed in the bounty it will have the following functions:

- Seed
  - Generate Seed
  - Hydrate a pre-exisiting seed
- Send Transfer
  - Specify amount
  - Specify address
  - Attach to tangle
- Receive Transfer
  - Get latest confirmed balance
  - Display all pending transfers
- Generate New Address
  - Show QR code for that
- Settings
     - Change node address
- Security
     - Integrate into Native Keystores
     - Encrypt seed in secure box
     - Destory memory on Background


### Structure

The applicaiton is structured in the following way:

```

--- app -- components // Smaller react components for use in routes
	 | --- libs 	  // Crypto, Remember Me, & Redux Store 
	 | --- routes	  // Application routes
	 | --- assets	  // Images and assets
	 | --- actions	  // Application Actions (Redux)
	 | --- reducers	  // Application Reducers (Redux)
	 | --- entry.js   // Entry point for the application
```

### Setup
```
git clone https://github.com/l3wi/iotaMobile.git 	//clone the repo

cd iotaMobile  						// CD into directory

npm install -g react-native-cli yarn 			// Install Yarn and ReactNative CLI 

yarn  							// Install Deps

react-native run-ios  					// Launch emulator and start bundler

// PS: If simulator has an error. Make sure to Debug JS remotely (Press CMD + D)
```

### License

MIT 2017 - Lewis Freiberg

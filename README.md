## Firebase Chat App

This project aims at creating an App for mobile devices using React Native. The app will
provide users with a chat interface and options to share images and their
location.

## Technologies Used

- React Native
- Expo (toolchain to write native apps in JS)
- React Native Gifted Chat library
- Google Firestore DB
- Google Firebase Authentication
- AsyncStorage caching for offline use
- Firebase cloud storage (for storing images)
- Expo ImagePicker & MediaLibrary for integrating communication features

## Key Features

- A page where users can enter their name and choose a background color for the chat screen
  before joining the chat.
- A page displaying the conversation, as well as an input field and submit button.
- The chat must provide users with two additional communication features: sending images
  and location data.
- Data gets stored online and offline.

## How to set up the application

- As this application requires react native and is developped with Expo, the first step involves downgrading (if necessary) to a node version compatible with Expo:

* npm install 16.19.0
* npm use 16.19.0
* npm alias default 16.19.0

Next, install expo CLI on your machine:

- npm install -g expo-cli

Then create an expo account (https://expo.dev/), and either install expo on your smartphone, or install a virtual machine on your computer.

- Create a react native line by running this command:

npx create-expo-app ChatApp --template

Run expo:

- npm start, or expo start

sync Metro Bundler either with your smartphone (you will need to install the expoGo app) or using your device emulator to see the app live.

### Database configuration

If you wish to use your own database for this project, then create a new database on https://firebase.google.com (signup is required first).

then run 'npm i firebase'

- Navigate to the console ('Go To Console' in the top right)
- Add project
- Once in the project use 'Build->Firestore Database' on the left sid eof the screen under product categories
- Create Database, Start in production mode, hit next and then enable.
- Once in Firestore Database navigate to rules and change 'allow read, write: if false;' to 'allow read, write: if true;' and publish.
- Navigate to 'Project Settings->General'
- Under 'Your apps' select webapp (</>)
- Select a nickname (you don't have to setup Firebase Hosting) and follow the prompts.
- Copy the section of code starting with 'const firebaseConfig =' and paste it into App.js replacing what is in there already.
  const firebaseConfig = {
  [your unique credentials]
  };

Set up Android Studio

### necessary libraries to install

If you want to use all of the features of this app, you will need to run:

- expo install expo-image-picker
- expo install react-native-maps
- expo install expo-location
- expo install expo-media-library

## Github Link

https://github.com/JNicholas54/chat-demo

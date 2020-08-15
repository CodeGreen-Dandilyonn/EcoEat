# EcoEat &nbsp;<img src="/assets/icon.png" height=30/>
A mobile recipe app empowering users to reduce food waste and engage with food sustainability.

## Table of Contents
1. [Overview](#Overview)
2. [App Demo/Walkthrough](#App-Demo)
3. [Available Scripts](#Available-Scripts)

## Overview
### Description
EcoEat is a React Native mobile application that provides users with recipes based on the ingredients in their pantry. By encouraging users to cook with items on-hand instead of purchasing new ingredients or buy take-out, we hope to lower the 76 billion pounds of food wasted by US households each year. We utilized the Spoontacular API to find recipes, highlighting those that are sustainable (i.e. vegan/vegtarian). 

### Features
* Users can store/save ingredients in their virtual pantry simply by searching from our database of items. 
* Based on the pantry, users are recommended recipes on their home page
* Each recipe shows the ingredient, instructions, prep time, and cost per serving.
* Green leaf tags are used to indicate sustainable recipes 
* Users can bookmark recipes to their saved collection
* With the homescreen's swipe tab layout, users can swipe between their recommendations and saved recipes. 
* Login and signup are authorized on Firebase
* Upon registration, onboarding screens help show our value propositions to the user
* Users can see their environmental impact on their profile page based on number of saved vegan/vegetarian recipes

## App Demo
![Demo](/assets/demo.gif)

## Available Scripts
To run the app, download the Expo app on the App Store or Google Play Store.
In the project directory, you can run the command corresponding to your package manager:

### `yarn start`, `expo start`, `npm start`

Runs the app in the development mode through Expo, a React Native framework.<br />

#### Viewing App on iOS Device

Running any of the commands above opens up Expo Developer Tools. Scan the QR code that appears to 
build the project on your device.

- Step 1 : Download Expo Client App 
- Step 2 : Open Camera Application and scan QR Code 

#### Viewing App on Android Device
Running any of the commands above opens up Expo Developer Tools. 

- Step 1: Download Expo client app 
- Step 2: Navigate to Expo app and scan QR Code from Expo Developer Tools 

#### Viewing App on Android Emulator 
Running any of the commands above opens up Expo Developer Tools. 

- Step 1 : Navigate to Android Studio and start emulator from AVD Manager
- Step 2 : Run ```expo start``` in the project directory
- Step 3 : Once Expo Developer Tools opens, select option "run on Android Emulator"

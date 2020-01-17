# MPCHCRemote

Remote control for Media Player Classic - Home Cinema's web interface. Includes directory browsing and file extension filtering.

![Screenshot](https://i.imgur.com/yamZdFq.png)

## Getting Started

### Prerequisites

```
MPC-HC, npm, create-react-native-app
```

### Installing

Clone or download the repository

```
git clone https://github.com/telaak/MPCHCRemote.git
```

Run npm install

```
npm i
```

## Running

dev

```
npm start
```

iOS

```
npm run ios
```

Android

```
npm run android
```

Expo

![Screenshot](https://i.imgur.com/K6ZP7Qn.png)

```
@telaak/mpchc-remote
```

## MPC-HC configuration

Turn on MPC-HC's web interface from View->Options->Web Interface

**Make sure your port is not accessible outside your local network as MPC-HC exposes your whole disk tree (and you probably don't want others to control your player)**

## App configuration

Add the IP address and port (default 13579) of your machine running MPC-HC and any file extensions you wish to list.

## Use instructions

Swipe horizontally for directory browsing and configuration menu. 

Directory browser accepts any path (C:/Users/) or partial path such as C:/User. Pull down to refresh current list.

## Built With

* [Visual Studio Code](https://code.visualstudio.com/)
* [This project was bootstrapped with Create React Native App.](https://github.com/react-community/create-react-native-app)

## Authors

* **Teemu Laaksonen**

See also the list of [contributors](https://github.com/telaak/MPCHCRemote/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

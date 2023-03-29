# Digital twin app 👖
This project is scaffolded with [Expo SDK 48](https://docs.expo.dev/get-started/installation/).

## Requirements
- Expo SDK 46+
- Node.js 16+
- npm 8.3.0+

## Firing it up 
```bash
  npm i
  npm run ios
```

## Data persistence
Data is persisted using [React Native Async Storage](https://github.com/react-native-async-storage/async-storage). Currently, there is no functionality to purge the data using the UI, but it can be done by editing `./data/store.ts` where it says:
```ts
// Uncomment to reset data :-)
// persistor.purge()
```

## Features

### Overall
- [Expo router](https://github.com/expo/router) - file system based router
- [Redux Toolkit](https://github.com/reduxjs/redux-toolkit) storage with [persistence](https://github.com/rt2zz/redux-persist)
- Gestures handled by [React Native Gesture Handler](https://github.com/software-mansion/react-native-gesture-handler/)
- Animation done with [React Native Reanimated](https://github.com/software-mansion/react-native-reanimated)

### Pending items
- Select/Deselect all items
- Slide item to left to dismiss (with snap!)
- Approve alert

### Approved items
- Modal with approved item details

module.exports = {
  preset: 'react-native',
  transformIgnorePatterns: [
    "node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@sentry/react-native|native-base|react-native-svg|react-redux|@react-navigation|@react-native|@reduxjs/toolkit|react-native-gesture-handler)"
  ],
  transform: {
    "^.+\\.[t|j]sx?$": "babel-jest"
  },
};

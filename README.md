# MapJournal

MapJournal is a mobile application that allows users to create photo albums with location data. Users can select images from their gallery, add them to albums, and place these albums on a map with custom coordinates.

## Features

- 📍 Interactive map interface
- 📸 Image selection from gallery
- 🗺️ Album creation with location data
- 📱 Responsive design
- 💾 Persistent storage using Redux
- 🎨 Modern UI with smooth animations

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (for iOS development) or Android Studio (for Android development)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/MapJournal.git
cd MapJournal
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm start
# or
yarn start
```

4. Given that the Google Maps API needs an API key, you need to copy the [`.example.env`](.example.env) file, and change the api key to the one you got from [Google Maps Guidelines](https://developers.google.com/maps/documentation/javascript/get-api-key)

5. Run on your preferred platform:
- Press `i` for iOS simulator
- Press `a` for Android emulator
- Scan the QR code with Expo Go app on your physical device

## Project Structure

```
app/
├── components/         # Reusable UI components
├── hooks/             # Custom React hooks
├── screens/           # Main application screens
├── stores/            # Redux store configuration
├── constants/         # Application constants
└── _layout.tsx        # Root layout configuration
```

## Dependencies

- expo
- react-native
- react-native-maps
- @reduxjs/toolkit
- redux-persist
- @react-native-async-storage/async-storage
- expo-image-picker
- expo-location

## State Management

The application uses Redux with Redux Toolkit for state management. The store is configured with persistence using `redux-persist` and `@react-native-async-storage/async-storage`.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Expo team for the amazing development platform
- React Native community for the great ecosystem
- All contributors who have helped improve this project

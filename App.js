import { StyleSheet, SafeAreaView, ImageBackground, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import { useState, useCallback } from 'react';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import Colors from './constants/colors';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
  
  const [userNumber, setUserNumber] = useState(null);

  const [fontsLoaded, fontError] = Font.useFonts({ 
    'Inter-Black': require('./assets/fonts/Inter-Black.otf'),
    'Sofia-Regular': require('./assets/fonts/Sofia-Regular.otf'),
  })

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  function pickedNumberHandler (pickedNumber) {
    setUserNumber(pickedNumber);
  }

  let screen = <StartGameScreen onPickNumber={pickedNumberHandler} />

  if (userNumber) {
    screen = <GameScreen  resetNumber={setUserNumber} userNumber={userNumber} />
  }

  return (
    <LinearGradient colors={[Colors.primary700,Colors.accent500]} style={styles.rootScreen}>
      <ImageBackground 
        source={require('./assets/images/dicesBkg.jpg')} 
        resizeMode='cover'
        style={styles.rootScreen}
        imageStyle={styles.backgroundImage}
        >
          <SafeAreaView onLayout={onLayoutRootView} style={styles.rootScreen}>
             {screen}
          </SafeAreaView>

      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  backgroundImage: {
    opacity: .55,
  }
});

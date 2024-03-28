import { StyleSheet, SafeAreaView, ImageBackground, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

import { useState } from 'react';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import Colors from './constants/colors';

export default function App() {
  
  const [userNumber, setUserNumber] = useState(null);

  const [fontsLoaded] = useFonts({ 
    'raleway-font':require('./assets/fonts/AlexBrush-Regular.ttf'),
    'raleway-font-bold':require('./assets/fonts/Raleway-Bold.ttf'),
   })

  function pickedNumberHandler (pickedNumber) {
    setUserNumber(pickedNumber);
  }

  let screen = <StartGameScreen onPickNumber={pickedNumberHandler} />

  //if(!fontsLoaded) return <Text> LOADINGO!!!!!!....... </Text>;
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
          <SafeAreaView style={styles.rootScreen}>
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

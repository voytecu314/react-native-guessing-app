import { StyleSheet, Alert, View, Text } from "react-native";
import { useState } from "react";
import Title from "./components/ui/Title";
import NumberContainer from "./components/game/NumberContaier";
import PrimaryButton from "./components/ui/PrimaryButton";
import Card from "./components/ui/Card";
import InstructionText from "./components/ui/InstructionText";
import { Fontisto  } from '@expo/vector-icons'

function generateRandomNumberBetweenAndWithout (min, max, exclude) {
    const randomNumber = Math.floor(Math.random() * (max-min)) + min;

    if(randomNumber === exclude) {
        return generateRandomNumberBetweenAndWithout(min, max, exclude)
    } else {
        return randomNumber;
    }
}

let minBoundry = 1, maxBoundry = 100;

export default function GameScreen ({userNumber, resetNumber}) {

    const [currentGuess, setCurrentGuess] = useState( generateRandomNumberBetweenAndWithout(0,100,userNumber) );

    function nextGuessHandler (direction) {

        if(
            (direction === 'lower' && currentGuess < userNumber) || 
            (direction === 'higher' && currentGuess > userNumber)
          ) {
            Alert.alert('Dont lie!', 'You know its not correct', [{text: 'Sorry!', style:'cancel'}])
            return;
          }

        if(direction === 'lower') {
            maxBoundry = currentGuess;
        } else {
            minBoundry = currentGuess + 1;
        }
        
        const newRandomNumber = generateRandomNumberBetweenAndWithout(minBoundry, maxBoundry, currentGuess);
        if(newRandomNumber == userNumber) {
            resetNumber(null);
            return Alert.alert("I guessed!", `Your number is ${newRandomNumber}`);
        }
        setCurrentGuess(newRandomNumber);
        
    }

    return (
        <View style={styles.screen}>
           <Title>App guess</Title>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card>
                <InstructionText style={{marginBottom: 12}}>Higher or Lower</InstructionText>
                <View style={styles.buttonsContainer}>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPressHandler={nextGuessHandler.bind(this, 'higher')}>
                            <Fontisto name="plus-a" size={24} color="white" />
                        </PrimaryButton>
                    </View>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPressHandler={nextGuessHandler.bind(this, 'lower')}>
                            <Fontisto name="minus-a" size={24} color="white" />
                        </PrimaryButton>
                    </View>
                </View>
            </Card>
            <View>{/* LOG ROUNDS */}</View>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        gap: 10,
        marginTop: 15,
        padding: 24
    },
    buttonsContainer: {
        flexDirection: 'row',
    },buttonContainer: {
        flex: 1,
    },
});
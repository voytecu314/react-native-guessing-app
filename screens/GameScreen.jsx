import { StyleSheet, Alert, View, Text, Button, FlatList  } from "react-native";
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

    const initialGuess = generateRandomNumberBetweenAndWithout(0,100,userNumber);
    const [currentGuess, setCurrentGuess] = useState( initialGuess );
    const [ guessedNumbers, setGuessedNumbers ] = useState( [initialGuess] );
    const [gameOver, setGameOver] = useState(false);

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
        //console.log({direction, currentGuess, userNumber, rounds: guessedNumbers.length, newRandomNumber});
        if(newRandomNumber == userNumber) {
            setGameOver(true);
            return Alert.alert(`I guessed in ${guessedNumbers.length} rounds!`, `Your number is ${newRandomNumber}`);
        }
        setCurrentGuess(newRandomNumber);
        setGuessedNumbers([...guessedNumbers, newRandomNumber]);
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
            <FlatList 
                data={guessedNumbers}
                keyExtractor={item=>item}
                renderItem={({item})=><Text>{item}</Text>}
            ></FlatList>
            {gameOver && <Button title="New Game" onPress={()=>resetNumber(null)} />}
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
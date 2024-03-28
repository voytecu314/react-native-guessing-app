import { StyleSheet, TextInput, View, Alert } from "react-native";
import { useState } from "react";
import PrimaryButton from "./components/ui/PrimaryButton";
import Colors from "../constants/colors";
import Title from "./components/ui/Title";
import Card from "./components/ui/Card";
import InstructionText from "./components/ui/InstructionText";


export default function StartGameScreen ({onPickNumber}) {

    const [enteredNumber, setEnteredNumber] = useState('');

    function numberInputHandler (enteredText) {
        setEnteredNumber(enteredText);
    }

    function resetInputHandler () {
        setEnteredNumber('');
    }

    function confirmInputHandler () {
        const chosenNumber = parseInt(enteredNumber);
        if( isNaN(chosenNumber) || chosenNumber<=0 || chosenNumber>99) {
            Alert.alert(
                'Invalid number', 
                'Number has to be a number between 1 and 99.', 
                [{text: 'Okay', style: 'destructive', onPress: resetInputHandler}]);
            return;
        }
        onPickNumber(enteredNumber);
    }

    return (
        <View style={styles.rootContainer}>
            <Title>I will guess your number</Title>
            <Card style={styles.inputContainer}>
                <InstructionText>Enter a number</InstructionText>
                <TextInput 
                    style={styles.numberInput} 
                    maxLength={2} 
                    keyboardType="number-pad" 
                    autoCapitalize="none" 
                    autoCorrect={false} 
                    onChangeText={numberInputHandler}
                    value={enteredNumber}
                />
                <View style={styles.buttonsContainer}>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPressHandler={resetInputHandler}>Reset</PrimaryButton>
                    </View>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPressHandler={confirmInputHandler}>Confirm</PrimaryButton>
                    </View>
                </View>
                
            </Card>
            
        </View>
    )
}

const styles = StyleSheet.create({
    rootContainer: {
        marginTop: 40,
        padding: 10,
    },
    numberInput: {
        height: 50,
        width: 50,
        marginVertical: 8,
        fontSize: 32,
        fontWeight: 'bold',
        borderBottomColor: Colors.accent500,
        borderBottomWidth: 2,
        color: Colors.accent500,
        textAlign: 'center',
    },
    buttonsContainer: {
        flexDirection: 'row',
    },
    buttonContainer: {
        flex: 1,
    }
});
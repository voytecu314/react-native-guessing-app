import { StyleSheet, View, Text, Pressable } from "react-native";
import Colors from "../../../constants/colors";


export default function PrimaryButton ({ children, onPressHandler }) {

    return (
        <View style={styles.buttonOuterContainer}>
            <Pressable 
                style={({pressed})=> pressed ? [styles.buttonInnerContainer,styles.pressed] : styles.buttonInnerContainer} 
                onPress={onPressHandler} 
                android_ripple={{color: Colors.primary600}}>
            
                <Text style={styles.buttonText}>{children}</Text>
            
            </Pressable>
        </View>
    )

}

const styles = StyleSheet.create({
    buttonOuterContainer: {
        margin:4,
        borderRadius: 28,
        overflow: 'hidden',
    },
    buttonInnerContainer: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        elevation: 2,
        backgroundColor: Colors.primary500,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },
    pressed: {
        opacity: '.75',
    }
});
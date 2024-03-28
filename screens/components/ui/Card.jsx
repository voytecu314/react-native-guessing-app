import { StyleSheet, View } from "react-native";
import Colors from "../../../constants/colors";

export default function Card ({children}) {
    return (
        <View style={styles.inputContainer}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        alignItems: 'center',
        padding: 16,
        marginTop: 100,
        marginHorizontal: 24,
        backgroundColor: Colors.primary800,
        borderRadius: 8,
        elevation: 4, /* shadow for Android */
        shadowColor: 'black', /* shadow for iOS */
        shadowOffset: {width: 0, height: 2}, /* shadow for iOS */
        shadowRadius: 6, /* shadow for iOS */
        shadowOpacity: .25, /* shadow for iOS */
    },
});
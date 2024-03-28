import { StyleSheet, Text } from "react-native";

export default function Title ({children}) {
    return  <Text style={styles.title}>{children}</Text>
}

const styles = StyleSheet.create({
    title: {
        fontFamily: 'Inter-Black' ,
        fontSize: 28,
        color: 'white',
        textAlign: 'center',
        borderWidth: 2,
        borderColor: 'white',
        padding: 12,
    }
});
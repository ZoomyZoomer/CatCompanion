import { View, Text, StyleSheet } from "react-native"

const TextInput = ({}) => {

    return (
        <View style={styles.input_container}>

        </View>
    )

}

export default TextInput

const styles = StyleSheet.create({
    input_container: {
        position: 'relative',
        borderColor: '#CDD8EA',
        borderWidth: 1,
        borderRadius: '0.8rem',
        width: '100%',
        height: 60
    }
})
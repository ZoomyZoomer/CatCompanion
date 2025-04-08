import { StyleSheet, TouchableOpacity, View } from 'react-native'
import FontText from './FontText'

type CatButtonProps = {
    executeFunction: () => void;
  };
  

const CatButton = ({executeFunction} : CatButtonProps) => {

    return (
        <View style={{width: '100%'}}>
            <TouchableOpacity style={styles.button_styles} onPress={() => executeFunction()}>
                <FontText style={styles.text_color}>Create an account</FontText>
            </TouchableOpacity>
        </View>
    )
}

export default CatButton

const styles = StyleSheet.create({
    button_styles: {
        backgroundColor: '#FFAD70',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: "Poppins",
        padding: 18,
        borderRadius: '0.8rem',
        width: '100%'
    },
    text_color: {
        color: '#895D4E',
        fontSize: 16,
        fontWeight: 600
    }
})
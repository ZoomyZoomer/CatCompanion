import { View, Text, StyleSheet, TextInput } from "react-native"
import { SvgProps } from "react-native-svg";
import React from "react";

type TextInputBoxProps = {
    SvgItem: React.FC<SvgProps>;
    placeholderText: string
}

const TextInputBox = ({SvgItem, placeholderText} : TextInputBoxProps) => {

    return (
        <View style={{width: '100%', justifyContent: 'center'}}>
            <TextInput style={styles.input_container} placeholder={placeholderText}/>
            <SvgItem style={styles.svg_icon}/>
        </View>
    )

}

export default TextInputBox

const styles = StyleSheet.create({
    input_container: {
        position: 'relative',
        borderColor: '#CDD8EA',
        borderWidth: 1,
        paddingLeft: 60,
        borderRadius: '0.8rem',
        width: '100%',
        fontFamily: 'Poppins',
        color: '#727E90',
        fontSize: 16,
        height: 60
    },
    svg_icon: {
        position: 'absolute',
        left: 24
    }
})
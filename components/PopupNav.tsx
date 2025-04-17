import React from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"

type PopupNavTypes = {
    buttonText: String
}

const PopupNav = ({buttonText} : PopupNavTypes) => {
    return (
        <View style={{justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%'}}>

            <TouchableOpacity style={styles.slideButton}>
                <Text style={{color: 'white', fontWeight: 500, fontSize: 16}}>{buttonText}</Text>
            </TouchableOpacity>

        </View>
    )
}

export default PopupNav

const styles = StyleSheet.create({
    slideButton: {
        backgroundColor: '#FCAD72',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        width: '80%',
        height: 40,
        marginTop: 6
    }
})
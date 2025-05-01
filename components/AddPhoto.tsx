import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import React from "react"

const AddPhoto = () => {
    return (
        <View style={{padding: 20, width: '100%', justifyContent: 'center', alignItems: 'center'}}>

            <View style={styles.add_photo_cont}>
                <View style={styles.photo_circle}>

                </View>
            </View>

        </View>
    )
}

export default AddPhoto

const styles = StyleSheet.create({
    add_photo_cont: {
        borderColor: '#CDD8EA',
        borderWidth: 1,
        borderRadius: 8,
        borderStyle: 'dashed',
        backgroundColor: 'white'
    },
    photo_circle: {
        backgroundColor: '#E8ECF1',
        borderRadius: '100%',
        height: 80,
        width: 80,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
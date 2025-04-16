import React from "react"
import { StyleSheet, View, Text } from "react-native"
import SelectPath from "./SelectPath"

const SelectAdventurePopup = () => {
    return (
        <View style={styles.popup_container}>

            <View style={styles.popup_header}>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={styles.header_text}>Select your Path</Text>
                    <Text style={styles.header_subtext}>One Step at a Time · Easy</Text>
                </View>
            </View>

            <SelectPath />

            <View style={{height: '16%', backgroundColor: 'orange', width: '100%'}}>
                
            </View>

        </View>
    )
}

export default SelectAdventurePopup

const styles = StyleSheet.create({
    popup_container: {
        height: '70%',
        width: '90%',
        backgroundColor: '#FDFDFD',
        borderRadius: 8,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 999
    },
    popup_header: {
        backgroundColor: '#F9F9F9',
        height: 75,
        width: '100%',
        borderTopRightRadius: 8,
        borderTopLeftRadius: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    header_text: {
        color: '#52637D',
        fontSize: 16,
        fontWeight: 500
    },
    header_subtext: {
        color: '#AFAEAE',
        fontSize: 12
    }
})
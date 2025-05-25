import React from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"

const PopupButton = ({ buttonText, setPageCount, maxPage, currPage, validEntry } : any) => {
    return (
        <View style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}>
            <View style={{flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: 'center', marginBottom: 20}}>
                {Array.from({ length: maxPage }, (_, i) => (
                    <View style={i === currPage ? styles.active : styles.inactive}/>
                ))}
            </View>
            <TouchableOpacity style={[styles.button, {backgroundColor: validEntry ? '#FCAD72' : '#E8ECF1'}]} onPress={() => validEntry && setPageCount((prev : number) => prev + 1)}>
                <Text style={{color: validEntry ? 'white' : '#7C889A', fontWeight: 500}}>{buttonText}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default PopupButton

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#FCAD72',
        width: '80%',
        height: 46,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8
    },
    inactive: {
        height: 7,
        width: 7,
        borderRadius: '100%',
        backgroundColor: 'white',
        borderColor: '#FCAD72',
        borderWidth: 1,
        margin: 3
    },
    active: {
        height: 12,
        width: 12,
        borderRadius: '100%',
        backgroundColor: '#FCAD72',
        borderColor: '#FCAD72',
        borderWidth: 1,
        margin: 3
    }
})
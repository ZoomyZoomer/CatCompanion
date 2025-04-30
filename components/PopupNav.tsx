import React from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"

type PopupNavTypes = {
    buttonText: String;
    setOpenPopup: any;
    processPostReq: () => (void);
    setPage: any;
    selectedItems: any;
    isFilter: boolean;
}

const PopupNav = ({buttonText, setOpenPopup, processPostReq, setPage, isFilter} : PopupNavTypes) => {
    return (
        <View style={{justifyContent: 'center', alignItems: 'center', width: '100%', position: 'absolute', bottom: 26}}>

            <TouchableOpacity style={[styles.slideButton, {filter: (isFilter) ? 'grayscale(0.4)' : 'none'}]} onPress={() => {processPostReq(); setOpenPopup(false); setPage((prev: any) => prev + 1)}}>
                <Text style={{color: 'white', fontWeight: 500, fontSize: 14}}>{buttonText}</Text>
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
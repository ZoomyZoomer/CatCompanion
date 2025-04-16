import React from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"

type PopupNavTypes = {
    maxSlides: number;
    currSlide: number
}

const PopupNav = ({maxSlides, currSlide} : PopupNavTypes) => {
    return (
        <View style={{justifyContent: 'center', alignItems: 'center'}}>

            <View></View>

        </View>
    )
}

export default PopupNav

const styles = StyleSheet.create({

})
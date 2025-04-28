import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import React from "react"
import RateItem from "./RateItem"

const RateDay = ({selectedItems} : any) => {
    return (
        <View style={{ padding: 20, paddingTop: 0, width: '100%', position: 'relative' }}>
            {selectedItems.map((item: any, index: any) => (
                <RateItem ind={index} item={item}/>
            ))}
        </View>
    )
}

export default RateDay

const styles = StyleSheet.create({

})
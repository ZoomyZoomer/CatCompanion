import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import React, { useState } from "react"

const MoodItem = ({item, selectedItems, setSelectedItems} : any) => {

    const [isSelected, setIsSelected] = useState(false);

    const verifySelection = () => {
        if (isSelected) {
            // Remove it from selectedItems
            setSelectedItems((prev: any) =>
                prev.filter((itemxd: any) => itemxd.itemName !== item?.itemName)
            );
        } else {
            // Add it to selectedItems
            setSelectedItems((prev: any) => [...prev, item]);
        }
    
        setIsSelected(prev => !prev);
    }
    

    return (
        <TouchableOpacity style={styles.mood_item_cont} onPress={() => verifySelection()}>

            <View style={[styles.mood_circle, {backgroundColor: isSelected ? '#FFE3CE' : '#E8ECF1'}]}>
                <Image source={item?.itemIcon} style={{height: 36, width: 36, marginTop: 4}}/>
            </View>

            <Text style={{color: isSelected ? '#FCAD72' : '#52637D', fontSize: 12}}>{item?.itemName}</Text>
            <Text style={{color: isSelected ? '#FFCBA5' : '#94A4BD', fontWeight: 400, fontSize: 8}}>{item?.itemDesc}</Text>

        </TouchableOpacity>
    )
}

export default MoodItem

const styles = StyleSheet.create({
    mood_item_cont: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        marginRight: 14
    },
    mood_circle: {
        height: 50,
        width: 50,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
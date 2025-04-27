import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import React from "react"
import MoodItem from "./MoodItem"

const MoodSelector = ({items, title, selectedItems, setSelectedItems} : any) => {
    return (
        <View style={{width: '100%', marginTop: 20}}>

            <View style={{width: '100%', marginBottom: 6}}>
                <Text style={{color: '#52637D', fontWeight: 500}}>{title}</Text>
            </View>

            <ScrollView style={styles.moods_container} persistentScrollbar={true} horizontal={true}>
                {items.map((item: any, index: number) => (
                    <MoodItem key={index} item={item} selectedItems={selectedItems} setSelectedItems={setSelectedItems}/>
                ))}
            </ScrollView>
 

        </View>
    )
}

export default MoodSelector

const styles = StyleSheet.create({
    moods_container: {
        borderWidth: 1,
        borderColor: '#CDD8EA',
        borderRadius: 8,
        borderStyle: 'dashed',
        width: '100%',
        backgroundColor: 'white',
        flexDirection: 'row',
        padding: 10,
        paddingLeft: 20,
        paddingBottom: 16,
        paddingRight: 6,
        overflowX: 'auto',
        position: 'relative'
    }
})
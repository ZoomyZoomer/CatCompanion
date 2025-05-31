import React, { useEffect, useState } from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import IconItem from "./IconItem"

const SelectIcon = ({ setValidEntry, setShowFeedback, activeIcon, setActiveIcon } : any) => {

    const icons = [
        {path: require('@/assets/icons/clipboard.png'), icon: 'clipboard.png', name: 'Writing'},
        {path: require('@/assets/icons/flexibility.png'), icon: 'flexibility.png', name: 'Stretching'},
        {path: require('@/assets/icons/heart.png'), icon: 'heart.png', name: 'Cardio'},
        {path: require('@/assets/icons/laptop.png'), icon: 'laptop.png', name: 'Technology'},
        {path: require('@/assets/icons/paint-brush.png'), icon: 'paint-brush.png', name: 'Creativity'},
        {path: require('@/assets/icons/reading.png'), icon: 'reading.png', name: 'Reading'},
        {path: require('@/assets/icons/shoe_icon.png'), icon: 'shoe_icon.png', name: 'Running'},
        {path: require('@/assets/icons/sports.png'), icon: 'sports.png', name: 'Sports'},
        {path: require('@/assets/icons/water-bottle.png'), icon: 'water-bottle.png', name: 'Water'}
    ]

    useEffect(() => {
        if (activeIcon) setValidEntry(true);
    }, [activeIcon])

    return (
        <View style={{width: '100%', padding: 20, paddingTop: 10}}>
            <View style={styles.container}>
                <View style={{width: '100%', height: '85%', padding: 16}}>
                    <View style={styles.iconsContainer}>
                        {icons.map((icon, index) => (
                            <IconItem icon={icon.path} png={icon.icon} name={icon.name} index={index} activeIcon={activeIcon} setActiveIcon={setActiveIcon}/>
                        ))}
                    </View>
                </View>
                <View style={{width: '100%', height: '15%', justifyContent: 'center', alignItems: 'center'}}>
                    <TouchableOpacity style={styles.suggestion} onPress={() => setShowFeedback(true)}>
                        <Text style={{color: '#52637D', fontWeight: 500}}>Have an Icon Suggestion?</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default SelectIcon

const styles = StyleSheet.create({
    container: {
        borderColor: '#CDD8EA',
        borderWidth: 1,
        borderRadius: 8,
        backgroundColor: 'white',
        paddingBottom: 15,
        height: 370,
        width: '100%',
    },
    suggestion: {
        borderColor: '#E4E7EC',
        borderWidth: 1,
        borderRadius: 8,
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        height: 44
    },
    iconsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
    },
})
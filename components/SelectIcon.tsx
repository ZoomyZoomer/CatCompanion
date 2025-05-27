import React, { useEffect, useState } from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import IconItem from "./IconItem"

const SelectIcon = ({ setValidEntry, setShowFeedback } : any) => {

    const [activeIcon, setActiveIcon] = useState(null);

    const icons = [
        {icon: require('@/assets/icons/clipboard.png'), name: 'Writing'},
        {icon: require('@/assets/icons/flexibility.png'), name: 'Stretching'},
        {icon: require('@/assets/icons/heart.png'), name: 'Cardio'},
        {icon: require('@/assets/icons/laptop.png'), name: 'Technology'},
        {icon: require('@/assets/icons/paint-brush.png'), name: 'Creativity'},
        {icon: require('@/assets/icons/reading.png'), name: 'Reading'},
        {icon: require('@/assets/icons/shoe_icon.png'), name: 'Running'},
        {icon: require('@/assets/icons/sports.png'), name: 'Sports'},
        {icon: require('@/assets/icons/water-bottle.png'), name: 'Water'}
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
                            <IconItem icon={icon.icon} name={icon.name} index={index} activeIcon={activeIcon} setActiveIcon={setActiveIcon}/>
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
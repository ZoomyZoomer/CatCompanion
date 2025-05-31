import React, { useEffect, useState } from "react"
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"

const HabitRewardItem = ({ mod } : any) => {

    const [isActive, setIsActive] = useState(false);

    return (
        <TouchableOpacity style={[styles.container, {borderColor: isActive ? '#FCAD72' : '#D9D9D9', backgroundColor: isActive ? 'white' : '#FCFCFC'}]} onPress={() => setIsActive(prev => !prev)}>

           <View style={[styles.circle, {backgroundColor: isActive ? '#FFE3CE' : '#E8ECF1'}]}>
                <mod.icon />
           </View>
           <View style={{ marginLeft: 16, flex: 1 }}>
                <Text style={{ color: isActive ? '#FCAD72' :'#7C889A', fontWeight: '500', fontSize: 14, marginBottom: 2 }}>
                    {mod.name}
                </Text>
                <Text style={{ color: '#ACACAC', fontSize: 12, flexWrap: 'wrap' }}>
                    {mod.desc}
                </Text>
            </View>

            <View style={[styles.mult, {backgroundColor: isActive ? '#FCAD72' : '#FCFCFC', borderColor: isActive ? '#FCAD72' : '#EBEBEB'}]}>
                <Text style={{color: isActive ? 'white' : '#52637D', fontWeight: 500, marginRight: 6}}>{mod.multiplier}x</Text>
                <Image source={isActive ? require('@/assets/cats/paw_white.png') : require('@/assets/cats/paw_dark.png')} style={styles.image}/>
            </View>

        </TouchableOpacity>
    )
}

export default HabitRewardItem

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderRadius: 12,
        backgroundColor: '#FCFCFC',
        borderColor: '#D9D9D9',
        padding: 22,
        paddingTop: 14,
        paddingLeft: 18,
        paddingRight: 18,
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 22,
        position: 'relative'
    },
    circle: {
        backgroundColor: '#E8ECF1',
        height: 56,
        width: 56,
        borderRadius: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    mult: {
        height: 34,
        paddingLeft: 22,
        paddingRight: 22,
        borderColor: '#EBEBEB',
        borderWidth: 1,
        borderRadius: 20,
        backgroundColor: '#FCFCFC',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        position: 'absolute',
        right: 0,
        bottom: -16
    },
    image: {
        height: 14,
        width: 14,
        resizeMode: 'contain',
        transform: 'rotate(25deg)'
    }
})
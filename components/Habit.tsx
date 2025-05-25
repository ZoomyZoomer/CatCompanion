import React from "react"
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"

import Clock from '@/assets/svgs/clock-filled.svg'

const Habit = () => {
    return (
        <TouchableOpacity style={styles.container}>

            <View style={styles.left_cont}>
                <View style={styles.circle}>
                    <Image source={require('@/assets/pngs/shoe_icon.png')} style={styles.image}/>
                    <View style={styles.quant}>
                        <Text style={{color: '#8592A7', fontSize: 10, fontWeight: 500}}>2x</Text>
                    </View>
                </View>
            </View>
            <View style={styles.right_cont}>
                <View style={{height: '100%', justifyContent: 'center', marginLeft: 20}}>
                    <Text style={{color: '#7C889A', fontWeight: 500, fontSize: 12}}>
                        <Text style={{color: '#52637D', fontWeight: 600, marginRight: 4}}>Habit</Text>
                    · Play Tennis
                    </Text>
                    <Text style={{color: '#ACACAC', fontSize: 10, marginTop: 2}}>
                        <Text style={{fontWeight: 600}}>Tags: </Text>
                        Sports, Exercise, Outdoors  
                    </Text>
                    <View style={styles.tag}>
                        <Clock />
                        <Text style={{color: '#7C889A', fontSize: 10, marginLeft: 4}}>Every Thursday</Text>
                    </View>
                </View>
            </View>

            <View style={styles.energy_bar}>
                <View style={styles.bar}>

                </View>
            </View>

        </TouchableOpacity>
    )
}

export default Habit

const styles = StyleSheet.create({
    container: {
        width: '100%',
        borderColor: '#E8ECF1',
        borderWidth: 1,
        borderRadius: 8,
        height: 104,
        backgroundColor: 'white',
        flexDirection: 'row',
        position: 'relative'
    },
    left_cont: {
        height: '100%',
        width: '24%',
        backgroundColor: '#E8ECF1',
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    right_cont: {
        height: '100%',
        width: '76%',
        justifyContent: 'center',
    },
    circle: {
        height: 58,
        width: 58,
        borderRadius: '100%',
        backgroundColor: 'white',
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#E4E7EC',
        borderWidth: 1
    },
    image: {
        resizeMode: 'contain',
        height: 38,
        width: 38,
        zIndex: 100
    },
    tag: {
        borderColor: '#CFD6E1',
        borderWidth: 1,
        borderStyle: 'dashed',
        borderRadius: 16,
        flexDirection: 'row',
        alignItems: 'center',
        width: 120,
        paddingLeft: 10,
        padding: 4,
        marginTop: 16
    },
    quant: {
        position: 'absolute',
        height: 26,
        width: 26,
        borderRadius: '100%',
        borderColor: '#E4E7EC',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        right: '-12%',
        bottom: '-12%',
        backgroundColor: 'white'
    },
    energy_bar: {
        position: 'absolute',
        right: 14,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
    },
    bar: {
        backgroundColor: '#E4E7EC',
        height: '70%',
        width: 7,
        borderRadius: 7
    }
})
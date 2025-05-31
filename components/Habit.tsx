import React from "react"
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"

import Clock from '@/assets/svgs/clock-filled.svg'

const Habit = ({ habit, setShowHabitLog } : any) => {

    const icons: { [key: string]: any } = {
        'clipboard.png': require('@/assets/icons/clipboard.png'),
        'flexibility.png': require('@/assets/icons/flexibility.png'),
        'heart.png': require('@/assets/icons/heart.png'),
        'laptop.png': require('@/assets/icons/laptop.png'),
        'paint-brush.png': require('@/assets/icons/paint-brush.png'),
        'reading.png': require('@/assets/icons/reading.png'),
        'shoe_icon.png': require('@/assets/icons/shoe_icon.png'),
        'sports.png': require('@/assets/icons/sports.png'),
        'water-bottle.png': require('@/assets/icons/water-bottle.png')
    };

    return (
        <TouchableOpacity style={styles.container} onPress={() => setShowHabitLog(true)}>

            <View style={styles.left_cont}>
                <View style={styles.circle}>
                    <Image source={icons[habit.icon]} style={styles.image}/>
                    <View style={styles.quant}>
                        <Text style={{color: '#8592A7', fontSize: 10, fontWeight: 500}}>{habit.num_claimed}x</Text>
                    </View>
                </View>
            </View>
            <View style={styles.right_cont}>
                <View style={{height: '100%', justifyContent: 'center', marginLeft: 20}}>
                    <Text style={{color: '#7C889A', fontWeight: 500, fontSize: 12}}>
                        <Text style={{color: '#52637D', fontWeight: 600, marginRight: 4}}>Habit</Text>
                    · {habit.name}
                    </Text>
                    <Text style={{color: '#ACACAC', fontSize: 10, marginTop: 2, width: '90%'}}>
                        {habit.motivator}
                    </Text>
                    <View style={styles.tag}>
                        <Clock />
                        <Text style={{color: '#7C889A', fontSize: 10, marginLeft: 4}}>Every {habit.availability}</Text>
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
        position: 'relative',
        marginTop: 10
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
        paddingLeft: 10,
        padding: 4,
        marginTop: 16,
        maxWidth: 120
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
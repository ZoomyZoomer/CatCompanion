import React from "react"
import { Image, StyleSheet, Text, View } from "react-native"

import Star from '@/assets/svgs/star_filled.svg'

const Mood = () => {
 return (
    <View style={styles.mood_container}>
        <View style={styles.mood_circle}>
            <Image source={require('@/assets/pngs/coffee.png')} style={styles.image}/>
        </View>
        <View style={styles.mood_rating}>
            <Text style={{color: 'white', fontSize: 10, fontWeight: 500, marginRight: 2}}>2</Text>
            <Star style={styles.star}/>
        </View>
    </View>
 )   
}

export default Mood

const styles = StyleSheet.create({
    mood_container: {
        borderWidth: 1,
        borderColor: '#D9D9D9',
        borderRadius: 8,
        backgroundColor: '#FCFCFC',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
        margin: 4
    },
    mood_circle: {
        backgroundColor: '#FFE3CE',
        borderRadius: '100%',
        height: 36,
        width: 36,
        justifyContent: 'center',
        alignItems: 'center'
    },
    mood_rating: {
        backgroundColor: '#FCAD72',
        borderRadius: 8,
        width: '100%',
        marginTop: 8,
        height: 16,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    image: {
        height: 26,
        width: 26,
        marginTop: 4
    },
    star: {
        height: 12,
        width: 12
    }
})
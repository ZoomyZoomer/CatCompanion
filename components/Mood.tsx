import React from "react"
import { Image, StyleSheet, Text, View } from "react-native"

import Star from '@/assets/svgs/star_filled.svg'

const Mood = ({ item, isToday } : any) => {
 return (
    <View style={styles.mood_container}>
        <View style={[styles.mood_circle, {backgroundColor: isToday ? '#FFE3CE' : '#E8ECF1'}]}>
            <Image source={item.item.itemIcon} style={styles.image}/>
        </View>
        <View style={styles.mood_rating}>
            <Text style={{color: 'white', fontSize: 10, fontWeight: 500, marginRight: 2}}>{item.rating}</Text>
            <Star fill={'white'} style={styles.star}/>
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
        height: 38,
        width: 38,
        justifyContent: 'center',
        alignItems: 'center'
    },
    mood_rating: {
        backgroundColor: '#FCAD72',
        borderRadius: 8,
        width: '100%',
        marginTop: 12,
        height: 16,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    image: {
        height: 28,
        width: 28,
        marginTop: 4,
        resizeMode: 'contain'
    },
    star: {
        height: 12,
        width: 12
    }
})
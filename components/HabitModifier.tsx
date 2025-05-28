import React from "react"
import { Image, StyleSheet, Text, View } from "react-native"

const HabitRewardItem = ({ icon: Icon }) => {
    return (
        <View style={styles.container}>
           <View style={styles.circle}>
                <Icon />
           </View>
           <View style={{marginLeft: 16}}>
                <Text style={{color: '#7C889A', fontWeight: 500, fontSize: 16, marginBottom: 2}}>Snap Shot</Text>
                <Text style={{color: '#ACACAC', width: 160, fontSize: 12}}>Take a related picture of your finished habit </Text>
           </View>
        </View>
    )
}

export default HabitRewardItem

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderRadius: 12,
        backgroundColor: '#FCFCFC',
        borderColor: '#D9D9D9',
        padding: 18,
        paddingLeft: 20,
        paddingRight: 20,
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row'
    },
    circle: {
        backgroundColor: '#E8ECF1',
        height: 60,
        width: 60,
        borderRadius: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    }
})
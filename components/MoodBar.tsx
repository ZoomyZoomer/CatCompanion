import React from "react"
import { Image, StyleSheet, Text, View } from "react-native"

const MoodBar = () => {
    return (
        <View style={styles.stat_container}>
            <Text style={{color: '#52637D', fontWeight: 500, fontSize: 16}}>Mood Bar</Text>
            <Text style={{color: '#687994'}}>
                You mostly feel
            <Text style={{fontWeight: 500}}> Okay </Text> 
            <View style={styles.bar_container}>
                <View style={[styles.bar_line, {borderTopLeftRadius: 40, borderBottomLeftRadius: 40, backgroundColor: '#FFE3CE', width: '20%'}]}>
                    <View style={[styles.percent_box, {top: '120%'}]}>
                        <Text style={{color: '#687994'}}>16%</Text>
                    </View>
                </View>
                <View style={[styles.bar_line, {backgroundColor: '#FBC895', width: '35%'}]}>
                    <View style={[styles.percent_box, {bottom: '120%'}]}>
                        <Text style={{color: '#687994'}}>34%</Text>
                    </View>
                </View>
                <View style={[styles.bar_line, {backgroundColor: '#FCAD72', width: '10%'}]}>
                    <View style={[styles.percent_box, {top: '120%'}]}>
                        <Text style={{color: '#687994'}}>9%</Text>
                    </View>
                </View>
                <View style={[styles.bar_line, {borderTopRightRadius: 40, borderBottomRightRadius: 40, backgroundColor: '#FF8F73', width: '35%'}]}>
                    <View style={[styles.percent_box, {bottom: '120%'}]}>
                        <Text style={{color: '#687994'}}>35%</Text>
                    </View>
                </View>
                <View style={{position: 'absolute', bottom: '110%', left: '50%'}}>
                    <View style={{position: 'relative', justifyContent: 'center', alignItems: 'center'}}>
                        <View style={styles.mood_circle}>
                            <Image source={require('@/assets/cats/happy_cat.png')} style={styles.mood}/>
                        </View>
                        <View style={styles.triangle}/>
                    </View>
                </View>
            </View>
            </Text>
        </View>
    )
}

export default MoodBar

const styles = StyleSheet.create({
    stat_container: {
        borderColor: '#CDD8EA',
        borderWidth: 1,
        borderRadius: 8,
        backgroundColor: 'white',
        justifyContent: 'center',
        padding: 18,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 56,
        width: '100%'
    },
    bar_container: {
        borderColor: '#895D4E',
        borderWidth: 1,
        borderRadius: 40,
        width: '100%',
        height: 36,
        flexDirection: 'row',
        marginTop: 100,
        position: 'relative'
    },
    bar_line: {
        height: '100%',
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center'
    },
    pin: {
        resizeMode: 'contain',
        height: 18,
        width: 18,
        marginTop: 6
    },
    mood_circle: {
        borderColor: '#FCAD72',
        borderWidth: 1,
        borderRadius: '100%',
        height: 60,
        width: 60,
        justifyContent: 'center',
        alignItems: 'center'
    },
    mood: {
        resizeMode: 'contain',
        height: 48,
        width: 48,
        marginTop: 4
    },
    triangle: {
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftWidth: 10,
        borderRightWidth: 10,
        borderBottomWidth: 0,
        borderTopWidth: 16,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderTopColor: '#FCAD72',
        transform: [{ rotate: '0deg' }],
        marginTop: 8,
        marginBottom: 4
    },
    percent_box: {
        position: 'absolute',
        borderColor: '#D9D9D9',
        borderWidth: 1,
        borderRadius: 8,
        padding: 6,
        paddingLeft: 10,
        paddingRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 12
    }
})
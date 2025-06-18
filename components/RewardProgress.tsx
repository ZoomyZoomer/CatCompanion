import React from "react"
import { Image, StyleSheet, Text, View } from "react-native"

import Star from '@/assets/svgs/star_filled_dark.svg'

const RewardProgress = () => {
    return (
        <View style={styles.stat_container}>

            <View style={{width: '100%'}}>
                <Text style={{color: '#52637D', fontWeight: 500, fontSize: 16}}>Rewards</Text>
            </View>

            <View style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}>

                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 20}}>
                    <View style={styles.left_bar}>
                        <Text style={{color: '#52637D'}}>Total points</Text>
                    </View>
                    <View style={styles.right_bar}>
                        <Text style={{color: '#52637D'}}>1270</Text>
                        <Star style={{marginLeft: 6}}/>
                    </View>
                </View>

                <View style={{width: '100%', justifyContent: 'space-around', alignItems: 'center', marginTop: 30, flexDirection: 'row'}}>
                    <View style={styles.item_container}>

                        <View style={styles.circle}>
                            <Image source={require('@/assets/pngs/message.png')} style={styles.icon}/>
                        </View>
                        <Text style={{color: '#52637D', fontWeight: 500, marginTop: 12}}>Envelope</Text>
                        <View style={[styles.counter, {flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}]}>
                            <Text style={{color: '#52637D', marginRight: 4}}>240</Text>
                            <Star />
                        </View>

                        <View style={styles.quant_container}>
                            <Text style={{color: '#52637D', fontWeight: 500}}>34x</Text>
                        </View>

                    </View>
                    <View style={styles.item_container}>

                        <View style={styles.circle}>
                            <Image source={require('@/assets/pngs/gift-box.png')} style={styles.icon}/>
                        </View>
                        <Text style={{color: '#52637D', fontWeight: 500, marginTop: 12}}>Heart Box</Text>
                        <View style={[styles.counter, {flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}]}>
                            <Text style={{color: '#52637D', marginRight: 4}}>550</Text>
                            <Star />
                        </View>

                        <View style={styles.quant_container}>
                            <Text style={{color: '#52637D', fontWeight: 500}}>16x</Text>
                        </View>

                    </View>
                    <View style={styles.item_container}>

                        <View style={styles.circle}>
                            <Image source={require('@/assets/pngs/gift.png')} style={styles.icon}/>
                        </View>
                        <Text style={{color: '#52637D', fontWeight: 500, marginTop: 12}}>Present</Text>
                        <View style={[styles.counter, {flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}]}>
                            <Text style={{color: '#52637D', marginRight: 4}}>960</Text>
                            <Star />
                        </View>

                        <View style={styles.quant_container}>
                            <Text style={{color: '#52637D', fontWeight: 500}}>4x</Text>
                        </View>

                    </View>
                </View>

            </View>

        </View>
    )
}

export default RewardProgress

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
        paddingBottom: 24,
        width: '100%'
    },
    left_bar: {
        borderWidth: 1,
        borderColor: '#CDD8EA',
        borderRadius: 8,
        padding: 8,
        paddingLeft: 14,
        paddingRight: 14,
        backgroundColor: '#FCFCFC',
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        borderRightWidth: 0
    },
    right_bar: {
        borderWidth: 1,
        borderColor: '#CDD8EA',
        borderRadius: 8,
        padding: 8,
        paddingLeft: 14,
        paddingRight: 14,
        backgroundColor: 'white',
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    item_container: {
        borderColor: '#D9D9D9',
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        paddingLeft: 12,
        paddingRight: 12,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        width: 92
    },
    circle: {
        borderColor: '#D9D9D9',
        borderWidth: 1,
        backgroundColor: '#FAFAFA',
        height: 60,
        width: 60,
        borderRadius: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon: {
        resizeMode: 'contain',
        height: 40,
        width: 40,
        marginTop: 4
    },
    counter: {
        borderColor: '#D9D9D9',
        borderWidth: 1,
        borderRadius: 10,
        padding: 4,
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: 6,
    },
    quant_container: {
        position: 'absolute',
        top: -12,
        right: -12,
        borderColor: '#C3C3C3',
        borderWidth: 1,
        borderRadius: '100%',
        padding: 6,
        backgroundColor: 'white',
        height: 33,
        width: 33,
        justifyContent: 'center',
        alignItems: 'center',
    }
})
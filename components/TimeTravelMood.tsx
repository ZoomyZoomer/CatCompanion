import React, { useEffect, useState } from "react"
import { Easing, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Animated, { useAnimatedStyle, useSharedValue, withSequence, withTiming } from "react-native-reanimated"

import InfoSection from "./InfoSection"
import Item from "./Item"

import Close from '@/assets/svgs/close.svg'
import Ticket from '@/assets/svgs/ticket.svg'

const TimeTravelMood = ({ setIsTimeTraveling } : any) => {

    const [activeItem, setActiveItem] = useState(false);
    const scale = useSharedValue(0.7)
        
    useEffect(() => {
        scale.value = withSequence(
            withTiming(1.05, { duration: 220, easing: Easing.out(Easing.ease) }),
            withTiming(1, { duration: 180, easing: Easing.out(Easing.ease) })
        )
    }, [])
        
    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }]
    }))

    return (
        <Animated.View style={[styles.popup_container, animatedStyle]}>

            <View style={{width: '100%', height: '100%', alignItems: 'center', position: 'relative'}}>

                <View style={styles.popup_header}>

                    <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%', position: 'relative' }}>

                    <Text style={styles.header_text}>
                        Travel Back in Time?
                    </Text>

                    <Text style={styles.header_subtext}>
                        Edit your old mood log
                    </Text>

                    <TouchableOpacity style={styles.close} onPress={() => setIsTimeTraveling(false)}>
                        <Close />
                    </TouchableOpacity>

                    </View>

                </View>

                <View style={{width: '86%', justifyContent: 'center', alignItems: 'center'}}>

                    <InfoSection 
                        mainText={'Time Travel Ticket'}
                        subText={"You can edit your past logs by using a Time Travel Ticket, acquired in various ways."}
                    />

                    <View style={{width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 60}}>
                        <Item image_source={require('@/assets/pngs/ticket.png')} quantity={3} activeItem={activeItem} setActiveItem={setActiveItem}/>
                    </View>

                    <Text style={{color: '#AFAEAE', marginTop: 10, fontSize: 12}}>Click to use</Text>

                    <TouchableOpacity style={activeItem ? styles.confirmBtn : styles.confirmBtnNull}>
                        <Text style={{marginRight: activeItem ? 6 : 0, color: activeItem ? 'white' : '#52637D', fontWeight: 500}}>{activeItem ? 'Use 1x Time Travel Ticket' : 'Select an item to use'}</Text>
                        {activeItem && <Ticket style={{marginTop: 2}}/>}
                    </TouchableOpacity>

                </View>

            </View>

        </Animated.View>
    )
}

export default TimeTravelMood

const styles = StyleSheet.create({
    popup_container: {
        height: '46%',
        width: '90%',
        backgroundColor: '#FDFDFD',
        borderRadius: 8,
        position: 'absolute',
        alignItems: 'center',
        zIndex: 999
      },
      popup_header: {
        backgroundColor: '#F9F9F9',
        height: 75,
        width: '100%',
        borderTopRightRadius: 8,
        borderTopLeftRadius: 8,
        justifyContent: 'center',
        alignItems: 'center'
      },
      header_text: {
        color: '#52637D',
        fontSize: 16,
        fontWeight: '500'
      },
      header_subtext: {
        color: '#AFAEAE',
        fontSize: 12
      },
      close: {
        position: 'absolute',
        right: '7%',
        top: '-10%',
        zIndex: 999
      },
      confirmBtn: {
        backgroundColor: '#FCAD72',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 46,
        width: '100%',
        height: 46,
        marginTop: 60,
        color: 'white',
        flexDirection: 'row'
      },
      confirmBtnNull: {
        backgroundColor: '#E8ECF1',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 46,
        width: '100%',
        height: 46,
        marginTop: 60,
        color: '#52637D',
        flexDirection: 'row',
        pointerEvents: 'none'
      }
})
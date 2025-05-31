import React, { useEffect, useState } from "react"
import { Easing, StyleSheet, Text, TouchableOpacity,View } from "react-native"
import Animated, { useAnimatedStyle, useSharedValue, withSequence, withTiming } from "react-native-reanimated"

import { GaugeSlider } from "./GaugeSlider"

import Close from '@/assets/svgs/close.svg'
import Calendar from '@/assets/svgs/calendar-mini.svg'
import Clock from '@/assets/svgs/clock.svg'

const HabitLogPopup = ({ setShowHabitLog } : any) => {

    const [value, setValue] = useState(0);

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

        <View style={{height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center', position: 'absolute', zIndex: 998}}>

        <Animated.View style={[styles.popup_container, animatedStyle]}>

            <View style={{width: '100%', height: '100%', alignItems: 'center', position: 'relative'}}>

                <View style={{width: '100%', padding: 20, alignItems: 'center', paddingTop: 40}}>

                    <Text style={{color: '#52637D', fontSize: 18, fontWeight: 500, position: 'relative', width: '100%', textAlign: 'center'}}>
                        Play Tennis
                        <TouchableOpacity style={styles.close} onPress={() => setShowHabitLog(false)}>
                            <Close />
                        </TouchableOpacity>
                    </Text>
                    <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 4}}>
                        <Calendar />
                        <Text style={{color: '#8497B6', marginLeft: 4}}>Every Thursday</Text>
                        <View style={{height: 3, width: 3, borderRadius: "100%", backgroundColor: '#8497B6', marginLeft: 8, marginRight: 8}}/>
                        <Clock />
                        <Text style={{color: '#8497B6', marginLeft: 4}}>60 minutes</Text>
                    </View>

                    <View style={{width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 10, position: 'relative'}}>
                        <GaugeSlider
                            size={200}
                            strokeWidth={18}
                            trackColor="#eee"
                            filledColor="#FCAD72"
                            thumbColor="#FCAD72"
                            thumbSize={30}
                            value={value}
                            onValueChange={setValue}
                            arcStartAngle={140}
                            arcSweepAngle={260}
                            max={180}
                        />
                        <Text style={{position: 'absolute', bottom: 15, fontSize: 36, color: '#FCAD72', fontWeight: 500}}>{value}</Text>
                    </View>

                    

                </View>
            </View>


            </Animated.View>

        </View>
    )
}

export default HabitLogPopup

const styles = StyleSheet.create({
 popup_container: {
        height: 600,
        width: '90%',
        backgroundColor: '#FDFDFD',
        borderRadius: 8,
        alignItems: 'center',
        zIndex: 900,
        overflow: 'visible'
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
        right: '0%',
        top: '-10%',
        zIndex: 999
      }
})
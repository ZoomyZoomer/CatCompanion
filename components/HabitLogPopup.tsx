import React, { useEffect, useState } from "react"
import { Easing, StyleSheet, Text, TouchableOpacity,View } from "react-native"
import Animated, { useAnimatedStyle, useSharedValue, withSequence, withTiming } from "react-native-reanimated"

import { GaugeSlider } from "./GaugeSlider"

import Close from '@/assets/svgs/close.svg'
import Calendar from '@/assets/svgs/calendar-mini.svg'
import Clock from '@/assets/svgs/clock.svg'
import axios from "axios"

const HabitLogPopup = ({ setShowHabitLog, habitInfo, setShowRewardPopup } : any) => {

    const [value, setValue] = useState(habitInfo?.amount_completed);

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


    const recordHabit = async() => {

        await axios.post('http://10.0.0.216:5000/recordHabit', {
            uid: 0,
            hid: habitInfo.hid,
            habitDetails: {date: new Date(), amount_completed: value}
        })

        if (value / habitInfo.max === 1) setShowRewardPopup(true);
        setShowHabitLog(false);

    }

    return (

        <View style={{height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center', position: 'absolute', zIndex: 998}}>

        <Animated.View style={[styles.popup_container, animatedStyle]}>

            <View style={{width: '100%', height: '100%', alignItems: 'center', position: 'relative'}}>

                <View style={styles.popup_header}>

                        <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%', position: 'relative' }}>

                        <Text style={styles.header_text}>
                            {habitInfo?.name}
                        </Text>

                        <Text style={styles.header_subtext}>
                            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 4}}>
                                <Calendar />
                                <Text style={{color: '#8497B6', marginLeft: 4}}>Every {habitInfo?.availability}</Text>
                                <View style={{height: 3, width: 3, borderRadius: "100%", backgroundColor: '#8497B6', marginLeft: 8, marginRight: 8}}/>
                                <Clock />
                                <Text style={{color: '#8497B6', marginLeft: 4}}>{habitInfo?.max} {habitInfo?.type === "Quantity" ? 'units' : 'minutes'}</Text>
                            </View>
                        </Text>

                        <TouchableOpacity style={styles.close} onPress={() => setShowHabitLog(false)}>
                            <Close />
                        </TouchableOpacity>

                        </View>

                    </View>

                <View style={{width: '100%', padding: 20, alignItems: 'center', paddingTop: 0}}>

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
                            max={habitInfo.max}
                            tier={habitInfo.tier}
                        />
                        <View style={{position: 'absolute', bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{fontSize: 36, color: '#FCAD72', fontWeight: 500}}>{value}</Text>
                            <Text style={{color: '#FCAD72', marginTop: -5}}>{habitInfo.type === 'Quantity' ? 'units' : 'min.'}</Text>
                        </View>
                    </View>

                    <View style={{marginTop: 30}}>
                        <View style={{width: '100%', marginBottom: 4}}>
                            <Text style={{color: '#52637D', fontWeight: 500}}></Text>
                        </View>
                    </View>

                </View>

                <TouchableOpacity style={styles.button} onPress={() => recordHabit()}>
                    <Text style={{color: 'white', fontWeight: 500}}>Log Habit</Text>
                </TouchableOpacity>

            </View>


            </Animated.View>

        </View>
    )
}

export default HabitLogPopup

const styles = StyleSheet.create({
 popup_container: {
        height: 440,
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
        right: 20,
        top: '0%',
        zIndex: 999
      },
      day_complete: {
        height: 16,
        width: 16,
        borderRadius: 4,
        backgroundColor: '#FCAD72',
        margin: 4
      },
      streak_container: {
        padding: 14,
        paddingLeft: 18,
        paddingRight: 18,
        borderColor: '#D9D9D9',
        borderWidth: 1,
        borderRadius: 8
      },
      button: {
        backgroundColor: '#FCAD72',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 46,
        width: 200,
        height: 50,
        color: 'white',
        flexDirection: 'row',
        position: 'absolute',
        bottom: 36
      }
})
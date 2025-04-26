import React, { useEffect } from "react"
import { Easing, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Animated, { useAnimatedStyle, useSharedValue, withSequence, withTiming } from "react-native-reanimated"
import DatePicker from "./DatePicker"

import Close from '@/assets/svgs/close.svg'
import { AnimatedScrollView } from "react-native-reanimated/lib/typescript/component/ScrollView"

const DatePopup = ({setIsPickingDate} : any) => {

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

          <View style={styles.popup_header}>
              <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%', position: 'relative' }}>
                <Text style={styles.header_text}>Time Machine</Text>
                <Text style={styles.header_subtext}>
                  Choose your destination
                </Text>
                <TouchableOpacity style={styles.close} onPress={() => setIsPickingDate(false)}>
                  <Close />
                </TouchableOpacity>
              </View>
            </View>

          <View style={{marginTop: 20}}>
            <DatePicker />
          </View>

          <TouchableOpacity style={styles.confirmButton}>
            <Text style={{color: 'white'}}>Confirm Search</Text>
          </TouchableOpacity>

        </Animated.View>
    )
}

export default DatePopup

const styles = StyleSheet.create({
    popup_container: {
        height: '44%',
        width: '90%',
        backgroundColor: '#FDFDFD',
        borderRadius: 8,
        position: 'absolute',
        alignItems: 'center',
        zIndex: 999,
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
      close: {
        position: 'absolute',
        right: '7%',
        top: '-10%',
        zIndex: 999
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
      confirmButton: {
        backgroundColor: '#FCAD72',
        width: 240,
        marginTop: 40,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 8
      }
})
import React, { useEffect } from "react"
import { Easing, StyleSheet, View } from "react-native"
import { useAnimatedStyle, useSharedValue, withSequence, withTiming } from "react-native-reanimated"

const DatePopup = () => {

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
        <View style={[styles.popup_container, animatedStyle]}>

        </View>
    )
}

export default DatePopup

const styles = StyleSheet.create({
    popup_container: {
        height: '78%',
        width: '90%',
        backgroundColor: '#FDFDFD',
        borderRadius: 8,
        position: 'absolute',
        justifyContent: 'center',
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
})
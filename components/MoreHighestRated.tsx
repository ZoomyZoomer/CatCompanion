import React, { useEffect } from "react"
import { Easing, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Animated, { useAnimatedStyle, useSharedValue, withSequence, withTiming } from "react-native-reanimated"

const MoreHighestRated = () => {

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
            ok
        </Animated.View>
    )
}

export default MoreHighestRated

const styles = StyleSheet.create({
    popup_container: {
        height: '64%',
        width: '90%',
        backgroundColor: '#FDFDFD',
        borderRadius: 8,
        position: 'absolute',
        alignItems: 'center',
        zIndex: 999,
    }
})
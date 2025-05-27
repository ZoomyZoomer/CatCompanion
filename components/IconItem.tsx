import React, { useEffect, useRef, useState } from "react"
import { Image, StyleSheet, TouchableOpacity, Text, View, Animated } from "react-native"

const IconItem = ({ icon, name, index, activeIcon, setActiveIcon } : any) => {

    const [isActive, setIsActive] = useState(false);
    const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
  if (activeIcon !== index) {
    setIsActive(false);
    scaleAnim.setValue(1);
  } else {
    setIsActive(true);
    // Quick pop effect
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.15,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  }
}, [activeIcon]);

    return (
        <TouchableOpacity style={{width: 74, margin: 7, justifyContent: 'center', alignItems: 'center', marginTop: 10}} onPress={() => {setActiveIcon(index), setIsActive(true)}}>

            <View style={[styles.circle, {backgroundColor: isActive ? '#FFE3CE' : '#E8ECF1', borderColor: isActive ? '#FFD8BB' : '#DDE6F1'}]}>
                <Animated.Image source={icon} style={[styles.icon, { transform: [{ scale: scaleAnim }] }]}/>
            </View>

            <Text style={{width: '100%', textAlign: 'center', color: isActive ? '#FCAD72' : '#7C889A', fontWeight: 500, marginTop: 6, fontSize: 12}}>
                {name}
            </Text>

        </TouchableOpacity>
    )
}

export default IconItem

const styles = StyleSheet.create({
    circle: {
        height: 50,
        width: 50,
        borderRadius: '100%',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon: {
        height: 38,
        width: 38,
        marginTop: 6,
        resizeMode: 'contain'
    }
})
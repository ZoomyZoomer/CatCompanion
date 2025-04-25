import { useEffect, useState } from "react"
import { Easing, StyleSheet, View, Text, TouchableOpacity } from "react-native"
import Animated, { useSharedValue, useAnimatedStyle, withSequence, withTiming } from "react-native-reanimated"

import SelectPath from "./SelectPath"
import PopupNav from "./PopupNav"

import Close from '@/assets/svgs/close.svg'
import axios from "axios"
import React = require("react")

const SelectAdventurePopup = ({ popupData, setShowSelectAdventurePopup, activeId } : any) => {

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

  const processAdventure = async() => {
    await axios.post('http://110.72.104.118:5000/confirmAdventure', {
      username: 'Wholemilky',
      uid: 0,
      cid: activeId,
      cpid: popupData.cpid,
      pathIndex: currPath ? 0 : 1
    })
  }

  const [currPath, setCurrPath] = useState(true);

  return (
    <Animated.View style={[styles.popup_container, animatedStyle]}>
      <View style={styles.popup_header}>
        <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%', position: 'relative' }}>
          <Text style={styles.header_text}>Select your Path</Text>
          <Text style={styles.header_subtext}>
            {popupData?.name} · {popupData?.difficulty === 1 ? 'Easy' : (popupData?.difficulty === 2 ? 'Medium' : 'Hard')}
          </Text>
          <TouchableOpacity style={styles.close} onPress={() => setShowSelectAdventurePopup(false)}>
            <Close />
          </TouchableOpacity>
        </View>
      </View>

      <SelectPath popupData={popupData} currPath={currPath} setCurrPath={setCurrPath}/>

      <View style={{ height: '16%', width: '100%' }}>
        <PopupNav buttonText={'Confirm Adventure'} setOpenPopup={setShowSelectAdventurePopup} processPostReq={processAdventure}/>
      </View>
    </Animated.View>
  )
}

export default SelectAdventurePopup

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
  }
})

import { Easing, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import React, { useEffect, useState } from "react"

import Close from '@/assets/svgs/close.svg'
import Animated, { useAnimatedStyle, useSharedValue, withSequence, withTiming } from "react-native-reanimated"
import PopupNav from "./PopupNav"
import LogDay from "./LogDay"
import RateDay from "./RateDay"
import SelectMood from "./SelectMood"
import AddPhoto from "./AddPhoto"

const MoodPopup = ({setIsPickingMood} : any) => {

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

      const [pageInd, setPageInd] = useState(0);
      const [selectedItems, setSelectedItems] = useState([]);
      const [selectedMood, setSelectedMood] = useState<string | null>(null);
      const [ratings, setRatings] = useState([0,0,0]);

    return (
        <Animated.View style={[styles.popup_container, animatedStyle]}>

            <View style={{width: '100%', height: '100%', alignItems: 'center', position: 'relative'}}>
                <View style={styles.popup_header}>

                    <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%', position: 'relative' }}>

                    <Text style={styles.header_text}>{pageInd === 0 ? 'Log Your Day' : 'Rate Your Day'}</Text>

                    <Text style={styles.header_subtext}>
                    {pageInd === 0 ? 'Great for self reflection' : 'How did things go today?'}
                    </Text>

                    <TouchableOpacity style={styles.close} onPress={() => setIsPickingMood(false)}>
                        <Close />
                    </TouchableOpacity>

                    </View>

                </View>

                {pageInd === 0 ? <SelectMood setSelectedMood={setSelectedMood} selectedMood={selectedMood}/> :
                 (pageInd === 1 ? <LogDay selectedItems={selectedItems} setSelectedItems={setSelectedItems} /> : 
                 (pageInd === 2 ? <RateDay selectedItems={selectedItems} setRatings={setRatings}/> :
                  <AddPhoto />
                 ))}

                <PopupNav 
                  isFilter={pageInd === 0 ? (selectedMood == null) : (pageInd === 1 ? selectedItems.length < 3 : (!ratings[0] || !ratings[1] || !ratings[2]))} 
                  buttonText={pageInd === 0 ? 'Next' : (pageInd === 1 ? (selectedItems.length < 3 ? `Select ${3 - selectedItems.length} more` : 'Next') : 'Next')} 
                  setOpenPopup={() => {}} 
                  processPostReq={() => {}} 
                  setPage={setPageInd} 
                  selectedItems={selectedItems}
                />

            </View>

        </Animated.View>
    )
}

export default MoodPopup

const styles = StyleSheet.create({
    popup_container: {
        height: '80%',
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
      }
})
import React, { useEffect, useState } from "react"
import { Easing, Switch, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import Animated, { useAnimatedStyle, useSharedValue, withSequence, withTiming } from "react-native-reanimated"

import Close from '@/assets/svgs/close.svg'
import HabitForm from "./HabitForm"
import PopupButton from "./PopupButton"
import SelectIcon from "./SelectIcon"
import FeedbackBox from "./FeedbackBox"

const CreateHabitPopup = ({ setShowHabitPopup } : any) => {

    const [pageCount, setPageCount] = useState(0);
    const [showFeedback, setShowFeedback] = useState(false);

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

    const [validEntry, setValidEntry] = useState(false);

    useEffect(() => {
        setValidEntry(false);
    }, [pageCount])

    return (
        <View style={{height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center', position: 'absolute', zIndex: 998}}>

            <View style={{height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center', position: 'relative', zIndex: 999}}>
            {showFeedback && <FeedbackBox setShowFeedback={setShowFeedback}/>}

            <Animated.View style={[styles.popup_container, animatedStyle, {filter: showFeedback ? 'brightness(0.3) grayscale(0.4)' : 'none', pointerEvents: showFeedback ? 'none' : 'auto'}]}>
                <View style={{width: '100%', height: '100%', alignItems: 'center', position: 'relative'}}>

                    <View style={styles.popup_header}>

                        <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%', position: 'relative' }}>

                        <Text style={styles.header_text}>
                            {
                            pageCount === 0 ? 'Create a Habit' :
                            'Select an Icon'
                            }
                        </Text>

                        <Text style={styles.header_subtext}>
                            {
                            pageCount === 0 ? "Let's achieve some consistency" :
                            'Something unique'
                            }
                        </Text>

                        <TouchableOpacity style={styles.close} onPress={() => setShowHabitPopup(false)}>
                            <Close />
                        </TouchableOpacity>

                        </View>

                    </View>

                    {
                    pageCount === 0 ? <HabitForm setValidEntry={setValidEntry}/> :
                    <SelectIcon setValidEntry={setValidEntry} setShowFeedback={setShowFeedback}/>
                    }
                    

                    <View style={{position: 'absolute', bottom: 20, width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                        <PopupButton buttonText={'Next'} setPageCount={setPageCount} maxPage={4} currPage={pageCount} validEntry={validEntry}/>
                    </View>

                </View>
            </Animated.View>

            </View>
        </View>
    )
}

export default CreateHabitPopup

const styles = StyleSheet.create({
    popup_container: {
        height: '80%',
        width: '90%',
        backgroundColor: '#FDFDFD',
        borderRadius: 8,
        alignItems: 'center',
        zIndex: 900
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
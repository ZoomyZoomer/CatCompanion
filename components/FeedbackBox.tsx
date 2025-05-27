import React, { useEffect, useState } from "react"
import { ActivityIndicator, Easing, Switch, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import Animated, { useAnimatedStyle, useSharedValue, withSequence, withTiming, runOnJS } from "react-native-reanimated"

import Close from '@/assets/svgs/close.svg'
import Clipboard from '@/assets/svgs/clipb.svg'
import axios from "axios"

const allowedChars = 75;


const FeedbackBox = ({ setShowFeedback } : any) => {

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

    const [feedbackText, setFeedbackText] = useState('');
    const [subject, setSubject] = useState('Icon Suggestion');

    const [isLoading, setIsLoading] = useState(false);

    const handleSend = async() => {

      setIsLoading(true);

      axios.post('http://10.0.0.216:5000/sendFeedback', {
        uid: 0,
        feedbackText,
        subject
      })

      setTimeout(() => {
        setIsLoading(false);
        closePopup();
      }, 800)

    }

    const closePopup = () => {
        scale.value = withSequence(
          withTiming(0.9, { duration: 80, easing: Easing.out(Easing.ease) }),
          withTiming(0, { duration: 70, easing: Easing.in(Easing.ease) }, (finished) => {
            if (finished) {
              runOnJS(setShowFeedback)(false);
            }
          })
        );
      };

    return (
        <Animated.View style={[styles.popup_container, animatedStyle]}>
            <View style={{height: '100%', width: '100%', position: 'relative', alignItems: 'center'}}>
            <View style={styles.popup_header}>

                <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%', position: 'relative' }}>

                <Text style={styles.header_text}>
                    Feedback Box
                </Text>

                <TouchableOpacity style={styles.close} onPress={() => closePopup()}>
                    <Close />
                </TouchableOpacity>

                </View>

            </View>

                <View style={{width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 20}}>
                    <View style={styles.feedback_left}>
                        <Clipboard />
                    </View>
                    <View style={styles.feedback_right}>
                        <Text style={{color: '#7C889A'}}>{subject}</Text>
                    </View>
                </View>

                <View style={{width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 30}}>
                    <View style={{position: 'relative'}}>
                        <TextInput 
                            style={styles.input}
                            onChangeText={setFeedbackText}
                            value={feedbackText}
                            maxLength={75}
                            multiline={true}
                            underlineColorAndroid="transparent"
                        />
                        <View style={styles.invis}>
                            <Text style={{color: '#7C889A', marginBottom: -7, fontSize: 16}}>Feedback</Text>
                        </View>
                        <Text style={[styles.num_char, {color: feedbackText.length >= allowedChars ? '#F2A9A9' : '#D9D9D9'}]}>{feedbackText.length}/{allowedChars} characters</Text>
                    </View>
                </View>
                
                <TouchableOpacity style={[styles.button, {backgroundColor: feedbackText.length >= 5 ? '#FCAD72' : '#E8ECF1'}]} onPress={() => handleSend()}>
                    {!isLoading && (
                      <Text style={{color: feedbackText.length >= 5 ? 'white' : '#52637D', fontSize: 14, fontWeight: 500}}>
                        {feedbackText.length >= 5 ? 'Send' : 'Type valid feedback'}
                      </Text>
                    )}
                    {isLoading && (
                      <ActivityIndicator size='small' color='white'/>
                    )}
                </TouchableOpacity>
            </View>
        </Animated.View>
    )
}

export default FeedbackBox

const styles = StyleSheet.create({
    popup_container: {
        height: '40%',
        width: '80%',
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
      feedback_left: {
        borderWidth: 1,
        borderColor: '#CDD8EA',
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
        height: 46,
        width: 56,
        backgroundColor: '#FCFCFC',
        justifyContent: 'center',
        alignItems: 'center'
      },
      feedback_right: {
        borderWidth: 1,
        borderColor: '#D9D9D9',
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
        borderLeftWidth: 0,
        height: 46,
        paddingLeft: 14,
        paddingRight: 14,
        width: 220,
        backgroundColor: 'white',
        justifyContent: 'center',
      },
      input: {
        borderColor: '#D9D9D9',
        borderWidth: 1,
        borderRadius: 8,
        backgroundColor: 'white',
        width: 276,
        height: 76,
        color: '#7C889A',
        fontFamily: '-apple-system',
        textAlignVertical: 'top',
        textAlign: 'left',
        padding: 16,
      },
      invis: {
        position: 'absolute',
        height: 20,
        width: 80,
        backgroundColor: '#FDFDFD',
        left: 20,
        top: -18,
        alignItems: 'center',
        justifyContent: 'flex-end'
      },
      num_char: {
        position: 'absolute',
        right: 10,
        bottom: 4,
        fontSize: 12
      },
      button: {
        backgroundColor: '#FCAD72',
        borderRadius: 40,
        width: 300,
        height: 46,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 26
      }
})
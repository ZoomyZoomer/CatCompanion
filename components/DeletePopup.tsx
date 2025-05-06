import React, { useEffect } from "react";
import { Easing, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withSequence, withTiming } from "react-native-reanimated";
import Close from '@/assets/svgs/close.svg'
import axios from "axios";

const DeletePopup = ({ setOpen, text, relDate } : any) => {

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

    const deleteDailyLog = async() => {

        try {

            await axios.post('http://10.75.178.141:5000/deleteDaily', {
                uid: 0,
                date: relDate
            })

            setOpen(false);            

        } catch (e) {

        }

    }

    return (
        <Animated.View style={[styles.popup_container, animatedStyle]}>
            
            <View style={styles.popup_header}>
              <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%', position: 'relative' }}>
                <Text style={styles.header_text}>Delete {text}?</Text>
                <Text style={styles.header_subtext}>
                  No redos!
                </Text>
                <TouchableOpacity style={styles.close} onPress={() => setOpen(false)}>
                  <Close />
                </TouchableOpacity>
              </View>
            </View>

            <View style={{marginTop: 60}}>
                <View style={styles.cat_circle}>
                    <Image source={require('@/assets/cats/garbage_cat.png')} style={styles.cat}/>
                </View>
            </View>

            <View style={{width: '100%', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginTop: 60}}>
                <TouchableOpacity style={styles.cancel_btn} onPress={() => setOpen(false)}>
                    <Text style={{color: '#52637D', fontWeight: 500}}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.delete_btn} onPress={() => deleteDailyLog()}>
                    <Text style={{color: 'white', fontWeight: 500}}>Delete</Text>
                </TouchableOpacity>
            </View>

        </Animated.View>
    )
}

export default DeletePopup;

const styles = StyleSheet.create({
    popup_container: {
        height: '48%',
        width: '76%',
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
      cat: {
        height: 160,
        width: 100,
        resizeMode: 'contain',
        marginBottom: 10
      },
      cat_circle: {
        height: 90,
        width: 90,
        borderRadius: 90,
        backgroundColor: '#FFE3CE',
        justifyContent: 'center',
        alignItems: 'center'
      },
      cancel_btn: {
        height: 40,
        width: 106,
        borderWidth: 1,
        borderColor: '#CDD8EA',
        backgroundColor: 'white',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
      },
      delete_btn: {
        height: 40,
        width: 106,
        borderWidth: 1,
        borderColor: '#FCAD72',
        backgroundColor: '#FCAD72',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 20
      }
})
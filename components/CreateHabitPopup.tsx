import React, { useEffect, useState } from "react"
import { Easing, Switch, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import Animated, { useAnimatedStyle, useSharedValue, withSequence, withTiming } from "react-native-reanimated"

import Close from '@/assets/svgs/close.svg'
import HabitForm from "./HabitForm"
import PopupButton from "./PopupButton"
import SelectIcon from "./SelectIcon"
import FeedbackBox from "./FeedbackBox"
import HabitAmount from "./HabitAmount"
import HabitRewards from "./HabitRewards"
import axios from "axios"

const CreateHabitPopup = ({ setShowHabitPopup } : any) => {

    const [pageCount, setPageCount] = useState(0);
    const [showFeedback, setShowFeedback] = useState(false);

    const [showDropDown, setShowDropDown] = useState(false);
    const [dropDownValue, setDropDownValue] = useState('Day');

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

    const [amount, setAmount] = useState(0);
    const [time, setTime] = useState(0);
    const [habitName, setHabitName] = useState('');
    const [motivator, setMotivator] = useState('');
    const [activeIcon, setActiveIcon] = useState(null);

    const sendReq = async() => {

        const amountVal = (time > amount ? time * 4 : amount * 3);
        const typeVal = (time > amount ? 100 : 50);
        const total = amountVal + typeVal + 160;
        
        const currTier = total < 300 ? 0 : (total < 500 ? 1 : 2);

        axios.post('http://10.0.0.216:5000/sendHabit', {
            uid: 0,
            habit: {
                name: habitName,
                type: time > amount ? 'Time' : 'Quantity',
                motivator: motivator,
                icon: activeIcon,
                amount_required: time > amount ? time : amount,
                reward_amount: total,
                reward_tier: currTier,
                availability: dropDownValue
            }
        })

        setTimeout(() => {
            setShowHabitPopup(false);
        }, 400)

    }
    

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
                            pageCount === 1 ? 'Select an Icon' :
                            pageCount === 2 ? 'Select Habit Type' :
                            'Confirm Your Habit'
                            }
                        </Text>

                        <Text style={styles.header_subtext}>
                            {
                            pageCount === 0 ? "Let's achieve some consistency" :
                            pageCount === 1 ? 'Something unique' :
                            pageCount === 2 ? 'How are we keeping track?' :
                            'View your potential rewards'
                            }
                        </Text>

                        <TouchableOpacity style={styles.close} onPress={() => setShowHabitPopup(false)}>
                            <Close />
                        </TouchableOpacity>

                        </View>

                    </View>

                    {
                        pageCount === 0 ? <HabitForm setValidEntry={setValidEntry} setShowDropDown={setShowDropDown} showDropDown={showDropDown} setDropDownValue={setDropDownValue} dropDownValue={dropDownValue} setHabitName={setHabitName} habitName={habitName} setMotivator={setMotivator} motivator={motivator}/> :
                        pageCount === 1 ? <SelectIcon setValidEntry={setValidEntry} setShowFeedback={setShowFeedback} setActiveIcon={setActiveIcon} activeIcon={activeIcon}/> :
                        pageCount === 2 ? <HabitAmount setValidEntry={setValidEntry} amount={amount} setAmount={setAmount} time={time} setTime={setTime}/> :
                        <HabitRewards setValidEntry={setValidEntry} amount={amount} time={time}/>
                    }
                    

                    <View style={{position: 'absolute', bottom: 20, width: '100%', justifyContent: 'center', alignItems: 'center', zIndex: 1}}>
                        <PopupButton buttonText={'Next'} setPageCount={setPageCount} maxPage={4} currPage={pageCount} validEntry={validEntry} sendReq={sendReq}/>
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
        height: 600,
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
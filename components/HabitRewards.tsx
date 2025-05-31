import React, { useEffect, useState } from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import HabitModifier from "./HabitModifier"
import TierReward from "./TierReward"

import CameraFilled from '@/assets/svgs/camera-filled.svg'
import NoteBook from '@/assets/svgs/notebook.svg'
import Notes from '@/assets/svgs/notes.svg'
import Star from '@/assets/svgs/star_filled_dark.svg'
import Document from '@/assets/svgs/doc.svg'

const HabitRewards = ({ setValidEntry, amount, time } : any) => {

    const modifiers = [
        {name: 'Snap Shot', desc: 'Take a related picture of your finished habit', icon: CameraFilled, multiplier: '1.5'},
        {name: 'Growth Check', desc: 'Take a moment to write down your improvements and progress', icon: NoteBook, multiplier: '1.5'}
    ]

    const rewards = [
        {tier: 'I', cost: 150, icon: require('@/assets/pngs/message.png')},
        {tier: 'II', cost: 300, icon: require('@/assets/pngs/gift-box.png')},
        {tier: 'III', cost: 500, icon: require('@/assets/pngs/gift.png')}
    ]

    const [activeMods, setActiveMods] = useState([]);

    const base = 160;

    setValidEntry(true);

    const amountVal = (time > amount ? time * 4 : amount * 3);
    const typeVal = (time > amount ? 100 : 50);
    const total = amountVal + typeVal + base;
    
    const currTier = total < 300 ? 0 : (total < 500 ? 1 : 2);

    return (
        <View style={{width: '100%', padding: 20, marginTop: 0}}>
            <View style={{width: '100%', justifyContent: 'center', alignItems: 'center', marginBottom: 20}}>
                <View style={{width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 20}}>
                    <View style={styles.left_cont}>
                        <Text style={{color: '#687994', fontWeight: 500}}>Habit Reward</Text>
                    </View>
                    <View style={styles.right_cont}>
                        <Text style={{color: '#7C889A'}}>{amountVal + typeVal + base}</Text>
                        <Star height={16} width={16} style={{marginTop: 2, marginLeft: 2}}/>
                    </View>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%'}}>
                    {rewards.map((reward, index) => (
                        <TierReward reward={reward} currTier={currTier} index={index}/>
                    ))}
                </View>
                <View style={{width: '100%', padding: 20}}>
                    <View style={styles.line}>
                        <Text style={{color: '#7C889A', fontWeight: 500}}>
                            Type of Habit
                            <Text style={{color: '#A7AFBC', fontWeight: 400}}> ({time > amount ? 'Time' : 'Quantity'})</Text>
                        </Text>
                        <View style={{flexDirection: 'row', position: 'absolute', right: 0, justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{color: '#7C889A'}}>
                                +{typeVal}
                            </Text>
                            <Star style={{marginTop: 2, marginLeft: 2}}/>
                        </View>
                    </View>
                    <View style={styles.line}>
                        <Text style={{color: '#7C889A', fontWeight: 500}}>
                            Amount
                            <Text style={{color: '#A7AFBC', fontWeight: 400}}> ({time > amount ? time : amount} {time > amount ? 'min.' : 'units'})</Text>
                        </Text>
                        <View style={{flexDirection: 'row', position: 'absolute', right: 0, justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{color: '#7C889A'}}>
                                +{amountVal}
                            </Text>
                            <Star style={{marginTop: 2, marginLeft: 2}}/>
                        </View>
                    </View>
                    <View style={styles.line}>
                        <Text style={{color: '#7C889A', fontWeight: 500}}>
                            Base
                        </Text>
                        <View style={{flexDirection: 'row', position: 'absolute', right: 0, justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{color: '#7C889A'}}>
                                +{base}
                            </Text>
                            <Star style={{marginTop: 2, marginLeft: 2}}/>
                        </View>
                    </View>
                    <View style={styles.sep}/>
                    <View style={styles.line}>
                        <Text style={{color: '#7C889A', fontWeight: 500}}>
                            Total
                        </Text>
                        <View style={{flexDirection: 'row', position: 'absolute', right: 0, justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{color: '#7C889A'}}>
                                {amountVal + typeVal + base}
                            </Text>
                            <Star style={{marginTop: 2, marginLeft: 2}}/>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default HabitRewards

const styles = StyleSheet.create({
    left_cont: {
        borderColor: '#CDD8EA',
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        paddingLeft: 16,
        paddingRight: 16,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    right_cont: {
        borderColor: '#CDD8EA',
        flexDirection: 'row',
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        paddingLeft: 16,
        paddingRight: 16,
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        borderLeftWidth: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    button: {
        borderColor: '#D9D9D9',
        borderWidth: 1,
        borderRadius: 8,
        backgroundColor: 'white',
        padding: 14,
        width: '100%',
        marginTop: 40,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    line: {
        width: '100%',
        position: 'relative',
        marginTop: 2
    },
    sep: {
        backgroundColor: '#CDD8EA',
        height: 1,
        width: '100%',
        marginTop: 4,
        marginBottom: 4
    }
})
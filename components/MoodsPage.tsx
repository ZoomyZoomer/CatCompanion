import React, { useEffect, useState } from "react";
import { Text, StyleSheet, TouchableOpacity, View } from "react-native";
import DailyMood from "./DailyMood";

import ChevronDown from '@/assets/svgs/chevron_down.svg'
import Swap from '@/assets/svgs/swap.svg'
import axios from "axios";

const MoodsPage = ({setCalendarView, setIsPickingDate, setIsPickingMood, setIsDeletingMood, setRelDate, dailyMoods, month, year, setIsTimeTraveling, moodDate} : any) => {

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    return (
        <View style={{width: '90%', alignItems: 'center'}}>

            <View style={{width: '100%', alignItems: 'center', marginTop: 20, flexDirection: 'row', position: 'relative'}}>

                <View style={styles.dateBox}>
                    <Text style={{color: '#52637D'}}>Date</Text>
                </View>
                <TouchableOpacity style={styles.switchButton} onPress={() => setIsPickingDate(true)}>
                    <Text style={{color: '#52637D', marginRight: 6}}>{months[month]}, {year}</Text>
                    <ChevronDown stroke={'#52637D'} style={{marginTop: 2}}/>
                </TouchableOpacity>

                <TouchableOpacity style={styles.swapView} onPress={() => setCalendarView((prev : boolean) => !prev)}>
                    <Swap style={{marginTop: 2}}/>
                    <Text style={{color: '#52637D', marginLeft: 4}}>View</Text>
                </TouchableOpacity>

            </View> 

            <View style={{width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 20}}>
                {dailyMoods.map((mood : any, index: number) => (
                    <DailyMood moodDate={moodDate} mood={mood} index={index} setIsPickingMood={setIsPickingMood} setIsDeletingMood={setIsDeletingMood} setRelDate={setRelDate} setIsTimeTraveling={setIsTimeTraveling}/>
                ))}
            </View>

        </View>
    )
}

export default MoodsPage;

const styles = StyleSheet.create({
    dateBox: {
        backgroundColor: '#FCFCFC',
        borderColor: '#CDD8EA',
        borderWidth: 1,
        borderRadius: 12,
        height: 42,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 16,
        paddingRight: 16,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0
    },
    swapView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: 0,
        backgroundColor: 'white',
        borderColor: '#CDD8EA',
        borderWidth: 1,
        borderRadius: 12,
        height: 42,
        paddingLeft: 16,
        paddingRight: 16
    },
    switchButton: {
        borderWidth: 1,
        borderRadius: 12,
        borderColor: '#CDD8EA',
        width: '40%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: 'white',
        paddingTop: 10,
        paddingBottom: 10,
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        height: 42,
        borderLeftWidth: 0
    }
})
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import React, { useState } from "react"

import DailyMood from "@/components/DailyMood"
import CatSelectNavbar from "@/components/CatSelectNavbar"
import Navbar from "@/components/Navbar"

import CalendarIcon from '@/assets/svgs/calendar.svg'
import ChevronDown from '@/assets/svgs/chevron_down.svg'
import DatePopup from "@/components/DatePopup"


const logs = () => {

    const [isPickingDate, setIsPickingDate] = useState(false)

    return (
        
        <View style={{width: '100%', height: '100%', position: 'relative', justifyContent: 'center', alignItems: 'center'}}>

            {isPickingDate && <DatePopup />}

            <View style={{width: '100%', height: '100%', position: 'relative', filter: isPickingDate ? 'brightness(0.3) grayscale(0.4)' : 'none', pointerEvents: isPickingDate ? 'none' : 'auto'}}>
            
            <View style={{flex: 1, backgroundColor: '#FDFDFD', alignItems: 'center', overflowY: 'auto'}}>

                <Navbar tabName={"Planner"} currencyAmount={103}/>
                <CatSelectNavbar tabNames={['Moods', 'Habits', 'Goals']}/>

                <View style={{width: '90%', justifyContent: 'center', alignItems: 'center', marginTop: 20, marginBottom: 20}}>
                    <TouchableOpacity style={styles.switchButton}>
                        <Text style={{color: '#52637D'}}>
                            Switch to Calendar
                        </Text>
                        <CalendarIcon style={{marginLeft: 10}}/>
                    </TouchableOpacity>
                </View>

                <View>
                    <TouchableOpacity style={styles.dateButton} onPress={() => setIsPickingDate(true)}>
                        <Text style={{color: '#52637D', marginRight: 2, fontWeight: 500}}>April, 2025</Text>
                        <ChevronDown />
                    </TouchableOpacity>
                </View>

                <View style={{width: '90%', justifyContent: 'center', alignItems: 'center', marginTop: 20,}}>

                    <DailyMood />
                    <DailyMood />
                    <DailyMood />

                </View>

                

            </View>

            </View>

        </View>

    )

}

export default logs

const styles = StyleSheet.create({
    switchButton: {
        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#CDD8EA',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: 'white',
        paddingTop: 10,
        paddingBottom: 10
    },
    dateButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#CDD8EA',
        borderRadius: 20,
        backgroundColor: 'white',
        padding: 10,
        paddingLeft: 20,
        paddingRight: 20
    }
})
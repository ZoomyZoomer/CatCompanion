import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import React, { useEffect, useState } from "react"

import DailyMood from "@/components/DailyMood"
import CatSelectNavbar from "@/components/CatSelectNavbar"
import Navbar from "@/components/Navbar"

import CalendarIcon from '@/assets/svgs/calendar.svg'
import ChevronDown from '@/assets/svgs/chevron_down.svg'
import DatePopup from "@/components/DatePopup"
import Restart from '@/assets/svgs/restart.svg'
import MoodPopup from "@/components/MoodPopup"
import axios from "axios"

const logs = () => {

    const [isPickingDate, setIsPickingDate] = useState(false)
    const [isPckingMood, setIsPickingMood] = useState(false);

    const [dailyMoods, setDailyMoods] = useState([]);
    const [month, setMonth] = useState((new Date().getMonth()))
    const [year, setYear] = useState((new Date()).getFullYear());

    const fetchDailies = async() => {

        const res = await axios.get('http://10.75.178.141:5000/fetchDailyByMonth', {
            params: {
                uid: 0,
                month,
                year
            }
        })

        setDailyMoods(res.data);

    }

    useEffect(() => {
        fetchDailies();
    }, [])

    return (
        
        <View style={{width: '100%', height: '100%', position: 'relative', justifyContent: 'center', alignItems: 'center'}}>

            {isPickingDate && <DatePopup setIsPickingDate={setIsPickingDate}/>}
            {isPckingMood && <MoodPopup setIsPickingMood={setIsPickingMood}/>}

            <View style={{width: '100%', height: '100%', position: 'relative', filter: (isPickingDate || isPckingMood) ? 'brightness(0.3) grayscale(0.4)' : 'none', pointerEvents: (isPickingDate || isPckingMood) ? 'none' : 'auto'}}>
            
            <View style={{flex: 1, backgroundColor: '#FDFDFD', alignItems: 'center', overflowY: 'auto'}}>

                <Navbar tabName={"Planner"} currencyAmount={103}/>
                <CatSelectNavbar tabNames={['Moods', 'Habits', 'Goals']}/>

                <View style={{width: '90%', justifyContent: 'center', alignItems: 'center', marginTop: 20}}>
                    <TouchableOpacity style={styles.switchButton} onPress={() => setIsPickingMood(true)}>
                        <Restart style={{marginRight: 6}}/>
                        <Text style={{color: '#52637D'}}>
                            Switch to Calendar
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.sepBar}/>

                <View>
                    <TouchableOpacity style={styles.dateButton} onPress={() => setIsPickingDate(true)}>
                        <Text style={{color: '#52637D', marginRight: 2, fontWeight: 400, marginLeft: 4}}>April, 2025</Text>
                        <ChevronDown />
                    </TouchableOpacity>
                </View>

                <View style={{width: '90%', justifyContent: 'center', alignItems: 'center', marginTop: 20,}}>

                    {dailyMoods.map((mood) => (
                        <DailyMood mood={mood}/>
                    ))}

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
        borderRadius: 8,
        backgroundColor: 'white',
        padding: 8,
        paddingLeft: 30,
        paddingRight: 30
    },
    sepBar: {
        height: 1,
        width: '100%',
        marginTop: 16,
        marginBottom: 16,
        backgroundColor: '#E4E7EC'
    }
})
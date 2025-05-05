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

import Swap from '@/assets/svgs/swap.svg'

const logs = () => {

    const [isPickingDate, setIsPickingDate] = useState(false)
    const [isPckingMood, setIsPickingMood] = useState(false);

    const [dailyMoods, setDailyMoods] = useState([]);
    const [month, setMonth] = useState((new Date().getMonth()))
    const [year, setYear] = useState((new Date()).getFullYear());
    

    const fetchDailies = async() => {

        const res = await axios.get('http://10.72.104.118:5000/fetchDailyByMonth', {
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

            {isPickingDate && <DatePopup setIsPickingDate={setIsPickingDate} setMonth={setMonth} setYear={setYear} fetchDailies={fetchDailies}/>}
            {isPckingMood && <MoodPopup setIsPickingMood={setIsPickingMood}/>}

            <View style={{width: '100%', height: '100%', position: 'relative', filter: (isPickingDate || isPckingMood) ? 'brightness(0.3) grayscale(0.4)' : 'none', pointerEvents: (isPickingDate || isPckingMood) ? 'none' : 'auto'}}>
            
            <View style={{flex: 1, backgroundColor: '#FDFDFD', alignItems: 'center', overflowY: 'auto'}}>

                <Navbar tabName={"Planner"} currencyAmount={103}/>
                <CatSelectNavbar tabNames={['Moods', 'Habits', 'Goals']}/>

                <View style={{width: '90%', alignItems: 'center', marginTop: 20, flexDirection: 'row', position: 'relative'}}>

                    <View style={styles.dateBox}>
                        <Text style={{color: '#52637D'}}>Date</Text>
                    </View>
                    <TouchableOpacity style={styles.switchButton} onPress={() => setIsPickingDate(true)}>
                        <Text style={{color: '#52637D', marginRight: 6}}>April, 2025</Text>
                        <ChevronDown stroke={'#52637D'} style={{marginTop: 2}}/>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.swapView}>
                        <Swap style={{marginTop: 2}}/>
                        <Text style={{color: '#52637D', marginLeft: 4}}>View</Text>
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
        height: 36,
        borderLeftWidth: 0
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
    },
    dateBox: {
        backgroundColor: '#FCFCFC',
        borderColor: '#CDD8EA',
        borderWidth: 1,
        borderRadius: 12,
        height: 36,
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
        height: 36,
        paddingLeft: 16,
        paddingRight: 16
    }
})
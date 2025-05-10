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
import DeletePopup from "@/components/DeletePopup"

import { useMood } from "@/context/MoodContext"
import MoodsPage from "@/components/MoodsPage"
import CalendarPage from "@/components/CalendarPage"

const logs = () => {

    const [isPickingDate, setIsPickingDate] = useState(false);
    const {isPickingMood, setIsPickingMood} = useMood();
    const [isDeletingMood, setIsDeletingMood] = useState(false);

    const [relDate, setRelDate] = useState(null);
    const [month, setMonth] = useState((new Date().getMonth()))
    const [year, setYear] = useState((new Date()).getFullYear());

    const [currTab, setCurrTab] = useState(0);

    const [dailyMoods, setDailyMoods] = useState([]);

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

            {isPickingDate && <DatePopup setIsPickingDate={setIsPickingDate} month={month} year={year} setMonth={setMonth} setYear={setYear} fetchDailies={fetchDailies}/>}
            {isPickingMood && <MoodPopup setIsPickingMood={setIsPickingMood}/>}
            {isDeletingMood && <DeletePopup setOpen={setIsDeletingMood} text={'Daily Log'} relDate={relDate}/>}

            <View style={{width: '100%', height: '100%', position: 'relative', filter: (isPickingDate || isPickingMood || isDeletingMood) ? 'brightness(0.3) grayscale(0.4)' : 'none', pointerEvents: (isPickingDate || isPickingMood || isDeletingMood) ? 'none' : 'auto'}}>
            
            <View style={{flex: 1, backgroundColor: '#FBFBFB', alignItems: 'center', overflowY: 'auto'}}>

                <Navbar tabName={"Planner"} currencyAmount={103}/>
                <CatSelectNavbar tabNames={['Moods', 'Calendar', 'Goals']} setCurrTab={setCurrTab} currTab={currTab}/>

                {
                    currTab === 0 ? <MoodsPage setIsPickingDate={setIsPickingDate} setIsPickingMood={setIsDeletingMood} setIsDeletingMood={setIsDeletingMood} setRelDate={setRelDate} dailyMoods={dailyMoods} month={month} year={year} /> :
                    currTab === 1 ? <CalendarPage dailyMoods={dailyMoods}/> : <></>
                }
                           

            </View>

            </View>

        </View>

    )

}

export default logs

const styles = StyleSheet.create({
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
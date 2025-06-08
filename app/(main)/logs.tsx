import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import React, { useEffect, useRef, useState } from "react"

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
import TimeTravelMood from "@/components/TimeTravelMood"
import TasksPage from "@/components/TasksPage"
import CreateHabitPopup from "@/components/CreateHabitPopup"
import HabitLogPopup from "@/components/HabitLogPopup"
import RewardPopup from "@/components/RewardPopup"
import DayPopup from "@/components/DayPopup"

const logs = () => {

    const [isPickingDate, setIsPickingDate] = useState(false);
    const {isPickingMood, setIsPickingMood} = useMood();
    const [isDeletingMood, setIsDeletingMood] = useState(false);
    const [isTimeTraveling, setIsTimeTraveling] = useState(false);
    const [showHabitPopup, setShowHabitPopup] = useState(false);
    const [showHabitLog, setShowHabitLog] = useState(false);
    const [showRewardPopup, setShowRewardPopup] = useState(false);
    const [showDayPicker, setShowDayPicker] = useState(false);
    const [deletingHabit, setDeletingHabit] = useState(false);

    const [relDate, setRelDate] = useState(null);
    const [month, setMonth] = useState((new Date().getMonth()))
    const [year, setYear] = useState((new Date()).getFullYear());
    const [selectedDay, setSelectedDay] = useState((new Date()).getDate())

    const [currTab, setCurrTab] = useState(0);
    const [calendarView, setCalendarView] = useState(false);

    const [dailyMoods, setDailyMoods] = useState([]);

    const fetchDailies = async() => {

        const res = await axios.get('http://10.0.0.216:5000/fetchDailyByMonth', {
            params: {
                uid: 0,
                month,
                year
            }
        })

        setDailyMoods(res.data.reverse());

    }

    useEffect(() => {
        fetchDailies();
    }, [isPickingMood])

    const moodDate = useRef(new Date());
    const habitId = useRef(null);

    const deleteDailyLog = async() => {

        try {

            await axios.post('http://10.0.0.216:5000/deleteDaily', {
                uid: 0,
                date: relDate
            })

            setIsDeletingMood(false);         

        } catch (e) {

        }

    }

    const handleDelete = async() => {
    
        await axios.post('http://10.0.0.216:5000/deleteHabit', {
            uid: 0,
            hid: habitId.current?.hid
        })

        setDeletingHabit(false);
    
    }

    return (
        
        <View style={{width: '100%', height: '100%', position: 'relative', justifyContent: 'center', alignItems: 'center'}}>

            {isPickingDate && <DatePopup setIsPickingDate={setIsPickingDate} month={month} year={year} setMonth={setMonth} setYear={setYear} fetchDailies={fetchDailies} moodDate={moodDate} setMoodDate={setMoodDate}/>}
            {isPickingMood && <MoodPopup setIsPickingMood={setIsPickingMood} moodDate={moodDate}/>}
            {isDeletingMood && <DeletePopup setOpen={setIsDeletingMood} text={'Daily Log'} callFunc={deleteDailyLog}/>}
            {isTimeTraveling && <TimeTravelMood setIsTimeTraveling={setIsTimeTraveling} setIsPickingMood={setIsPickingMood} moodDate={moodDate}/>}
            {showHabitPopup && <CreateHabitPopup setShowHabitPopup={setShowHabitPopup}/>}
            {showHabitLog && <HabitLogPopup setShowHabitLog={setShowHabitLog} habitInfo={habitId.current} setShowRewardPopup={setShowRewardPopup}/>}
            {showRewardPopup && <RewardPopup setShowRewardPopup={setShowRewardPopup} habitInfo={habitId.current}/>}
            {showDayPicker && <DayPopup setSelectedDay={setSelectedDay} selectedDay={selectedDay} setIsPickingDate={setShowDayPicker}/>}
            {deletingHabit && <DeletePopup setOpen={setDeletingHabit} text={'Habit'} callFunc={handleDelete}/>}



            <View style={{width: '100%', height: '100%', position: 'relative', filter: (deletingHabit || showDayPicker || isPickingDate || isPickingMood || isDeletingMood || isTimeTraveling || showHabitPopup || showHabitLog || showRewardPopup) ? 'brightness(0.3) grayscale(0.4)' : 'none', pointerEvents: (deletingHabit || showDayPicker || isPickingDate || isPickingMood || isDeletingMood || isTimeTraveling || showHabitPopup || showHabitLog || showRewardPopup) ? 'none' : 'auto'}}>
            
            <View style={{flex: 1, backgroundColor: '#FBFBFB', alignItems: 'center', paddingBottom: 140, overflowY: 'auto'}}>

                <Navbar tabName={"Planner"} currencyAmount={103}/>
                <CatSelectNavbar tabNames={['Moods', 'Goals']} setCurrTab={setCurrTab} currTab={currTab}/>

                {
                    currTab === 0 ? (!calendarView ? <MoodsPage moodDate={moodDate} setCalendarView={setCalendarView} setIsPickingDate={setIsPickingDate} setIsPickingMood={setIsPickingMood} setIsDeletingMood={setIsDeletingMood} setRelDate={setRelDate} dailyMoods={dailyMoods} month={month} year={year} setIsTimeTraveling={setIsTimeTraveling}/> :
                    <CalendarPage moodDate={moodDate} setCalendarView={setCalendarView} dailyMoods={dailyMoods} setIsPickingMood={setIsPickingMood} setRelDate={setRelDate} setIsPickingDate={setIsPickingDate} setIsDeletingMood={setIsDeletingMood} month={month} year={year} setIsTimeTraveling={setIsTimeTraveling}/>) :
                    <TasksPage deletingHabit={deletingHabit} setDeletingHabit={setDeletingHabit} selectedDay={selectedDay} setShowDayPicker={setShowDayPicker} setShowHabitPopup={setShowHabitPopup} showHabitPopup={showHabitPopup} setShowHabitLog={setShowHabitLog} habitId={habitId} showHabitLog={showHabitLog} setShowRewardPopup={setShowRewardPopup}/>
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
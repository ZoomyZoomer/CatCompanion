import React, { useEffect, useState } from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Calendar from "./Calendar"
import DailyMood from "./DailyMood"

import Swap from '@/assets/svgs/swap.svg'
import EmptyMood from "./EmptyMood"

const CalendarPage = ({setCalendarView, dailyMoods, setIsPickingDate, setIsPickingMood, setIsDeletingMood, setRelDate, month, year, setIsTimeTraveling, moodDate} : any) => {

    const currDate = new Date();
    const currentDay = currDate.getDate()
    const [activeDay, setActiveDay] = useState(currentDay)

    const relMood = dailyMoods.find((mood : any) => (new Date(mood.date).getDate() == activeDay) && (new Date(mood.date).getMonth() == currDate.getMonth()) && new Date(mood.date).getFullYear() && currDate.getFullYear());

    useEffect(() => {
        
    }, [activeDay])

    const months = [
        'January', 'February', 'March', 'April', 'May',
        'June', 'July', 'August', 'September', 'October',
        'November', 'December'
    ]

    return (
        <View style={{width: '90%', alignItems: 'center'}}>

            <View style={{marginTop: 20, width: '100%'}}>
                <TouchableOpacity style={styles.swapView} onPress={() => setCalendarView((prev : boolean) => !prev)}>
                    <Swap style={{marginTop: 2}}/>
                    <Text style={{color: '#52637D', marginLeft: 4}}>View</Text>
                </TouchableOpacity>
                <Calendar dailyMoods={dailyMoods} setIsPickingDate={setIsPickingDate} month2={month} year2={year} activeDay={activeDay} setActiveDay={setActiveDay}/>
                {relMood && <DailyMood moodDate={moodDate} mood={relMood} setIsPickingMood={setIsPickingMood} setIsDeletingMood={setIsDeletingMood} setRelDate={setRelDate} setIsTimeTraveling={setIsTimeTraveling}/>}
                {!relMood && <EmptyMood setIsTimeTraveling={setIsTimeTraveling} moodDate={moodDate} date={new Date(year, month, activeDay)} month={months[month]} day={activeDay}/>}
            </View>

        </View>
    )
}

export default CalendarPage

const styles = StyleSheet.create({
    swapView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderColor: '#CDD8EA',
        borderWidth: 1,
        borderRadius: 12,
        height: 42,
        paddingLeft: 16,
        paddingRight: 16,
        marginBottom: 20,
        width: '100%'
    }
})
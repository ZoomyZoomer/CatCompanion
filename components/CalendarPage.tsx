import React, { useEffect, useState } from "react"
import { StyleSheet, Text, View } from "react-native"
import Calendar from "./Calendar"
import DailyMood from "./DailyMood"

const CalendarPage = ({dailyMoods, setIsPickingDate, setIsPickingMood, setIsDeletingMood, setRelDate, month, year, setIsTimeTraveling} : any) => {

    const currDate = new Date();
    const currentDay = currDate.getDate()
    const [activeDay, setActiveDay] = useState(currentDay)

    const relMood = dailyMoods.find((mood : any) => (new Date(mood.date).getDate() == activeDay) && (new Date(mood.date).getMonth() == currDate.getMonth()) && new Date(mood.date).getFullYear() && currDate.getFullYear());

    useEffect(() => {
        
    }, [activeDay])

    return (
        <View style={{width: '90%', alignItems: 'center'}}>

            <View style={{marginTop: 30, width: '100%'}}>
                <Calendar dailyMoods={dailyMoods} setIsPickingDate={setIsPickingDate} month2={month} year2={year} activeDay={activeDay} setActiveDay={setActiveDay}/>
                {relMood && <DailyMood mood={relMood} setIsPickingMood={setIsPickingMood} setIsDeletingMood={setIsDeletingMood} setRelDate={setRelDate} setIsTimeTraveling={setIsTimeTraveling}/>}
            </View>

        </View>
    )
}

export default CalendarPage

const styles = StyleSheet.create({

})
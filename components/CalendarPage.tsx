import React from "react"
import { StyleSheet, Text, View } from "react-native"
import Calendar from "./Calendar"

const CalendarPage = ({dailyMoods} : any) => {
    return (
        <View style={{width: '87%', alignItems: 'center'}}>

            <View style={{marginTop: 50, width: '100%'}}>
                <Calendar dailyMoods={dailyMoods}/>
            </View>

        </View>
    )
}

export default CalendarPage

const styles = StyleSheet.create({

})
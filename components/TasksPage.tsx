import React, { useState } from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import TaskSection from "./TaskSection"

const TasksPage = ({ setShowHabitPopup, showHabitPopup, setShowHabitLog, habitId, showHabitLog, setShowRewardPopup, setShowDayPicker, selectedDay, setDeletingHabit, deletingHabit } : any) => {

    return (
        <View style={{height: '100%', width: '90%', alignItems: 'center'}}>
            <TaskSection deletingHabit={deletingHabit} setDeletingHabit={setDeletingHabit} selectedDay={selectedDay} setShowDayPicker={setShowDayPicker} setShowHabitPopup={setShowHabitPopup} showHabitPopup={showHabitPopup} setShowHabitLog={setShowHabitLog} habitId={habitId} showHabitLog={showHabitLog} setShowRewardPopup={setShowRewardPopup}/>
        </View>
    )
}

export default TasksPage

const styles = StyleSheet.create({

})
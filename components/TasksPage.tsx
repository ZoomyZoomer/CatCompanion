import React, { useState } from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import TaskSection from "./TaskSection"

const TasksPage = ({ setShowHabitPopup, showHabitPopup, setShowHabitLog } : any) => {

    return (
        <View style={{height: '100%', width: '90%', alignItems: 'center'}}>
            <TaskSection setShowHabitPopup={setShowHabitPopup} showHabitPopup={showHabitPopup} setShowHabitLog={setShowHabitLog}/>
        </View>
    )
}

export default TasksPage

const styles = StyleSheet.create({

})
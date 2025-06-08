import React, { useEffect, useState } from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"

import Habit from "./Habit"

import Clipboard from '@/assets/svgs/clipboard.svg'
import ChevronDown from '@/assets/svgs/chevron_down.svg'
import Swap from '@/assets/svgs/swap.svg'
import Paperclip from '@/assets/svgs/paperclip.svg'
import AddCircle from '@/assets/svgs/add-circle.svg'
import NullHabit from "./NullHabit"
import Close from '@/assets/svgs/close-circle.svg'

import axios from "axios"

const TaskSection = ({ setShowHabitPopup, showHabitPopup, setShowHabitLog, habitId, showHabitLog, setShowRewardPopup, setShowDayPicker, selectedDay, setDeletingHabit, deletingHabit } : any) => {

    const [habits, setHabits] = useState([]);
    const [isDeleting, setIsDeleting] = useState(false);

    const fetchHabits = async() => {

        const res = await axios.get('http://10.0.0.216:5000/fetchHabits', {
            params: {
                uid: 0,
                day: daysOfWeek[selectedDay]
            }
        })

        setHabits(res.data);

    }

    useEffect(() => {
        fetchHabits();
    }, [showHabitPopup, showHabitLog, deletingHabit, selectedDay])

    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


    return (
        <View style={{width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 20}}>
            <View style={styles.header}>

                <Clipboard />
                <Text style={{color: 'white', fontSize: 16, fontWeight: 600, marginLeft: 8}}>Cat Habit Tracker</Text>

                <View style={styles.decorDotLeft}/>
                <View style={styles.decorDotRight}/>

            </View>
            <View style={styles.body}>
                <View style={{width: '100%', position: 'relative', flexDirection: 'row'}}>

                    <View style={styles.date_box}><Text style={{color: '#52637D'}}>Day</Text></View>
                    <TouchableOpacity style={styles.date} onPress={() => setShowDayPicker(true)}>
                        <Text style={{color: '#52637D'}}>{daysOfWeek[selectedDay]}</Text>
                        <ChevronDown stroke={'#52637D'} style={{marginTop: 2, marginLeft: 4}}/>
                    </TouchableOpacity> 

                    <TouchableOpacity style={styles.swapView} onPress={() => setIsDeleting((prev : boolean) => !prev)}>
                        {!isDeleting && <Close />}
                        <Text style={{color: '#52637D', marginLeft: 4}}>{!isDeleting ? 'Delete' : 'Cancel'}</Text>
                    </TouchableOpacity>

                </View>

                <View style={{width: '100%', marginTop: 26}}>

                    <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}}>
                        <Paperclip />
                        <Text style={{color: '#52637D', fontSize: 16, fontWeight: 600, marginLeft: 6}}>Today's Habits</Text>
                    </View>

                    {habits.length === 0 && (
                        <NullHabit setShowHabit={setShowHabitPopup}/>
                    )}

                    {habits.length > 0 && (
                        habits.map((habit) => (
                            <Habit habit={habit} setShowHabitLog={setShowHabitLog} habitId={habitId} setShowRewardPopup={setShowRewardPopup} isDeleting={isDeleting} setDeletingHabit={setDeletingHabit}/>
                        ))
                    )}

                </View>
            </View>

            <TouchableOpacity style={styles.add_button} onPress={() => setShowHabitPopup(true)}>
                <Text style={{color: '#52637D', fontWeight: 500, marginRight: 4}}>Add a Habit</Text>
                <AddCircle />
            </TouchableOpacity>

        </View>
    )
}

export default TaskSection

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 70,
        backgroundColor: '#FCAD72',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 40,
        position: 'relative'
    },
    body: {
        width: '100%',
        backgroundColor: 'white',
        borderColor: '#CDD8EA',
        borderWidth: 1,
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
        borderTopWidth: 0,
        padding: 30,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 50
    },
    date_box: {
        padding: 9,
        paddingLeft: 18,
        paddingRight: 18,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FCFCFC',
        borderColor: '#CDD8EA',
        borderWidth: 1,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10
    },
    date: {
        padding: 9,
        paddingLeft: 18,
        paddingRight: 18,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#CDD8EA',
        borderWidth: 1,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        borderLeftWidth: 0,
        backgroundColor: 'white',
        flexDirection: 'row'
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
        height: 39,
        paddingLeft: 16,
        paddingRight: 16
    },
    decorDotLeft: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 10,
        top: 10,
        height: 10,
        width: 10,
        borderRadius: 5,
    },
    decorDotRight: {
        position: 'absolute',
        backgroundColor: 'white',
        right: 10,
        top: 10,
        height: 10,
        width: 10,
        borderRadius: 5,
    },
    add_button: {
        position: 'absolute',
        bottom: -20,
        borderColor: '#CDD8EA',
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        paddingLeft: 16,
        paddingRight: 16,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    }
})
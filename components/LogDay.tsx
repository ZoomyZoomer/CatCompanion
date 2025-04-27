import { Animated, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import React, { useRef, useEffect, useState } from "react"
import InfoSection from "./InfoSection"
import MoodSelector from "./MoodSelector"

import ChevronDown from '@/assets/svgs/chevron_down.svg'

const LogDay = () => {
    const itemSet = [
        {setName: 'Morning Routine', 
            items: [
                {itemName: 'Coffee', itemDesc: 'I drank Coffee', itemIcon: require('@/assets/pngs/itemLogs/coffee.png')},
                {itemName: 'Sleep', itemDesc: 'Quality of Sleep', itemIcon: require('@/assets/pngs/itemLogs/pillow.png')},
                {itemName: 'Breakfast', itemDesc: 'I ate Breakfast', itemIcon: require('@/assets/pngs/itemLogs/breakfast.png')},
                {itemName: 'Shower', itemDesc: 'I Showered today', itemIcon: require('@/assets/pngs/itemLogs/bathtub.png')},
                {itemName: 'Journal', itemDesc: 'I Journaled plans', itemIcon: require('@/assets/pngs/itemLogs/agenda.png')},
                {itemName: 'Social', itemDesc: 'Checked Socials', itemIcon: require('@/assets/pngs/itemLogs/comment.png')}
            ]
        },
        {setName: 'School & Work',
            items: [
                {itemName: 'Test', itemDesc: 'I had an Exam', itemIcon: require('@/assets/pngs/itemLogs/test.png')},
                {itemName: 'Class', itemDesc: 'I had Class', itemIcon: require('@/assets/pngs/itemLogs/blackboard.png')},
                {itemName: 'Work', itemDesc: 'I went to Work', itemIcon: require('@/assets/pngs/itemLogs/briefcase.png')},
                {itemName: 'Deadline', itemDesc: 'I met a Deadline', itemIcon: require('@/assets/pngs/itemLogs/deadline.png')},
                {itemName: 'Traffic', itemDesc: 'I saw Traffic', itemIcon: require('@/assets/pngs/itemLogs/traffic.png')}
            ]
        },
        {setName: 'School & Work',
            items: [
                {itemName: 'Test', itemDesc: 'I had an Exam', itemIcon: require('@/assets/pngs/itemLogs/test.png')},
                {itemName: 'Class', itemDesc: 'I had Class', itemIcon: require('@/assets/pngs/itemLogs/blackboard.png')},
                {itemName: 'Work', itemDesc: 'I went to Work', itemIcon: require('@/assets/pngs/itemLogs/briefcase.png')},
                {itemName: 'Deadline', itemDesc: 'I met a Deadline', itemIcon: require('@/assets/pngs/itemLogs/deadline.png')},
                {itemName: 'Traffic', itemDesc: 'I saw Traffic', itemIcon: require('@/assets/pngs/itemLogs/traffic.png')}
            ]
        }
    ]

    const bounceAnim = useRef(new Animated.Value(0)).current

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(bounceAnim, {
                    toValue: -6,
                    duration: 600,
                    useNativeDriver: true
                }),
                Animated.timing(bounceAnim, {
                    toValue: 0,
                    duration: 600,
                    useNativeDriver: true
                })
            ])
        ).start()
    }, [])

    const [selectedItems, setSelectedItems] = useState([])

    return (
        <View style={{height: 'auto', padding: 20, paddingTop: 0, width: '100%', position: 'relative'}}>

            <InfoSection 
                mainText={'What to do'}
                subText={"Pick the top most notable events you experienced today, good or bad."}
            />

            <View style={{position: 'relative', height: '60%'}}>
                <ScrollView style={styles.mainContent} showsVerticalScrollIndicator={false}>
                    {itemSet.map((itemSet, index) => (
                        <MoodSelector key={index} items={itemSet.items} title={itemSet.setName} selectedItems={selectedItems} setSelectedItems={selectedItems}/>
                    ))}
                </ScrollView>
                <Animated.View style={[{ transform: [{ translateY: bounceAnim }, { translateX: -15 }], position: 'absolute', bottom: -24, left: '50%' }]}>
                    <TouchableOpacity style={styles.moreCircle}>
                        <ChevronDown stroke={'white'} />
                    </TouchableOpacity>
                </Animated.View>
            </View>


        </View>
    )
}

export default LogDay

const styles = StyleSheet.create({
    mainContent: {
        height: '100%',
        overflowY: 'auto',
        marginTop: 16
    },
    moreCircle: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 30,
        width: 30,
        borderRadius: 30,
        backgroundColor: '#FCAD72',
    }
})

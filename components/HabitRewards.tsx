import React from "react"
import { StyleSheet, View } from "react-native"
import HabitModifier from "./HabitModifier"
import CameraFilled from '@/assets/svgs/camera-filled.svg'

const HabitRewards = () => {
    return (
        <View style={{flexDirection: 'row', width: '100%', padding: 20}}>
            <HabitModifier icon={CameraFilled}/>
            <HabitModifier icon={CameraFilled}/>
        </View>
    )
}

export default HabitRewards

const styles = StyleSheet.create({

})
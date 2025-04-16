import React, { useEffect, useState } from "react"
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"

import StopWatch from '@/assets/svgs/stopwatch.svg'

type PathProps = {
    colorId: number
  };

const Path = ({colorId} : PathProps) => {

    const pathColors = [
        {main: '#F074CF', tag: '#FEC1EE', bubble: '#FFE1F7'}
    ]

    const colors = pathColors[colorId];

    return (
        <View style={styles.path_container}>

            <Text style={[styles.path_name, {color: colors?.main}]}>Flexibility</Text>

            <View style={[styles.path_circle, {backgroundColor: colors?.bubble}]}>
                <Image source={require('@/assets/pngs/flexibility.png')} style={styles.path_image}/>
            </View>

            <View style={{flexDirection: 'row', marginTop: 14, justifyContent: 'center', alignItems: 'center'}}>
                <StopWatch color={colors?.main} height={14} width={14}/>
                <Text style={{color: colors?.main, fontSize: 12, marginLeft: 4}}>15 minute exercise</Text>
            </View>

            <View style={styles.tag_wrap}>
                <View style={[styles.tag, {backgroundColor: colors?.tag}]}><Text style={{fontSize: 10, color: 'white'}}>Butterfly stretch</Text></View>
                <View style={[styles.tag, {backgroundColor: colors?.tag, marginLeft: 2}]}><Text style={{fontSize: 10, color: 'white'}}>Pike</Text></View>
                <View style={[styles.tag, {backgroundColor: colors?.tag}]}><Text style={{fontSize: 10, color: 'white'}}>Pigeon Pose</Text></View>
                <View style={[styles.tag, {backgroundColor: colors?.tag, marginLeft: 2}]}><Text style={{fontSize: 10, color: 'white'}}>Deep Lunge</Text></View>
            </View>

            <TouchableOpacity style={[styles.path_button, {backgroundColor: colors?.main}]}>
               <Text style={{color: 'white', fontWeight: 500}}>Selected</Text>
            </TouchableOpacity>

        </View>
    )
}

export default Path

const styles = StyleSheet.create({
    path_container: {
        borderWidth: 1,
        borderColor: '#CDD8EA',
        borderStyle: 'dashed',
        borderRadius: 8,
        alignItems: 'center',
        height: '78%',
        width: 180,
        padding: 10
    },
    path_name: {
        fontWeight: 500,
        fontSize: 16
    },
    path_circle: {
        height: 70,
        width: 70,
        borderRadius: 40,
        backgroundColor: '',
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    path_image: {
        height: 55,
        width: 55
    },
    tag_wrap: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
    tag: {
        paddingTop: 4,
        paddingBottom: 4,
        paddingRight: 10,
        paddingLeft: 10,
        borderRadius: 16,
        marginTop: 4,
        width: 'auto',
    },
    path_button: {
        width: '80%',
        height: 34,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        marginTop: 20
    }
})
import React, { useState } from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Path from "./Path"

import Question from '@/assets/svgs/question_mark.svg'

const SelectPath = ({popupData} : any) => {

    const [currPath, setCurrPath] = useState(true);

    return (
        <View style={styles.content_container}>
            
            <View style={{width: '100%', justifyContent: 'center', alignItems: 'center', flex: 1, position: 'relative'}}>
                <Path id={true} currPath={currPath} setCurrPath={setCurrPath} pathInfo={[popupData?.optionsLabels[0], popupData?.options[0]]}/>
                <Path id={false} currPath={currPath} setCurrPath={setCurrPath} pathInfo={[popupData?.optionsLabels[1], popupData?.options[1]]}/>
            </View>

            <View style={{width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 0}}>
                <TouchableOpacity style={currPath ? styles.slide_active : styles.slide_inactive} onPress={() => setCurrPath(true)}/>
                <TouchableOpacity style={!currPath ? styles.slide_active : styles.slide_inactive} onPress={() => setCurrPath(false)}/>
            </View>

            <View style={{flexDirection: 'row', width: '100%', alignItems: 'center', marginTop: 18}}>
                <View style={{height: 38, width: 38, borderRadius: 38, borderWidth: 1, borderColor: '#CDD8EA', justifyContent: 'center', alignItems: 'center'}}>
                    <Question style={styles.question}/>
                </View>
                <Text style={styles.note}><Text style={{fontWeight: 500}}>Note: </Text>Completion isn’t judged on how well you do, just try your best 😁</Text>
            </View>

        </View>
    )
}

export default SelectPath

const styles = StyleSheet.create({
    content_container: {
        flex: 1,
        width: '90%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    question: {
        height: 18,
        width: 18
    },
    note: {
        color: '#52637D',
        marginLeft: 10,
        fontSize: 11
    },
    slide_active: {
        height: 9,
        width: 24,
        backgroundColor: '#FCAD72',
        borderRadius: 9,
        margin: 3
    },
    slide_inactive: {
        height: 8,
        width: 8,
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#FCAD72',
        margin: 3
    }
})
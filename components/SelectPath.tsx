import React from "react"
import { StyleSheet, Text, View } from "react-native"
import Path from "./Path"

import Question from '@/assets/svgs/question_mark.svg'

const SelectPath = () => {
    return (
        <View style={styles.content_container}>
            
            <Path colorId={0}/>

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
    }
})
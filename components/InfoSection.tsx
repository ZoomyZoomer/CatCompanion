import { StyleSheet, Text, View } from "react-native"
import React from "react"

import Question from '@/assets/svgs/question_mark.svg'

const InfoSection = ({mainText, subText} : any) => {
    return (
        <View style={{flexDirection: 'row', width: '100%', alignItems: 'center', marginTop: 18}}>
            <View style={{height: 38, width: 38, borderRadius: 38, borderWidth: 1, borderColor: '#CDD8EA', justifyContent: 'center', alignItems: 'center'}}>
                <Question style={styles.question}/>
            </View>
            <Text style={styles.note}><Text style={{fontWeight: 500}}>{mainText}: </Text>{subText}</Text>
        </View>
    )
}

export default InfoSection

const styles = StyleSheet.create({
    question: {
        height: 18,
        width: 18
    },
    note: {
        color: '#52637D',
        marginLeft: 10,
        fontSize: 11
    },
})
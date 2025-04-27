import React, { useState } from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Path from "./Path"
import InfoSection from "./InfoSection"


const SelectPath = ({popupData, currPath, setCurrPath} : any) => {

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

            <InfoSection 
                mainText={'Note'}
                subText={'Completion isn’t judged on how well you do, just try your best 😁'}
            />

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
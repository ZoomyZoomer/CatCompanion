import { StyleSheet, Text, View } from "react-native"
import React from "react"

import Navbar from "@/components/Navbar"
import CatSelectNavbar from "@/components/CatSelectNavbar"
import EmbarkedAdventure from "@/components/EmbarkedAdventure"

import Key from '@/assets/svgs/key_small.svg'


export default function adventures() {
    return (
        <View style={{flex: 1, backgroundColor: '#FDFDFD', alignItems: 'center'}}>

            <Navbar tabName={"Adventures"} currencyAmount={103}/>
            <CatSelectNavbar />

            <View style={{flex: 1, width: '90%', alignItems: 'center', marginTop: 40}}>
                <View style={{flexDirection: 'row', width: '100%', marginLeft: 4, marginBottom: 12, alignItems: 'center'}}>
                    <Key />
                    <Text style={styles.section_text}>Your Embarked Adventures</Text>
                </View>
                <EmbarkedAdventure adventure={null}/>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    section_text: {
        color: '#52637D',
        marginLeft: 8,
        fontWeight: 500
    }
})
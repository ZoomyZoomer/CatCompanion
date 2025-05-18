import { View, StyleSheet, TouchableOpacity } from "react-native"
import CatSelectNavbarItem from "./CatSelectNavbarItem"
import KeyEmpty from '@/assets/svgs/key_empty.svg'
import KeyFilled from '@/assets/svgs/key_filled.svg'
import EmojiEmpty from '@/assets/svgs/emoji_empty.svg'
import EmojiFilled from '@/assets/svgs/emoji_filled.svg'
import StarEmpty from '@/assets/svgs/star_empty.svg'
import StarFilled from '@/assets/svgs/star_filled.svg'
import { useState } from "react"
import React from "react"

const CatSelectNavbar = ({tabNames, setCurrTab, currTab} : any) => {

    return (
        <View style={styles.navbar_container}>

            <TouchableOpacity style={{height: '70%', width: tabNames[2] ? '28%' : '40%', justifyContent: currTab === 0 ? 'flex-start' : 'flex-end', marginLeft: 2, marginRight: 2}} onPress={() => setCurrTab(0)}>
                <CatSelectNavbarItem isActive={currTab === 0} Icon={currTab === 0 ? KeyFilled : KeyEmpty} tabName={tabNames[0]}/>
            </TouchableOpacity>

            <TouchableOpacity style={{height: '70%', width: tabNames[2] ? '28%' : '40%', justifyContent: currTab === 1 ? 'flex-start' : 'flex-end', marginLeft: 2, marginRight: 2}} onPress={() => setCurrTab(1)}>
                <CatSelectNavbarItem isActive={currTab === 1} Icon={currTab === 1 ? EmojiFilled : EmojiEmpty} tabName={tabNames[1]}/>
            </TouchableOpacity>

            {tabNames[2] && (
                <TouchableOpacity style={{height: '70%', width: '28%', justifyContent: currTab === 2 ? 'flex-start' : 'flex-end', marginLeft: 2, marginRight: 2}} onPress={() => setCurrTab(2)}>
                    <CatSelectNavbarItem isActive={currTab === 2} Icon={currTab === 2 ? StarFilled : StarEmpty} tabName={tabNames[2]}/>
                </TouchableOpacity>
            )}

        </View>
    )
}

export default CatSelectNavbar

const styles = StyleSheet.create({
    navbar_container: {
        height: 100,
        width: '100%',
        borderBottomWidth: 1,
        borderColor: '#CDD8EA',
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
        backgroundColor: 'transparent'
    }
})
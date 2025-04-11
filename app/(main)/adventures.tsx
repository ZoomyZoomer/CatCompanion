import { ImageSourcePropType, StyleSheet, Text, View } from "react-native"
import React, { useState } from "react"

import Navbar from "@/components/Navbar"
import CatSelectNavbar from "@/components/CatSelectNavbar"
import EmbarkedAdventure from "@/components/EmbarkedAdventure"

import Key from '@/assets/svgs/key_small.svg'
import CategorySelect from "@/components/CategorySelect"
const Shoe = require('@/assets/pngs/shoe_icon.png')


export default function adventures() {

    type categoryPaths = {
        cp_id: number;
        name: string,
        desc: string,
        difficulty: number,
        Icon: ImageSourcePropType
    }

    type category = {
        c_id: number;
        name: string;
        paths: [categoryPaths]
    }

    const [activeId, setActiveId] = useState(0);

    const adventureSet = new Set<category>([
        {c_id: 0, name: 'Health & Fitness', 
        paths: [{cp_id: 0, name: 'One Step at a Time', desc: 'Includes: A choice between flexibility and endurance exercises~', difficulty: 1, Icon: Shoe}]}
    ])

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

                <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginTop: 20}}>
                    <View style={{width: '45%', flexDirection: 'row', alignItems: 'center'}}>
                        <View style={{backgroundColor: '#E4E7EC', height: 1, width: '80%'}}/>
                        <View style={{backgroundColor: '#E4E7EC', height: 5, width: 5, borderRadius: 5, marginLeft: 6}}/>
                    </View>
                    <View style={{width: '45%', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end'}}>
                        <View style={{backgroundColor: '#E4E7EC', height: 5, width: 5, borderRadius: 5, marginRight: 6}}/>
                        <View style={{backgroundColor: '#E4E7EC', height: 1, width: '80%'}}/>
                    </View>
                </View>

                {Array.from(adventureSet).map((adventure) => (
                    <CategorySelect category={adventure.name} id={adventure.c_id} activeId={activeId} setActiveId={setActiveId}/>
                ))}

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
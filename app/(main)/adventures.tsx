import { ImageSourcePropType, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { useState } from "react"

import Navbar from "@/components/Navbar"
import CatSelectNavbar from "@/components/CatSelectNavbar"
import EmbarkedAdventure from "@/components/EmbarkedAdventure"
import CategorySelect from "@/components/CategorySelect"
import CategoryAdventure from "@/components/CategoryAdventure"
import selectAdventurePopup from "@/components/SelectAdventurePopup"

import Key from '@/assets/svgs/key_small.svg'
import Notes from '@/assets/svgs/notes.svg'
import Question from '@/assets/svgs/question_mark.svg'

import React from "react"
import SelectAdventurePopup from "@/components/SelectAdventurePopup"

const Shoe = require('@/assets/pngs/shoe_icon.png');
const Brain = require('@/assets/pngs/brain_icon.png');
const Tree = require('@/assets/pngs/tree_icon.png');


export default function adventures() {

    type categoryPaths = {
        cp_id: number;
        name: string;
        desc: string;
        difficulty: number;
        Icon: ImageSourcePropType;
      }
      
      type category = {
        c_id: number;
        name: string;
        paths: categoryPaths[];
      }
      

    const [activeId, setActiveId] = useState(0);
    
    const [showSelectAdventurePopup, setShowSelectAdventurePopup] = useState(false);

    const adventureSet: category[] = [
        {
          c_id: 0, 
          name: 'Health & Fitness',
          paths: [
            { cp_id: 0, name: 'One Step at a Time (I)', desc: 'Flexibility or Endurance exercises~', difficulty: 1, Icon: Shoe },
            { cp_id: 1, name: 'Mind & Muscle (II)', desc: 'Mediation or Strength exercises~', difficulty: 2, Icon: Brain }
          ]
        },
        {
          c_id: 1, 
          name: 'Outdoors',
          paths: [
            { cp_id: 0, name: 'Touch Grass (I)', desc: 'Calm, scenic walks or Brisky runs~', difficulty: 1, Icon: Tree }
          ]
        },
        {
          c_id: 2,
          name: 'Friends',
          paths: []
        },
        {
          c_id: 3,
          name: 'School & Work',
          paths: []
        },
        {
          c_id: 4,
          name: 'Wellness',
          paths: []
        }
      ];
      
    return (
        <View style={{width: '100%', height: '100%', position: 'relative', justifyContent: 'center', alignItems: 'center'}}>

            {showSelectAdventurePopup && <SelectAdventurePopup />}

        <View style={{flex: 1, backgroundColor: '#FDFDFD', alignItems: 'center', overflowY: 'auto', filter: showSelectAdventurePopup ? 'brightness(0.3) grayscale(0.4)' : 'none', pointerEvents: showSelectAdventurePopup ? 'none' : 'auto'}}>

            <Navbar tabName={"Adventures"} currencyAmount={103}/>
            <CatSelectNavbar />

            <View style={{flex: 1, width: '88%', alignItems: 'center', marginTop: 40}}>

                <View style={{flexDirection: 'row', width: '100%', marginLeft: 4, marginBottom: 12, alignItems: 'center'}}>
                    <Key />
                    <Text style={styles.section_text}>Your Embarked Adventures</Text>
                </View>

                <EmbarkedAdventure adventure={null}/>

                <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginTop: 30}}>
                    <View style={{width: '45%', flexDirection: 'row', alignItems: 'center'}}>
                        <View style={{backgroundColor: '#E4E7EC', height: 1, width: '80%'}}/>
                        <View style={{backgroundColor: '#E4E7EC', height: 5, width: 5, borderRadius: 5, marginLeft: 6}}/>
                    </View>
                    <View style={{width: '45%', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end'}}>
                        <View style={{backgroundColor: '#E4E7EC', height: 5, width: 5, borderRadius: 5, marginRight: 6}}/>
                        <View style={{backgroundColor: '#E4E7EC', height: 1, width: '80%'}}/>
                    </View>
                </View>

                <View style={styles.category_tags_container}>
                    {adventureSet.map((adventure) => (
                        <CategorySelect 
                        key={adventure.c_id} 
                        category={adventure.name} 
                        id={adventure.c_id} 
                        activeId={activeId} 
                        setActiveId={setActiveId}
                        />
                    ))}
                </View>

                <View style={styles.path_nav}>

                        <Notes />
                        <Text style={styles.section_text}>Adventure Paths</Text>

                        <TouchableOpacity style={styles.info_button}>
                            <Question />
                            <Text style={{color: '#52637D', fontSize: 12, marginLeft: 6}}>What is this?</Text>
                        </TouchableOpacity>

                </View>


                <View style={styles.category_path_container}>
                    {adventureSet[activeId].paths.map((pathdata, index) => (
                        <View style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                            <CategoryAdventure path={pathdata} isLastAdventure={index == adventureSet[activeId].paths.length - 1} setShowSelectAdventurePopup={setShowSelectAdventurePopup} />
                        </View>
                    ))}
                </View>


            </View>

            

        </View>

        </View>
    )
}

const styles = StyleSheet.create({
    section_text: {
        color: '#52637D',
        marginLeft: 8,
        fontWeight: 500,
        fontSize: 12
    },
    category_tags_container: {
        width: '100%',
        marginTop: 30,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center'
    },
    category_path_container: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    path_nav: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 40,
        marginBottom: 18,
        position: 'relative'
    },
    info_button: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#CDD8EA',
        borderWidth: 1,
        borderRadius: '0.4rem',
        borderStyle: 'solid',
        flexDirection: 'row',
        height: 26,
        width: 120,
        right: 0
    }
})
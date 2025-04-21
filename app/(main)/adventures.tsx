import { ImageSourcePropType, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { useState, useRef, useEffect } from "react"
import axios from "axios"

import Navbar from "@/components/Navbar"
import CatSelectNavbar from "@/components/CatSelectNavbar"
import EmbarkedAdventure from "@/components/EmbarkedAdventure"
import CategorySelect from "@/components/CategorySelect"
import CategoryAdventure from "@/components/CategoryAdventure"
import selectAdventurePopup from "@/components/SelectAdventurePopup"

import Key from '@/assets/svgs/key_small.svg'
import Notes from '@/assets/svgs/notes.svg'
import Question from '@/assets/svgs/question_mark.svg'

import SelectAdventurePopup from "@/components/SelectAdventurePopup"
import React = require("react")

const Shoe = require('@/assets/pngs/shoe_icon.png');
const Brain = require('@/assets/pngs/brain_icon.png');
const Tree = require('@/assets/pngs/tree_icon.png');

const Flexibility = require('@/assets/pngs/flexibility.png');
const Endurance = require('@/assets/pngs/endurance.png');



export default function adventures() {

    type categoryPaths = {
        cpid: number;
        name: string;
        desc: string;
        difficulty: number;
        Icon: ImageSourcePropType;
        optionsLabels: Object[];
        options: Object[];
      }
      
      type category = {
        cid: number;
        name: string;
        paths: categoryPaths[];
      }
      

    const [activeId, setActiveId] = useState(0);
    const [popupData, setPopupData] = useState({});
    
    const [showSelectAdventurePopup, setShowSelectAdventurePopup] = useState(false);
    const [categoryData, setCategoryData] = useState({cid: null, adventureStatus: []});

    const fetchAdventures = async() => {

        try {

            const res = await axios.get('http://10.75.180.60:5000/fetchCategory', {
                params: {
                    username: 'Wholemilky',
                    uid: 0,
                    cid: activeId
                }
            })

            setCategoryData(res.data);

        } catch(e){}

    }

    useEffect(() => {
        fetchAdventures();
    }, [activeId])

    const adventureSet: category[] = [
        {
          cid: 0, 
          name: 'Health & Fitness',
          paths: [
            { cpid: 0, name: 'One Step at a Time (I)', desc: 'Flexibility or Endurance exercises~', difficulty: 1, Icon: Shoe,
                optionsLabels: [
                    {label: 'Flexibility', type: 'minute exercise', duration: 15, Icon: Flexibility, colorId: 0},
                    {label: 'Endurance', type: 'minute exercise', duration: 20, Icon: Endurance, colorId: 1}
                ],
                options: [
                    [{name: 'Butterfly Stretch', difficulty: 1}, {name: 'Pike', difficulty: 1}, {name: 'Pigeon Pose', difficulty: 1}, {name: 'Deep Lunge', difficulty: 2}],
                    [{name: 'Plank', difficulty: 2}, {name: 'Jumping Jacks', difficulty: 1}, {name: 'Running in Place', difficulty: 1}, {name: 'Wall Sits', difficulty: 2}]
                ]
             },
            { cpid: 1, name: 'Mind & Muscle (II)', desc: 'Mediation or Strength exercises~', difficulty: 2, Icon: Brain,
                optionsLabels: [],
                options: []
             }
          ]
        },
        {
          cid: 1, 
          name: 'Outdoors',
          paths: [
            { cpid: 0, name: 'Touch Grass (I)', desc: 'Calm, scenic walks or Brisky runs~', difficulty: 1, Icon: Tree,
                optionsLabels: [], 
                options: []
            }
          ]
        },
        {
          cid: 2,
          name: 'Friends',
          paths: []
        },
        {
          cid: 3,
          name: 'School & Work',
          paths: []
        },
        {
          cid: 4,
          name: 'Wellness',
          paths: []
        }
      ];
      
    return (
        <View style={{width: '100%', height: '100%', position: 'relative', justifyContent: 'center', alignItems: 'center'}}>

            {showSelectAdventurePopup && <SelectAdventurePopup popupData={popupData} setShowSelectAdventurePopup={setShowSelectAdventurePopup} activeId={activeId}/>}

        <View style={{flex: 1, backgroundColor: '#FDFDFD', alignItems: 'center', overflowY: 'auto', filter: showSelectAdventurePopup ? 'brightness(0.3) grayscale(0.4)' : 'none', pointerEvents: showSelectAdventurePopup ? 'none' : 'auto'}}>

            <Navbar tabName={"Adventures"} currencyAmount={103}/>
            <CatSelectNavbar />

            <View style={{flex: 1, width: '88%', alignItems: 'center', marginTop: 40}}>

                <View style={{flexDirection: 'row', width: '100%', marginLeft: 4, marginBottom: 12, alignItems: 'center'}}>
                    <Key />
                    <Text style={styles.section_text}>Your Embarked Adventures</Text>
                </View>

                <EmbarkedAdventure refresh={showSelectAdventurePopup} adventureSet={adventureSet}/>

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
                        key={adventure.cid} 
                        category={adventure.name} 
                        id={adventure.cid} 
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
                            <CategoryAdventure path={pathdata} categoryData={categoryData?.adventureStatus[index]} isLastAdventure={index == adventureSet[activeId].paths.length - 1} setShowSelectAdventurePopup={setShowSelectAdventurePopup} setPopupData={setPopupData} />
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
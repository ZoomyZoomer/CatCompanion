import { Image, ImageSourcePropType, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { useState, useEffect } from "react"

import StarFilledLight from '@/assets/svgs/star_filled.svg'
import StarEmptyLight from '@/assets/svgs/star_empty.svg'
import StarFilledDark from '@/assets/svgs/star_filled_dark.svg'
import StarEmptyDark from '@/assets/svgs/star_empty_dark.svg'

const Stamp = require('@/assets/pngs/stamp.png');

import axios from 'axios'


import AdventureLine from "./AdventureLine";
import React = require("react");

type categoryPath = {
        cpid: number;
        name: string,
        desc: string,
        difficulty: number,
        Icon: ImageSourcePropType,
        optionsLabels: Object[],
        options: Object[]
    }

type CategoryAdventureTypes = {
    path: categoryPath;
    isLastAdventure: boolean,
    categoryData: any
    setShowSelectAdventurePopup: (arg: (arg: boolean) => (boolean)) => (void);
    setPopupData: (arg: object) => (void)
}

const CategoryAdventure = ({path, categoryData, isLastAdventure, setShowSelectAdventurePopup, setPopupData} : CategoryAdventureTypes) => {

    const [status, setStatus] = useState(0); // 0 -> Active; 1 -> Completed; 2 -> Available; 3 -> Locked

    useEffect(() => {
        if (categoryData?.status === 'Active'){
            setStatus(0);
        } else if (categoryData?.status === 'Completed'){
            setStatus(1);
        } else if (categoryData?.status === 'Available'){
            setStatus(2);
        } else {
            setStatus(3);
        }
    }, [categoryData])

    return (
        <TouchableOpacity style={{width: '100%', justifyContent: 'center', alignItems: 'center'}} onPress={() => {setPopupData(path); setShowSelectAdventurePopup(prev => !prev)}}>

            <View style={[styles.adventure_container, {borderColor: (status <= 2) ? '#FCAD72' : '#CDD8EA'}]}>

                <View style={[styles.adventure_banner, {backgroundColor: (status <= 2) ? '#FCAD72' : '#E4E7EC'}]}>
                    <View style={styles.adventure_circle}>
                        <Image source={path?.Icon} style={(status <= 2) ? styles.banner_icon_active : styles.banner_icon}/>
                    </View>
                </View>

                <View style={{width: '78%', flexDirection: 'row', alignItems: 'center'}}>

                    <View style={{marginLeft: 20, justifyContent: 'center', width: '75%', boxSizing: 'border-box'}}>

                        <Text style={styles.adventure_title}>{path?.name}</Text>
                        <Text style={styles.adventure_desc}><strong>Includes: </strong> {path?.desc}</Text>

                        <View style={[styles.adventure_tag, {backgroundColor: status <= 2 ? '#FCAD72' : '#E4E7EC'}]}>
                            <Text style={[styles.adventure_tag_text, {color: status <= 2 ? 'white' : '#7C889A'}]}>Difficulty: </Text>
                            <View style={{ flexDirection: 'row', gap: 2, justifyContent: 'center', alignItems: 'center'}}>
                                {Array.from({ length: 5 }).map((_, index) =>
                                index < path?.difficulty ? (
                                    status <= 2 ? <StarFilledLight key={index} style={styles.stars}/> : <StarFilledDark key={index} style={styles.stars}/>
                                ) : (
                                    status <= 2 ? <StarEmptyLight key={index} style={styles.stars}/> : <StarEmptyDark key={index} style={styles.stars}/>
                                )
                                )}
                            </View>
                        </View>

                    </View>
                    
                    <View style={{width: '25%', marginLeft: -22, height: '100%', alignItems: 'center', marginTop: 30}}>
                        <Image source={Stamp} style={status <= 2 ? styles.stamp_active : styles.stamp_inactive} />
                    </View>

                </View>

            </View>

            {!isLastAdventure && <AdventureLine status={status}/>}

        </TouchableOpacity>
    )
}

export default CategoryAdventure

const styles = StyleSheet.create({
    adventure_container: {
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: '0.8rem',
        flexDirection: 'row',
        position: 'relative',
        width: '100%',
        height: 115,
        marginTop: 14
    },
    adventure_banner: {
        height: '100%',
        width: '22%',
        borderTopLeftRadius: '0.8rem',
        borderBottomLeftRadius: '0.8rem',
        justifyContent: 'center',
        alignItems: 'center'
    },
    adventure_circle: {
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        height: 54,
        width: 54,
        borderRadius: 54
    },
    adventure_title: {
        color: '#7C889A',
        fontWeight: '500',
        fontSize: 12
    },
    banner_icon_active: {
        height: 36,
        width: 36
    },
    banner_icon: {
        height: 32,
        width: 32,
        filter: 'grayscale(0.5)'
    },
    adventure_desc: {
        color: '#C8C4C3',
        fontSize: 10,
        marginTop: 4,
        width: '90%'
    },
    adventure_tag: {
        borderStyle: 'solid',
        borderRadius: '0.8rem',
        width: '74%',
        height: 24,
        marginTop: 12,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    adventure_tag_text: {
        fontSize: 10,
        marginLeft: 6,
    },
    stars: {
        height: 12,
        width: 12
    },
    stamp_active: {
        height: 40,
        width: 40
    },
    stamp_inactive: {
        height: 40,
        width: 40,
        filter: 'grayscale(1)'
    }
})
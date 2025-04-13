import { Image, ImageSourcePropType, StyleSheet, Text, View } from "react-native"
import React, { useState, useEffect } from "react"
import StarFilledLight from '@/assets/svgs/star_filled.svg'
import StarEmptyLight from '@/assets/svgs/star_empty.svg'
import axios from 'axios'

type categoryPath = {
        cp_id: number;
        name: string,
        desc: string,
        difficulty: number,
        Icon: ImageSourcePropType
    }

type CategoryAdventureTypes = {
    isOngoing: boolean;
    isCompleted: boolean;
    isAvailable: boolean;
    path: categoryPath;
}

const CategoryAdventure = ({isOngoing, isCompleted, isAvailable, path} : CategoryAdventureTypes) => {

    const [status, setStatus] = useState(0);

    useEffect(() => {
        const res = axios.get('http://http://localhost:8081/api/')
    }, [])

    return (
        <View style={[styles.adventure_container, {borderColor: (isOngoing || isCompleted || isAvailable) ? '#FCAD72' : '#CDD8EA'}]}>

            <View style={[styles.adventure_banner, {backgroundColor: (isOngoing || isCompleted || isAvailable) ? '#FCAD72' : '#E4E7EC'}]}>
                <View style={styles.adventure_circle}>
                <   Image source={path.Icon} style={(isOngoing || isCompleted || isAvailable) ? styles.banner_icon_active : styles.banner_icon}/>
                </View>
            </View>

            <View style={{width: '78%', flexDirection: 'row', alignItems: 'center'}}>

                <View style={{marginLeft: 20, justifyContent: 'center', width: '75%', boxSizing: 'border-box'}}>

                    <Text style={styles.adventure_title}>{path.name} · {isCompleted ? 'Completed' : (isOngoing ? 'Active' : (isAvailable ? 'Available' : 'Locked'))}</Text>
                    <Text style={styles.adventure_desc}><strong>Includes: </strong> {path.desc}</Text>

                    <View style={styles.adventure_tag}>
                        <Text style={styles.adventure_tag_text}>Difficulty: </Text>
                        <View style={{ flexDirection: 'row', gap: 2, marginLeft: 4 }}>
                            {Array.from({ length: 5 }).map((_, index) =>
                            index < path.difficulty ? (
                                <StarFilledLight key={index}/>
                            ) : (
                                <StarEmptyLight key={index}/>
                            )
                            )}
                        </View>
                    </View>

                </View>
                
                <View style={{width: '25%', marginLeft: -20, height: '100%', alignItems: 'center'}}>
                    
                </View>

            </View>

        </View>
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
        height: 130
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
        height: 60,
        width: 60,
        borderRadius: 60
    },
    adventure_title: {
        color: '#7C889A',
        fontWeight: '500',
        fontSize: 14,
        fontFamily: 'Poppins'
    },
    banner_icon_active: {
        height: 36,
        width: 36
    },
    banner_icon: {
        height: 36,
        width: 36,
        filter: 'grayscale(0.5)'
    },
    adventure_desc: {
        color: '#C8C4C3',
        fontSize: 12,
        marginTop: 4,
        width: '70%',
        fontFamily: 'Poppins'
    },
    adventure_tag: {
        borderColor: '#FCAD72',
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: '0.8rem',
        backgroundColor: '#FCAD72',
        width: '70%',
        height: 24,
        marginTop: 12,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        paddingLeft: 10,
        paddingRight: 10,
    },
    adventure_tag_text: {
        color: 'white',
        fontSize: 12,
        marginLeft: 6,
        fontFamily: 'Poppins'
    },
})
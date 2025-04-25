import React, { useRef, useState } from "react"
import { Animated, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Mood from "./Mood"

import Gallery from '@/assets/svgs/gallery.svg'
import Expand from '@/assets/svgs/expand.svg'
import Shrink from '@/assets/svgs/shrink.svg'
import Notes from '@/assets/svgs/notes_gray.svg'
import Trash from '@/assets/svgs/trash.svg'
import Edit from '@/assets/svgs/edit.svg'
import Heart from '@/assets/svgs/heart.svg'

const DailyMood = () => {

    const [expanded, setExpanded] = useState(false);
    const animatedHeight = useRef(new Animated.Value(40)).current;

    const toggleExpand = () => {
        Animated.timing(animatedHeight, {
            toValue: expanded ? 40 : 150, // adjust values as needed
            duration: 300,
            useNativeDriver: false
        }).start();
    
        setExpanded(!expanded);
    };
    

    return (
        <View style={{width: '100%', marginTop: 30}}>

            <View style={{marginBottom: 6, position: 'relative', width: '100%'}}>
                <Text style={{color: '#52637D', fontWeight: 500, marginLeft: 4}}>April 23</Text>
                <View style={{position: 'absolute', right: 4, flexDirection: 'row'}}>
                    <TouchableOpacity style={{marginRight: 6}}><Heart /></TouchableOpacity>
                    <TouchableOpacity style={{marginRight: 6}}><Edit /></TouchableOpacity>
                    <TouchableOpacity><Trash /></TouchableOpacity>
                </View>
            </View>

            <View style={styles.daily_mood_container}>
                
                <View style={styles.daily_mood_left}>

                    <View>

                        <View style={styles.daily_mood_circle}>
                            <Image source={require('@/assets/cats/glasses_cat.png')} style={styles.mood_image}/>
                        </View>
                        <View style={styles.mood}>
                            <Text style={{color: 'white', fontWeight: 400, fontSize: 10}}>Indifferent</Text>
                        </View>

                    </View>

                </View>

                <View style={styles.separator}/>

                <View style={styles.daily_mood_right}>
                    <View style={{flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: 'center', height: '100%'}}>
                        <Mood />
                        <Mood />
                        <Mood />
                    </View>
                </View>

            </View>

            <Animated.View style={[styles.attachments_cont, { height: animatedHeight }]}>
                <TouchableOpacity 
                    style={{flex: 1}} 
                    onPress={toggleExpand}
                >
                    <View style={{flexDirection: 'row', alignItems: expanded ? 'flex-start' : 'center'}}>
                        <Gallery />
                        <Text style={{ color: '#8B93A0', marginLeft: 6 }}>my_cat.png</Text>
                    </View>

                    <View style={{ position: 'absolute', right: 10, bottom: 0, alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
                        <Text style={{ color: '#8B93A0', marginRight: 6, fontSize: 12 }}>{expanded ? 'Shrink' : 'Expand'}</Text>
                        {expanded ? <Shrink /> : <Expand />}
                    </View>

                    {expanded && 
                    <View style={{width: '100%', flex: 1, flexDirection: 'row', marginTop: 10}}>
                        <View style={styles.image_cont}>  
                            <Image />
                        </View>
                        <View style={{marginLeft: 10}}>
                            <Text style={styles.caption}>
                            “I didn’t really have a picture of a cat, so I just put 
                            this cute anime image.”
                            <br />
                            <Text style={{fontWeight: 300, fontSize: 10}}>- April 23, 2025</Text>
                            </Text>
                        </View>
                    </View>
                    }

                </TouchableOpacity>
            </Animated.View>


        </View>
    )
}

export default DailyMood

const styles = StyleSheet.create({
    daily_mood_container: {
        borderWidth: 1,
        borderColor: '#CDD8EA',
        borderRadius: 8,
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 0,
        borderBottomWidth: 0,
        width: '100%',
        flexDirection: 'row',
        backgroundColor: 'white',
        padding: 12
    },
    daily_mood_left: {
        width: '27%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    daily_mood_right: {
        flex: 1,
        height: '100%',
        alignItems: 'center',
    },
    daily_mood_circle: {
        backgroundColor: '#FFE3CE',
        height: 70,
        width: 70,
        borderRadius: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    mood: {
        backgroundColor: '#FCAD72',
        width: '100%',
        height: 22,
        borderRadius: 16,
        marginTop: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    mood_image: {
        height: '65%',
        width: '75%'
    },
    separator: {
        backgroundColor: '#D9D9D9',
        height: '100%',
        width: 1,
        marginRight: 14,
        marginLeft: 14
    },
    attachments_cont: {
        borderWidth: 1,
        borderColor: '#CDD8EA',
        borderBottomRightRadius: 8,
        borderBottomLeftRadius: 8,
        borderStyle: 'dashed',
        padding: 10,
        flexDirection: 'row',
        backgroundColor: 'white',
        position: 'relative'
    },
    image_cont: {
        borderWidth: 1,
        borderColor: '#D9D9D9',
        borderRadius: 8,
        width: '40%',
        backgroundColor: '#FCFCFC'
    },
    caption: {
        color: '#8B93A0',
        width: '44%',
        flexWrap: 'wrap',
        flexDirection:  'row',
        fontSize: 12
    },
    notes_icon: {
        marginBottom: -4,
        marginRight: 4
    }
})
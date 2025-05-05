import React, { useRef, useState } from "react"
import { Animated, Easing, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Mood from "./Mood"

import Gallery from '@/assets/svgs/gallery.svg'
import Expand from '@/assets/svgs/expand.svg'
import Shrink from '@/assets/svgs/shrink.svg'
import Notes from '@/assets/svgs/notes_gray.svg'
import Trash from '@/assets/svgs/trash.svg'
import Edit from '@/assets/svgs/edit.svg'
import Heart from '@/assets/svgs/heart.svg'
import HeartFilled from '@/assets/svgs/heart_filled.svg'

const DailyMood = ({ mood } : any) => {

    const [expanded, setExpanded] = useState(false);
    const animatedHeight = useRef(new Animated.Value(40)).current;

    const formattedDate = new Intl.DateTimeFormat('en-US', {
        month: 'long', // full month name
        day: '2-digit', // day as two digits
      }).format(new Date(mood.date));

    const catMap = {
        'Upset': require('@/assets/cats/angry_cat.png'),
        'Sad': require('@/assets/cats/sad_cat.png'),
        'Okay': require('@/assets/cats/okay_cat.png'),
        'Happy': require('@/assets/cats/happy_cat.png')
    }

    const toggleExpand = () => {
        Animated.timing(animatedHeight, {
            toValue: expanded ? 40 : 150, // adjust values as needed
            duration: 300,
            useNativeDriver: false
        }).start();
    
        setExpanded(!expanded);
    };

    const [liked, setLiked] = useState(false);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handleHeartPress = () => {
    setLiked(prev => !prev);

    // Trigger the heartbeat animation
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.4,
        duration: 150,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 150,
        easing: Easing.in(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Optional: reset liked back to false after animation
      // setLiked(false);
    });
  };
    

    return (
        <View style={{width: '100%', marginTop: 30}}>

            <View style={{ marginBottom: 6, position: "relative", width: "100%" }}>
                <Text style={{ color: "#52637D", fontWeight: "500", marginLeft: 4 }}>
                    {formattedDate}
                </Text>
                <View style={{ position: "absolute", right: 4, flexDirection: "row" }}>
                    <TouchableOpacity onPress={handleHeartPress} style={{ marginRight: 6 }}>
                    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
                        {liked ? <HeartFilled /> : <Heart />}
                    </Animated.View>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ marginRight: 6 }}>
                    <Edit />
                    </TouchableOpacity>
                    <TouchableOpacity>
                    <Trash />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.daily_mood_container}>
                
                <View style={styles.daily_mood_left}>

                    <View>

                        <View style={styles.daily_mood_circle}>
                            <Image source={catMap[mood.mood]} style={styles.mood_image}/>
                        </View>
                        <View style={styles.mood}>
                            <Text style={{color: 'white', fontWeight: 500, fontSize: 12}}>{mood.mood}</Text>
                        </View>

                    </View>

                </View>

                <View style={styles.separator}/>

                <View style={styles.daily_mood_right}>
                    <View style={{flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: 'center', height: '100%'}}>
                        {mood.logItems.map((item : any) => (
                            <Mood item={item}/>
                        ))}
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
                        <Text style={{ color: '#8B93A0', marginLeft: 6 }}>daily_photo.png</Text>
                    </View>

                    <View style={{ position: 'absolute', right: 10, bottom: 0, alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
                        <Text style={{ color: '#8B93A0', marginRight: 6, fontSize: 12 }}>{expanded ? 'Shrink' : 'Expand'}</Text>
                        {expanded ? <Shrink /> : <Expand />}
                    </View>

                    {expanded && 
                    <View style={{width: '100%', flex: 1, flexDirection: 'row', marginTop: 10}}>
                        <View style={styles.image_cont}>  
                            <Image source={mood.imageUri} style={styles.image_style}/>
                        </View>
                        <View style={{marginLeft: 10}}>
                            <Text style={styles.caption}>
                            "{mood.caption}"
                            <Text style={{fontWeight: 300, fontSize: 10}}></Text>
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
        height: '75%',
        width: '85%',
        resizeMode: 'contain',
        marginTop: 10
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
        backgroundColor: '#FCFCFC',
        justifyContent: 'center',
        alignItems: 'center'
    },
    caption: {
        color: '#8B93A0',
        width: 200,
        flexWrap: 'wrap',
        flexDirection:  'row',
        fontSize: 12
    },
    notes_icon: {
        marginBottom: -4,
        marginRight: 4
    },
    image_style: {
        height: '90%',
        width: '90%',
        resizeMode: 'contain'
    }
})
import React, { useEffect, useRef, useState } from "react"
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
import AddCircle from '@/assets/svgs/add-circle.svg'

const DailyMood = ({ mood, setIsPickingMood, setIsDeletingMood, setRelDate, setIsTimeTraveling } : any) => {

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

  const scaleAnim2 = useRef(new Animated.Value(0.7)).current;


  useEffect(() => {
    const animate = Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim2, {
          toValue: 1.4,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim2, {
          toValue: 0.7,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );

    animate.start();
  }, [scaleAnim2]);

  const scaleAnim3 = useRef(new Animated.Value(0.7)).current;


  useEffect(() => {
    setTimeout(() => {
        const animate = Animated.loop(
            Animated.sequence([
              Animated.timing(scaleAnim3, {
                toValue: 1.4,
                duration: 1000,
                easing: Easing.inOut(Easing.ease),
                useNativeDriver: true,
              }),
              Animated.timing(scaleAnim3, {
                toValue: 0.7,
                duration: 1000,
                easing: Easing.inOut(Easing.ease),
                useNativeDriver: true,
              }),
            ])
          );
      
          animate.start();
    }, (400))
  }, [scaleAnim3])

  const [isToday, setIsToday] = useState(false);

  useEffect(() => {
    const date = new Date();
    const refDate = new Date(mood.date);
    if ((refDate.getDate() === date.getDate()) && (refDate.getMonth() === date.getMonth()) && refDate.getFullYear() === date.getFullYear()){
        setIsToday(true);
    } else {
        setIsToday(false);
    }
  }, [mood])

  const handleClickMood = () => {

    const date = new Date();
    const refDate = new Date(mood.date);

    if ((refDate.getDate() === date.getDate()) && (refDate.getMonth() === date.getMonth()) && refDate.getFullYear() === date.getFullYear()){
        setIsPickingMood(true)
    } else {
        setIsTimeTraveling(true);
    }

  }
    

    return (
        <View style={{width: '100%', marginTop: 30}}>

            <View style={{ marginBottom: 6, position: "relative", width: "100%" }}>
                <Text style={{ color: isToday ? '#FCAD72' : "#52637D", fontWeight: "500", marginLeft: 4 }}>
                    {isToday ? `${formattedDate} · Today` : formattedDate}
                </Text>
                <View style={{ position: "absolute", right: 4, flexDirection: "row" }}>
                    <TouchableOpacity onPress={handleHeartPress} style={{ marginRight: 6 }}>
                    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
                        {liked ? <HeartFilled /> : <Heart />}
                    </Animated.View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {setRelDate(mood.date); setIsDeletingMood(true)}}>
                        <Trash />
                    </TouchableOpacity>
                </View>
            </View>

            <TouchableOpacity style={styles.daily_mood_container} onPress={() => handleClickMood()}>
                
                <View style={styles.daily_mood_left}>

                    <View>

                        <View style={[styles.daily_mood_circle, {backgroundColor: isToday ? '#FFE3CE' : '#E8ECF1'}]}>
                            <Image source={catMap[mood.mood]} style={styles.mood_image}/>

                            {isToday &&(
                                <>
                                <Animated.View style={[styles.circle1, {left: -4, transform: [{scale: scaleAnim2}]}]}/>
                                <Animated.View style={[styles.circle1, {bottom: 18, right: -6, transform: [{scale: scaleAnim3}]}]}/>

                                <Animated.View style={[styles.circle2, {top: 2, left: -6, transform: [{scale: scaleAnim3}]}]}/>
                                <Animated.View style={[styles.circle2, {right: -12, transform: [{scale: scaleAnim2}]}]}/>
                                </>
                            )}

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
                            <Mood item={item} isToday={isToday}/>
                        ))}
                    </View>
                </View>

            </TouchableOpacity>

            <Animated.View style={[styles.attachments_cont, { height: animatedHeight }]}>
                <TouchableOpacity 
                    style={{flex: 1}} 
                    onPress={toggleExpand}
                >
                    <View style={{flexDirection: 'row', alignItems: expanded ? 'flex-start' : 'center'}}>
                        <Gallery />
                        <Text style={{ color: '#8B93A0', marginLeft: 6 }}>{mood.imageUri ? 'daily_photo.png' : 'No attachment'}</Text>
                    </View>

                    <View style={{ position: 'absolute', right: 10, bottom: 0, alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
                        <Text style={{ color: '#8B93A0', marginRight: 6, fontSize: 12 }}>{mood.imageUri ? (expanded ? 'Shrink' : 'Expand') : 'Add photo'}</Text>
                        {mood.imageUri ? (expanded ? <Shrink /> : <Expand />) : <AddCircle />}
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
        borderColor: '#D9D9D9',
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
        borderColor: '#D9D9D9',
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
        backgroundColor: '#FCFCFC',
        justifyContent: 'center',
        alignItems: 'center',
        aspectRatio: 1,
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
    },
    circle1: {
        height: 10,
        width: 10,
        borderRadius: 10,
        backgroundColor: '#FFE3CE',
        position: 'absolute',
        bottom: 10
    },
    circle2: {
        height: 16,
        width: 16,
        borderRadius: 16,
        backgroundColor: '#FFE3CE',
        position: 'absolute',
        top: 10
    }
})
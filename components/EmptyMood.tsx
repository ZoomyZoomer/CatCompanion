import React, { useEffect, useRef } from "react"
import { Animated, Easing, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"

import Star from '@/assets/svgs/star_filled.svg'
import Gallery from '@/assets/svgs/gallery.svg'

const EmptyMood = ({ date, moodDate, setIsTimeTraveling, month, day} : any) => {

    const entryScale = useRef(new Animated.Value(1)).current

    useEffect(() => {
      Animated.sequence([
        Animated.timing(entryScale, {
          toValue: 1.075,
          duration: 200,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(entryScale, {
          toValue: 1,
          duration: 200,
          easing: Easing.in(Easing.ease),
          useNativeDriver: true,
        }),
      ]).start()
    }, [entryScale, date])

    const handlePress = () => {
        moodDate.current = new Date(date);
        setIsTimeTraveling(true);
    }

    return (

        <Animated.View
              style={{
                width: '100%',
                marginTop: 30,
                transform: [{ scale: entryScale }],
              }}
        >

        <View style={{ marginBottom: 6, position: "relative", width: "100%" }}>
        <Text style={{ color: "#52637D", fontWeight: "500", marginLeft: 4 }}>
          {`${month} ${day}`}
        </Text>
      </View>

        <TouchableOpacity style={styles.daily_mood_container} onPress={() => handlePress()}>

            <View style={styles.daily_mood_left}>
                <View style={[styles.daily_mood_circle, { backgroundColor: '#E8ECF1' }]}>
                    <Image source={require('@/assets/cats/no_cat.png')} style={styles.mood_image}/>
                </View>
                <View style={styles.mood}>
                    <Text style={{ color: '#798AA3', fontWeight: '500', fontSize: 12 }}>
                        Unknown
                    </Text>
                </View>
            </View>

            <View style={styles.separator}/>

            <View style={styles.daily_mood_right}>
                <View style={{flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: 'center', height: '100%'}}>

                    <View style={styles.mood_container}>
                        <View style={[styles.mood_circle, {backgroundColor: '#E8ECF1'}]}>
                            
                        </View>
                        <View style={styles.mood_rating}>
                            <Text style={{color: '#798AA3', fontSize: 10, fontWeight: 500, marginRight: 2}}>0</Text>
                            <Star fill={'#798AA3'} style={styles.star}/>
                        </View>
                    </View>

                    <View style={styles.mood_container}>
                        <View style={[styles.mood_circle, {backgroundColor: '#E8ECF1'}]}>
                            
                        </View>
                        <View style={styles.mood_rating}>
                            <Text style={{color: '#798AA3', fontSize: 10, fontWeight: 500, marginRight: 2}}>0</Text>
                            <Star fill={'#798AA3'} style={styles.star}/>
                        </View>
                    </View>

                    <View style={styles.mood_container}>
                        <View style={[styles.mood_circle, {backgroundColor: '#E8ECF1'}]}>
                            
                        </View>
                        <View style={styles.mood_rating}>
                            <Text style={{color: '#798AA3', fontSize: 10, fontWeight: 500, marginRight: 2}}>0</Text>
                            <Star fill={'#798AA3'} style={styles.star}/>
                        </View>
                    </View>

                </View>
            </View>

        </TouchableOpacity>

        <View style={styles.attachments_cont}>
            <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Gallery />
                <Text style={{ color: '#8B93A0', marginLeft: 6 }}>
                    No attachment
                </Text>
            </View>
            <View style={{
                position: 'absolute',
                right: 10,
                bottom: 0,
                flexDirection: 'row',
                alignItems: 'center'
            }}>
                <Text style={{ color: '#8B93A0', marginRight: 6, fontSize: 12 }}>
                
                </Text>
                
            </View>
            </View>
        </View>

        </Animated.View>
    )
}

export default EmptyMood

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
    alignItems: 'center',
  },
  daily_mood_circle: {
    height: 70,
    width: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center'
  },
  mood: {
    backgroundColor: '#E8ECF1',
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
    marginHorizontal: 14
  },
  mood_container: {
        borderWidth: 1,
        borderColor: '#D9D9D9',
        borderRadius: 8,
        backgroundColor: '#FCFCFC',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
        margin: 4
    },
    mood_circle: {
        backgroundColor: '#FFE3CE',
        borderRadius: '100%',
        height: 38,
        width: 38,
        justifyContent: 'center',
        alignItems: 'center'
    },
    mood_rating: {
        backgroundColor: '#E8ECF1',
        borderRadius: 8,
        width: '100%',
        marginTop: 12,
        height: 16,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    image: {
        height: 28,
        width: 28,
        marginTop: 4,
        resizeMode: 'contain'
    },
    star: {
        height: 12,
        width: 12
    },
    attachments_cont: {
    borderWidth: 1,
    borderColor: '#D9D9D9',
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
    borderStyle: 'dashed',
    padding: 10,
    backgroundColor: 'white',
  }
})
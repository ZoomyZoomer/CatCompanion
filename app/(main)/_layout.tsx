import { Tabs } from 'expo-router';
import { FontAwesome5, Feather } from '@expo/vector-icons';
import { View, TouchableOpacity, StyleSheet, Animated, Dimensions, Easing, Platform } from 'react-native';
import React, { useRef, useState, useEffect } from 'react';
import { useMood } from '@/context/MoodContext';
import axios from 'axios';

import Pencil from '@/assets/svgs/pencil.svg'


const { width } = Dimensions.get('window');
const TAB_COUNT = 5;
const TAB_WIDTH = width / TAB_COUNT;

export default function Layout() {
  const [isPickingMood, setIsPickingMood] = useState(false); // Lift the state here

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => <CustomTabBar {...props} setIsPickingMood={setIsPickingMood} />} // Pass setter to CustomTabBar
    >
      <Tabs.Screen
        name="logs"
        initialParams={{ isPickingMood, setIsPickingMood }}  // Pass the state as initialParams
      />
      <Tabs.Screen name="adventures" />
      <Tabs.Screen name="add" />
      <Tabs.Screen name="notifications" />
      <Tabs.Screen name="settings" />
    </Tabs>
  );
}


function PlusButtonWithEffects({ setIsPickingMood }: { setIsPickingMood: React.Dispatch<React.SetStateAction<boolean>> }) {

  const [isEffectActive, setIsEffectActive] = useState(true); // State to control animation visibility
  const circles = Array.from({ length: 10 }).map(() => useRef(new Animated.Value(0)).current); // 10 circles

  const fetchMoodStatus = async() => {
    const res = await axios.get('http://10.0.0.216:5000/fetchMoodStatus', {
      params: {
        uid: 0
      }
    })

    setIsEffectActive(!res.data);
  }

  useEffect(() => {
    fetchMoodStatus();
  },[])

  useEffect(() => {
    if (isEffectActive) {
      circles.forEach((anim, index) => {
        Animated.loop(
          Animated.sequence([
            Animated.timing(anim, {
              toValue: 1,
              duration: 1600, // slower animation
              delay: index === 0 ? 0 : 200 * index, // Shorter delay, less wait time between circles
              useNativeDriver: true,
              easing: Easing.out(Easing.quad),  // Smooth easing function
            }),
            Animated.timing(anim, {
              toValue: 0,
              duration: 0,
              useNativeDriver: true,
            }),
          ])
        ).start();
      });
    }
  }, [isEffectActive]);

  const renderCircle = (anim: Animated.Value, direction: 'left' | 'right', i: number) => {
    const moveX = anim.interpolate({
      inputRange: [0, 0.3, 0.6, 1],
      outputRange: [
        direction === 'left' ? 10 : 10, 
        direction === 'left' ? -30 : 30, 
        direction === 'left' ? -26 : 26, 
        0, 
      ],
    });

    const moveY = anim.interpolate({
      inputRange: [0, 0.3, 0.6, 1],
      outputRange: [0, -26, -50, -50], 
    });

    const opacity = anim.interpolate({
      inputRange: [0, 0.3, 1],
      outputRange: [0, 0.6, 0], 
    });

    const scale = anim.interpolate({
      inputRange: [0, 0.3, 1],
      outputRange: [2, 0.8, 0], 
    });

    return (
      <Animated.View
        key={i}
        style={[styles.effectCircle, {
          transform: [
            { translateX: moveX },
            { translateY: moveY },
            { scale },
          ],
          opacity,
        }]}/>
    );
  };

  return (
    <View style={styles.plusButtonWrapper}>
      {isEffectActive && circles.map((anim, i) => renderCircle(anim, i % 2 === 0 ? 'left' : 'right', i))}
      <TouchableOpacity
        onPress={() => setIsPickingMood(prev => !prev)}
        style={styles.plusButton}
      >
        {isEffectActive ? <Feather name="plus" size={32} color="#fff" /> : <Pencil />}
      </TouchableOpacity>
    </View>
  );
}


function CustomTabBar({ state, descriptors, navigation } : any) {
  const translateX = useRef(new Animated.Value(0)).current;
  const { setIsPickingMood, isPickingMood } = useMood();

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: state.index * TAB_WIDTH,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [state.index]);

  return (
    <View style={[styles.tabContainer, {zIndex: isPickingMood ? -1 : 0, filter: (isPickingMood) ? 'brightness(0.3) grayscale(0.4)' : 'none', pointerEvents: (isPickingMood) ? 'none' : 'auto'}]}>
      <Animated.View style={[styles.indicator, { transform: [{ translateX }] }]} />
      {state.routes.map((route : any, index : any) => {
        const isFocused = state.index === index;
        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const iconColor = isFocused ? '#FCAD72' : '#AFAEAE';

        return route.name === 'add' ? (
          <PlusButtonWithEffects key={index} setIsPickingMood={setIsPickingMood} /> // Pass setter here
        ) : (
          <TouchableOpacity key={index} onPress={onPress} style={styles.tabButton}>
            <FontAwesome5
              name={
                route.name === 'logs'
                  ? 'home'
                  : route.name === 'adventures'
                  ? 'map'
                  : route.name === 'notifications'
                  ? 'bell'
                  : 'cog'
              }
              size={20}
              color={iconColor}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}



const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    position: 'absolute',
    width: '100%',
    bottom: 0,
    height: 70,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#CDD8EA',
    ...Platform.select({
      android: { elevation: 5 },
      ios: {
        shadowColor: '#7F5DF0',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
      },
    }),
    zIndex: 109
  },
  tabButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusButtonWrapper: {
    flex: 1,
    top: Platform.OS === 'android' ? -30 : -34,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  plusButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#FCAD72',
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicator: {
    position: 'absolute',
    top: -2,
    left: 0,
    width: TAB_WIDTH,
    height: 3,
    borderRadius: 2,
    backgroundColor: '#FCAD72',
  },
  effectCircle: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FCAD72',
    zIndex: -1,
  },
});

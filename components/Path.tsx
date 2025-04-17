import React, { useEffect, useRef, useState } from "react"
import { Animated, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"

import StopWatch from '@/assets/svgs/stopwatch.svg'

type PathProps = {
    id: boolean;
    currPath: boolean;
    setCurrPath: any;
    pathInfo: any
  };

const Path = ({id, currPath, setCurrPath, pathInfo} : PathProps) => {

    const pathColors = [
        {main: '#F074CF', tag: '#FEC1EE', bubble: '#FFE1F7', bg: '#FCFCFC'},
        {main: '#72BEFC', tag: '#A0D4FF', bubble: '#D6EDFF', bg: '#F6F9FB'}
    ]

    const colors = pathColors[pathInfo[0]?.colorId];
    const isActive = id === currPath;

  // Animated values
  const animation = useRef(new Animated.Value(isActive ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animation, {
      toValue: isActive ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [isActive]);

  const animatedStyle = {
    borderWidth: animation.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 2],
    }),
    borderColor: animation.interpolate({
      inputRange: [0, 1],
      outputRange: ['#CDD8EA', colors.main],
    }),
    transform: [
      {
        scale: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0.9, 1],
        }),
      },
    ],
    shadowOpacity: animation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 0.25],
    }),
    shadowRadius: animation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 8],
    }),
    zIndex: isActive ? 999 : 1,
    left: id
      ? animation.interpolate({
          inputRange: [0, 1],
          outputRange: [10, 20],
        })
      : undefined,
    right: !id
      ? animation.interpolate({
          inputRange: [0, 1],
          outputRange: [10, 20],
        })
      : undefined,
  };
  

    return (

        <Animated.View
            style={[
                id === currPath 
                ? (id ? styles.path_container_left_active : styles.path_container_right_active)
                : (id ? styles.path_container_left_inactive : styles.path_container_right_inactive),
                { backgroundColor: id === currPath ? colors?.bg : '#FFFBFE'},
                animatedStyle
            ]}
        >


        <TouchableOpacity style={{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'}} onPress={() => setCurrPath(id !== currPath ? id : currPath)}>

            <Text style={[styles.path_name, {color: colors?.main}]}>{pathInfo[0]?.label}</Text>

            <View style={[styles.path_circle, {backgroundColor: colors?.bubble}]}>
                <Image source={pathInfo[0]?.Icon} style={styles.path_image} resizeMode="contain"/>
            </View>

            <View style={{flexDirection: 'row', marginTop: 14, justifyContent: 'center', alignItems: 'center'}}>
                <StopWatch color={colors?.main} height={14} width={14}/>
                <Text style={{color: colors?.main, fontSize: 12, marginLeft: 4, fontWeight: 500}}>{pathInfo[0]?.duration} {pathInfo[0]?.type}</Text>
            </View>

            <View style={styles.tag_wrap}>
                {pathInfo[1]?.map((item: any, index: any) => (
                    <View style={[styles.tag, {backgroundColor: colors?.tag, marginLeft: index % 2 !== 0 ? 3 : 0}]}>
                        <Text style={{fontSize: 10, color: 'white'}}>{item.name}</Text>
                    </View>
                ))}
            </View>

            <View style={[styles.path_button, {backgroundColor: id === currPath ? colors?.main : '#E8ECF1'}]}>
               <Text style={{color: id === currPath ? 'white' : '#52637D', fontWeight: 500}}>{id === currPath ? 'Selected' : 'Inactive'}</Text>
            </View>

        </TouchableOpacity>

        </Animated.View>
    )
}

export default Path

const styles = StyleSheet.create({
    path_container_left_active: {
        borderWidth: 2,
        borderColor: '#F074CF',
        borderStyle: 'solid',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        height: '86%',
        position: 'absolute',
        zIndex: 999,
        left: 20,
        width: 180,
        padding: 10
    },
    path_container_left_inactive: {
        borderWidth: 1,
        borderColor: '#CDD8EA',
        borderStyle: 'dashed',
        backgroundColor: '#FFFBFE',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        height: '86%',
        position: 'absolute',
        zIndex: 999,
        left: 10,
        width: 180,
        padding: 10,
        transform: 'scale(0.9)',
        filter: 'grayscale(0.5)'
    },
    path_container_right_inactive: {
        borderWidth: 1,
        borderColor: '#CDD8EA',
        borderStyle: 'dashed',
        backgroundColor: '#F3F3F3',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        height: '86%',
        position: 'absolute',
        width: 180,
        right: 10,
        padding: 10,
        transform: 'scale(0.9)',
        filter: 'grayscale(0.5)'
    },
    path_container_right_active: {
        borderWidth: 2,
        borderColor: '#F074CF',
        borderStyle: 'solid',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        height: '86%',
        position: 'absolute',
        zIndex: 999,
        right: 20,
        width: 180,
        padding: 10
    },
    path_name: {
        fontWeight: 500,
        fontSize: 16
    },
    path_circle: {
        height: 70,
        width: 70,
        borderRadius: 70,
        marginTop: 6,
        justifyContent: 'center',
        alignItems: 'center'
    },
    path_image: {
        height: 56,
        width: 56
    },
    tag_wrap: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 4
    },
    tag: {
        paddingTop: 4,
        paddingBottom: 4,
        paddingRight: 10,
        paddingLeft: 10,
        borderRadius: 16,
        marginTop: 4,
        width: 'auto',
    },
    path_button: {
        width: '80%',
        height: 34,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        marginTop: 28
    }
})
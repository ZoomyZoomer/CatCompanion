import React, { useEffect, useRef } from "react"
import { Animated, Image, StyleSheet, Text, View } from "react-native"

import Star from '@/assets/svgs/star_filled_dark.svg'

const TierReward = ({ reward, currTier, index } : any) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (currTier === index) {
      Animated.sequence([
        Animated.spring(scaleAnim, {
          toValue: 1.15,
          friction: 3,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1.1,
          friction: 3,
          useNativeDriver: true,
        })
      ]).start();
    } else {
      // reset it back to 1 if deselected
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 3,
        useNativeDriver: true,
      }).start();
    }
  }, [currTier, index, scaleAnim]);

  return (
    <Animated.View 
      style={[
        styles.container, 
        { 
          borderStyle: currTier === index ? 'solid' : 'dashed',
          transform: [{ scale: currTier === index ? scaleAnim : 1 }]
        }
      ]}
    >
      <View style={[
        styles.circle, 
        {
          backgroundColor: currTier === index ? '#FFE3CE' : '#FAFAFA',
          borderColor: currTier === index ? '#FFE3CE' : '#D9D9D9'
        }
      ]}>
        <Image source={reward.icon} style={styles.icon}/>
      </View>
      <Text style={{color: '#52637D', fontWeight: '500', fontSize: 16, marginTop: 4}}>
        Tier {reward.tier}
      </Text>
      <View style={{flexDirection: 'row', marginTop: 0, justifyContent: 'center', alignItems: 'center', marginLeft: 4}}>
        <Text style={{color: '#52637D', fontSize: 12}}>{reward.cost}</Text>
        <Star height={14} width={14} style={{marginLeft: 2}}/>
      </View>
    </Animated.View>
  )
}

export default TierReward


const styles = StyleSheet.create({
    container: {
        borderColor: '#D9D9D9',
        borderWidth: 1,
        borderRadius: 12,
        borderStyle: 'dashed',
        padding: 14,
        paddingLeft: 16,
        paddingRight: 16,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        margin: 8
    },
    circle: {
        backgroundColor: '#FAFAFA',
        borderColor: '#D9D9D9',
        borderWidth: 1,
        borderRadius: '100%',
        height: 56,
        width: 56,
        justifyContent: 'center', 
        alignItems: 'center'
    },
    icon: {
        height: 38,
        width: 38,
        resizeMode: 'contain',
        marginTop: 4
    }
})
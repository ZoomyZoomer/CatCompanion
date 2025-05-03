import React, { useEffect, useState, useRef } from 'react';
import { Image, View, Text, StyleSheet, Easing } from 'react-native';
import { useSharedValue, withSequence, withTiming, useAnimatedStyle, withDelay } from 'react-native-reanimated';
import Reanimated from 'react-native-reanimated';

import StarFilled from '@/assets/svgs/star_filled.svg';
import StarEmpty from '@/assets/svgs/star_empty.svg';
import CustomSlider from './CustomSlider';

const RateItem = ({ item, ind, setRatings, ratings }: any) => {
  const [rating, setRating] = useState(ratings[ind]);
  const prevRating = useRef(0);

  const scale = useSharedValue(0.7);
  const imageScale = useSharedValue(1);

  useEffect(() => {
    scale.value = withSequence(
      withDelay(200 * ind, withTiming(1.05, { duration: 220, easing: Easing.out(Easing.ease) })),
      withTiming(1, { duration: 180, easing: Easing.out(Easing.ease) })
    );
  }, [scale, ind]);

  useEffect(() => {
    if (prevRating.current === 0 && rating > 0) {
      imageScale.value = withSequence(
        withTiming(1.2, { duration: 180, easing: Easing.out(Easing.ease) }),
        withTiming(1, { duration: 180, easing: Easing.out(Easing.ease) })
      );
    }
    prevRating.current = rating;
  }, [rating, imageScale]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const imageAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: imageScale.value }],
  }));

  return (
    <Reanimated.View style={[styles.item_container, animatedStyle]}>
      <View style={{ height: '100%', alignItems: 'center', alignSelf: 'flex-start', width: 64 }}>
        <View style={[styles.mood_circle, { backgroundColor: rating === 0 ? '#E8ECF1' : '#FFE3CE' }]}>
          <Reanimated.Image
            source={item?.itemIcon}
            style={[{ height: 36, width: 36, marginTop: 4 }, imageAnimatedStyle]}
          />
        </View>

        <Text style={{ color: rating === 0 ? '#52637D' : '#FCAD72', fontSize: 12 }}>{item?.itemName}</Text>
        <Text style={{ color: rating === 0 ? '#94A4BD' : '#FFCBA5', fontWeight: '400', fontSize: 8 }}>{item?.itemDesc}</Text>
      </View>

      <View style={{ height: '100%', marginLeft: 20, justifyContent: 'center' }}>
        <Text style={{ color: '#52637D', fontWeight: '500' }}>
          {item?.sentence?.map((val: any, ind: any) => {
            return val === 0 ? (
              <Text key={`name-${ind}`} style={{ marginLeft: 4, fontSize: 12 }}>{item?.itemName}</Text>
            ) : val === 1 ? (
              <Text
                key={`adj-${ind}`}
                style={{ color: '#FCAD72', textDecorationLine: 'underline', marginLeft: 4, fontSize: 12 }}
              >
                {rating > 0 ? item?.adjectives[rating - 1] : '?'}
              </Text>
            ) : (
              <Text key={`val-${ind}`} style={{ marginLeft: ind !== 0 ? 4 : 0, fontSize: 12 }}>{val}</Text>
            );
          })}
        </Text>

        <View style={{ marginTop: 10, alignSelf: 'flex-start' }}>
          <View style={{ flexDirection: 'row', marginBottom: -6, marginLeft: -2 }}>
            {[...Array(5)].map((_, index) => (
              <React.Fragment key={index}>
                {index < rating ? (
                  <StarFilled fill={'#FCAD72'} style={styles.starIcon} />
                ) : (
                  <StarEmpty stroke={'#FCAD72'} style={styles.starIcon} />
                )}
              </React.Fragment>
            ))}
          </View>

          <CustomSlider
            value={rating}
            onValueChange={(val) => {
              setRating(val);
              setRatings((prev:any) => {
                const newRatings = [...prev];
                newRatings[ind] = val;
                return newRatings;
              });
            }}
            minimumValue={0}
            maximumValue={5}
            step={1}
            trackHeight={7}
            thumbSize={16}
            trackColor="#E6E6E6"
            minimumTrackColor="#FCAD72"
            thumbColor="#FCAD72"
            style={{ marginTop: 12, width: 110, marginLeft: -8 }}
          />

        </View>
      </View>
    </Reanimated.View>
  );
};

const styles = StyleSheet.create({
  item_container: {
    borderWidth: 1,
    borderColor: '#CDD8EA',
    borderRadius: 8,
    borderStyle: 'solid',
    width: '100%',
    flexDirection: 'row',
    padding: 10,
    paddingLeft: 20,
    paddingBottom: 10,
    paddingRight: 6,
    marginTop: 16,
    backgroundColor: 'white',
  },
  mood_circle: {
    height: 50,
    width: 50,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  starIcon: {
    height: 16,
    width: 16,
  },
});

export default RateItem;

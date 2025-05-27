import React, { useState, useEffect } from "react";
import { Image, StyleSheet, Text, TextInput, View } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing, withDelay } from "react-native-reanimated";
import Chevron from '@/assets/svgs/chevron_down.svg';
import Checkmark from '@/assets/svgs/checkmark.svg'

const HabitForm = ({ setValidEntry }: any) => {

  const [habitName, setHabitName] = useState('');
  const [motivator, setMotivator] = useState('');

  // Animation values for Habit Name checkbox
  const fillAnimHabit = useSharedValue(30);
  const checkmarkScaleHabit = useSharedValue(0);

  // Animation values for Motivator checkbox
  const fillAnimMotivator = useSharedValue(30);
  const checkmarkScaleMotivator = useSharedValue(0);

  // Animate Habit Name checkbox
  useEffect(() => {
    if (habitName.length >= 5) {
      fillAnimHabit.value = withTiming(0, { duration: 400, easing: Easing.out(Easing.exp) });
      checkmarkScaleHabit.value = withDelay(200, withTiming(1, { duration: 150, easing: Easing.out(Easing.back(2)) }));
    } else {
      fillAnimHabit.value = withTiming(30, { duration: 200, easing: Easing.in(Easing.linear) });
      checkmarkScaleHabit.value = withTiming(0, { duration: 200 });
    }
  }, [habitName]);

  // Animate Motivator checkbox
  useEffect(() => {
    if (motivator.length >= 10) {
      fillAnimMotivator.value = withTiming(0, { duration: 400, easing: Easing.out(Easing.exp) });
      checkmarkScaleMotivator.value = withDelay(200, withTiming(1, { duration: 150, easing: Easing.out(Easing.back(2)) }));
    } else {
      fillAnimMotivator.value = withTiming(30, { duration: 200, easing: Easing.in(Easing.linear) });
      checkmarkScaleMotivator.value = withTiming(0, { duration: 200 });
    }
  }, [motivator]);

  // Valid entry check
  useEffect(() => {
    if (habitName.length >= 5 && motivator.length >= 10) {
      setValidEntry(true);
    } else {
      setValidEntry(false);
    }
  }, [habitName, motivator]);

  // Animated styles
  const fillStyleHabit = useAnimatedStyle(() => ({
    transform: [{ translateY: fillAnimHabit.value }]
  }));

  const checkmarkStyleHabit = useAnimatedStyle(() => ({
    transform: [{ scale: checkmarkScaleHabit.value }],
    opacity: checkmarkScaleHabit.value
  }));

  const fillStyleMotivator = useAnimatedStyle(() => ({
    transform: [{ translateY: fillAnimMotivator.value }]
  }));

  const checkmarkStyleMotivator = useAnimatedStyle(() => ({
    transform: [{ scale: checkmarkScaleMotivator.value }],
    opacity: checkmarkScaleMotivator.value
  }));

  return (
    <View style={{ width: '100%', padding: 30 }}>

      <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 30 }}>

        {/* Habit Name Field */}
        <View style={{ position: 'relative', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
          <TextInput
            style={styles.input}
            onChangeText={setHabitName}
            value={habitName}
            maxLength={20}
            placeholder="Play with my cat..."
            placeholderTextColor={'#D9D9D9'}
            underlineColorAndroid="transparent"
          />
          <View style={styles.invis}>
            <Text style={{ color: '#7C889A', marginBottom: -7, fontSize: 16 }}>Habit Name</Text>
          </View>

          <Image source={require('@/assets/cats/hanging_cat.png')} style={styles.cat} />

          {/* Habit Name Checkbox */}
          <View style={[styles.checkbox, { borderColor: habitName.length >= 5 ? '#FCAD72' : '#E8ECF1' }]}>
            <Animated.View style={[styles.fillCircle, fillStyleHabit]} />
            <Animated.View style={[styles.checkmarkContainer, checkmarkStyleHabit]}>
              <Checkmark width={16} height={16} />
            </Animated.View>
          </View>
        </View>

        {/* Motivator Field */}
        <View style={{ position: 'relative', width: '100%', marginTop: 40 }}>
          <TextInput
            style={[styles.input, { height: 120, paddingTop: 16 }]}
            onChangeText={setMotivator}
            value={motivator}
            maxLength={50}
            multiline={true}
            placeholder="I really like my cat..."
            placeholderTextColor={'#D9D9D9'}
            underlineColorAndroid="transparent"
          />
          <View style={[styles.invis, { width: 80 }]}>
            <Text style={{ color: '#7C889A', marginBottom: -7, fontSize: 16 }}>Motivator</Text>
          </View>

          {/* Motivator Checkbox */}
          <View style={[styles.checkbox, { borderColor: motivator.length >= 10 ? '#FCAD72' : '#E8ECF1', top: 16 }]}>
            <Animated.View style={[styles.fillCircle, fillStyleMotivator]} />
            <Animated.View style={[styles.checkmarkContainer, checkmarkStyleMotivator]}>
              <Checkmark width={16} height={16} />
            </Animated.View>
          </View>

           <Text style={[styles.num_char, {color: motivator.length >= 50 ? '#F2A9A9' : '#D9D9D9'}]}>{motivator.length}/{50} characters</Text>
          

        </View>

      </View>

    </View>
  );
};

export default HabitForm;

const styles = StyleSheet.create({
  input: {
    borderColor: '#E4E7EC',
    borderWidth: 1,
    width: '100%',
    height: 60,
    borderRadius: 8,
    backgroundColor: 'white',
    paddingLeft: 26,
    paddingRight: 60,
    fontSize: 16,
    color: '#52637D'
  },
  invis: {
    position: 'absolute',
    height: 20,
    width: 100,
    backgroundColor: '#FDFDFD',
    left: 20,
    top: -18,
    paddingLeft: 6,
    justifyContent: 'flex-end'
  },
  cat: {
    position: 'absolute',
    right: 20,
    bottom: '90%',
    height: 40,
    width: 50,
    resizeMode: 'contain'
  },
  checkbox: {
    position: 'absolute',
    right: 18,
    height: 26,
    width: 26,
    borderColor: '#E8ECF1',
    borderWidth: 1,
    borderRadius: 13,
    backgroundColor: '#F9F9F9',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center'
  },
  fillCircle: {
    position: 'absolute',
    height: 26,
    width: 26,
    borderRadius: 13,
    backgroundColor: '#FCAD72'
  },
  checkmarkContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center'
  },
  num_char: {
    position: 'absolute',
    right: 10,
    bottom: 4,
    fontSize: 12
}
});

import React, { useEffect, useRef, useState } from "react"
import { Animated, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import CustomSlider from "./CustomSlider";

const HabitAmount = ({ setValidEntry }: any) => {

  const [active, setActive] = useState('');
  const [amount, setAmount] = useState(0);
  const [time, setTime] = useState(0);

  useEffect(() => {
    if ((amount > 0) && (active.length > 0)) {
      setValidEntry(true);
    } else {
      setValidEntry(false);
    }
  }, [amount]);

  const quantityScale = useRef(new Animated.Value(1)).current;
  const timeScale = useRef(new Animated.Value(1)).current;

  const bounce = (scale: Animated.Value) => {
  Animated.sequence([
    Animated.timing(scale, {
      toValue: 0.95,
      duration: 80,
      useNativeDriver: true,
    }),
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 12,       // lower speed for gentler spring
      bounciness: 10,  // moderate bounciness
    }),
  ]).start();
};


  return (
    <View style={{ width: '100%', padding: 20, justifyContent: 'center', alignItems: 'center' }}>

      <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginTop: 30 }}>

        <TouchableOpacity
          onPress={() => {
            setActive('Quantity');
            bounce(quantityScale);
          }}
        >
          <Animated.View style={[styles.container, { 
            marginRight: 20, 
            borderColor: active === 'Quantity' ? '#FCAD72' : '#D9D9D9',
            transform: [{ scale: quantityScale }]
          }]}>
            <View style={[styles.circle, { backgroundColor: active === 'Quantity' ? '#FFE3CE' : '#E8ECF1' }]}>
              <Image source={require('@/assets/pngs/calculator.png')} style={styles.image} />
            </View>
            <View style={[styles.desc, { backgroundColor: active === 'Quantity' ? '#FCAD72' : 'white', borderColor: active === 'Quantity' ? '#FCAD72' : '#D9D9D9' }]}>
              <Text style={{ color: active === 'Quantity' ? 'white' : '#7C889A', fontWeight: '500' }}>Quantity</Text>
            </View>
          </Animated.View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setActive('Time');
            bounce(timeScale);
          }}
        >
          <Animated.View style={[styles.container, { 
            borderColor: active === 'Time' ? '#FCAD72' : '#D9D9D9',
            transform: [{ scale: timeScale }]
          }]}>
            <View style={[styles.circle, { backgroundColor: active === 'Time' ? '#FFE3CE' : '#E8ECF1' }]}>
              <Image source={require('@/assets/pngs/clock.png')} style={styles.image} />
            </View>
            <View style={[styles.desc, { backgroundColor: active === 'Time' ? '#FCAD72' : 'white', borderColor: active === 'Time' ? '#FCAD72' : '#D9D9D9' }]}>
              <Text style={{ color: active === 'Time' ? 'white' : '#7C889A', fontWeight: '500' }}>Time</Text>
            </View>
          </Animated.View>
        </TouchableOpacity>

      </View>

      <View style={styles.slider_container}>
        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: 'center', marginBottom: 16 }}>
          <View style={{ marginBottom: -5 }}>
            <Text style={{ color: '#FCAD72', fontSize: 36, fontWeight: '500' }}>{amount}</Text>
          </View>
          <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', height: '100%' }}>
            <Text style={{ color: '#FCAD72', fontSize: 14, marginLeft: 4 }}>{active === 'Quantity' ? 'units' : active === 'Time' ? 'minutes' : '???'}</Text>
          </View>
        </View>
        {active !== 'Time' && (
            <CustomSlider value={amount} onValueChange={setAmount} maximumValue={100}/>
        )}
        {active === 'Time' && (
            <CustomSlider value={amount} onValueChange={setAmount} maximumValue={180}/>
        )}
        
      </View>

    </View>
  )
}

export default HabitAmount;

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderRadius: 12,
        backgroundColor: '#FCFCFC',
        padding: 12,
        paddingLeft: 16,
        paddingRight: 16,
        justifyContent: 'center',
        alignItems: 'center'
    },
    circle: {
        height: 70,
        width: 70,
        borderRadius: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        height: 50,
        width: 50,
        marginTop: 8
    },
    desc: {
        borderWidth: 1,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        width: 76,
        padding: 6,
        marginTop: 16
    },
    slider_container: {
        borderColor: '#D9D9D9',
        borderWidth: 0,
        borderRadius: 8,
        backgroundColor: '#FCFCFC',
        width: '100%',
        marginTop: 50
    }
})
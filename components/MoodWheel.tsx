import React from "react"
import { Image, StyleSheet, Text, View } from "react-native"
import CircleProgress from "./DonutChart"

import Swap from '@/assets/svgs/swap.svg'

const MoodWheel = () => {
    return (
        <View style={styles.stat_container}>
            <Text style={{color: '#52637D', fontWeight: 500, fontSize: 16}}>Mood Wheel</Text>
            <Text style={{color: '#687994'}}>
                Your 
                <Text style={{fontWeight: 500}}> most </Text> 
                recorded mood is..
            </Text>
            <View style={{width: '100%', position: 'relative', height: 150, marginTop: 40, justifyContent: 'center'}}>


                <View style={styles.activity_container}>
                    <View style={styles.circle}>
                        <Image source={require('@/assets/cats/okay_cat.png')} style={styles.image}/>
                    </View>
                    <View style={styles.label}>
                        <Text style={{color: 'white', fontWeight: 500}}>Okay</Text>
                    </View>
                    <View style={styles.swap}>
                        <Swap />
                    </View>
                </View>

                <View style={{position: 'absolute', right: 0}}>
                  <View style={styles.extra_cont}>
                    <CircleProgress
                      percentage={80}
                      size={50}
                      strokeWidth={7}
                      trackColor="#E8ECF1"
                      fillColor="#FCAD72"
                    />
                    <View style={{marginLeft: 14}}>
                      <Text style={{color: '#52637D', fontWeight: 500, fontSize: 16}}>Frequency</Text>
                      <Text style={{color: '#A7AFBC', fontSize: 14, marginTop: 0}}>58%</Text>
                    </View>
                  </View>
                  <Text style={{color: '#687994', marginTop: 10, marginBottom: 4}}>Often recorded together...</Text>
                  <View style={styles.extra_cont}>
                    <View style={[styles.circle, {height: 54, width: 54}]}>
                      <Image source={require('@/assets/pngs/coffee.png')} style={{height: 40, width: 40, marginTop: 4}}/>
                    </View>
                    <View style={{marginLeft: 14}}>
                      <Text style={{color: '#52637D', fontWeight: 500, fontSize: 16}}>Coffee</Text>
                      <Text style={{color: '#A7AFBC', fontSize: 12, marginTop: 0}}>I drank coffee</Text>
                    </View>
                  </View>
                </View>

            </View>
        </View>

    )
}

export default MoodWheel

const styles = StyleSheet.create({
stat_container: {
    borderColor: '#CDD8EA',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: 'white',
    justifyContent: 'center',
    padding: 18,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 36,
    width: '100%'
  },
  activity_container: {
    borderColor: '#D9D9D9',
    borderWidth: 1,
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
    justifyContent: 'center',
    width: 96,
    height: 170,
    position: 'relative'
  },
  circle: {
    height: 66,
    width: 66,
    borderRadius: '100%',
    backgroundColor: '#FFE3CE',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative'
  },
  image: {
    height: 58,
    width: 58,
    marginTop: 8,
    resizeMode: 'contain'
  },
  label: {
    backgroundColor: '#FCAD72',
    height: 22,
    width: '100%',
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12
  },
  swap: {
    borderColor: '#D9D9D9',
    borderWidth: 1,
    borderRadius: '100%',
    backgroundColor: 'white',
    padding: 5,
    position: 'absolute',
    right: -8,
    bottom: -8
  },
  extra_cont: {
    borderColor: '#D9D9D9',
    borderWidth: 1,
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 8,
    width: 190,
    position: 'relative',
    flexDirection: 'row'
  }
})
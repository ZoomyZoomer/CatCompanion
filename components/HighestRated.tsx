import React from "react"
import { Image, StyleSheet, Text, View } from "react-native"

import Star from '@/assets/svgs/star_filled.svg'

const HighestRated = () => {
    return (
        <View style={styles.stat_container}>
          <Text style={{color: '#52637D', fontWeight: 500, fontSize: 16}}>Highest Rated</Text>
          <Text style={{color: '#687994'}}>Most enjoyable activities</Text>

          <View style={{width: '100%', marginTop: 30, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>

            <View style={[styles.activity_container, {backgroundColor: '#FCFCFC'}]}>
              <View style={[styles.circle, {backgroundColor: '#E8ECF1'}]}>
                <Image source={require('@/assets/pngs/shoe_icon.png')} style={styles.image}/>
              </View>
              <Text style={{color: '#52637D', fontWeight: 500, marginTop: 10}}>Running</Text>
              <View style={styles.num_cont}>
                <Text style={{color: '#94A4BD', fontSize: 12, marginRight: 2}}>
                  4.3
                </Text>
                <Star fill={'#7C889A'} height={14} width={14}/>
              </View>
              <Text style={styles.place_text}>2</Text>
            </View>

            <View style={[styles.activity_container, {transform: 'scale(1)'}]}>
              <View style={styles.circle}>
                <Image source={require('@/assets/pngs/coffee.png')} style={styles.image}/>
              </View>
              <Text style={{color: '#52637D', fontWeight: 500, marginTop: 10}}>Coffee</Text>
              <View style={styles.num_cont}>
                <Text style={{color: '#94A4BD', fontSize: 12, marginRight: 2}}>
                  4.8
                </Text>
                <Star fill={'#7C889A'} height={14} width={14}/>
              </View>
              <Text style={styles.place_text}>1</Text>
            </View>

            <View style={[styles.activity_container, {backgroundColor: '#FCFCFC'}]}>
              <View style={[styles.circle, {backgroundColor: '#E8ECF1'}]}>
                <Image source={require('@/assets/pngs/tree_icon.png')} style={styles.image}/>
              </View>
              <Text style={{color: '#52637D', fontWeight: 500, marginTop: 10}}>Outside</Text>
              <View style={styles.num_cont}>
                <Text style={{color: '#94A4BD', fontSize: 12, marginRight: 2}}>
                  3.7
                </Text>
                <Star fill={'#7C889A'} height={14} width={14}/>
              </View>
              <Text style={styles.place_text}>3</Text>
            </View>

          </View>

        </View>
    )
}

export default HighestRated

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
    paddingBottom: 30,
    width: '100%'
  },
  activity_container: {
    borderColor: '#D9D9D9',
    borderWidth: 1,
    borderRadius: 8,
    padding: 14,
    justifyContent: 'center',
    alignItems: 'center',
    width: 96,
    paddingTop: 24,
    height: '100%',
    position: 'relative',
    transform: 'scale(0.9)'
  },
  circle: {
    height: 54,
    width: 54,
    borderRadius: '100%',
    backgroundColor: '#FFE3CE',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative'
  },
  image: {
    height: 40,
    width: 40,
    marginTop: 4
  },
  num_cont: {
    borderWidth: 1,
    borderColor: '#D9D9D9',
    borderRadius: 4,
    padding: 4,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
    flexDirection: 'row'
  },
  place_cont: {
    position: 'absolute',
    left: -10,
    top: -10,
    height: 28,
    width: 28,
    backgroundColor: '#FCAD72',
    borderRadius: '100%'
  },
  place_text: {
    position: 'absolute',
    left: 8,
    top: 6,
    color: '#52637D'
  }
})
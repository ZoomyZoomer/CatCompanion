import { Image, StyleSheet, View, Text } from 'react-native';
import React from 'react';
import HighestRated from '@/components/HighestRated';
import MoodWheel from '@/components/MoodWheel';

export default function Statistics() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%'}}>
      <View style={{width: '90%', justifyContent: 'center', alignItems: 'center'}}>

        <HighestRated />
        <View style={{width: '100%', marginTop: 30}}>
          <MoodWheel />
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  
})

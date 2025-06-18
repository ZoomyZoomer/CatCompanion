import { Image, StyleSheet, View, Text } from 'react-native';
import React, { useState } from 'react';
import HighestRated from '@/components/HighestRated';
import MoodBar from '@/components/MoodBar';
import RewardProgress from '@/components/RewardProgress';
import TaskTime from '@/components/TaskTime';
import MoreHighestRated from '@/components/MoreHighestRated';

export default function Statistics() {

  const [showMore, setShowMore] = useState(null);

  return (
    <View style={{height: '100%', width: '100%', position: 'relative', justifyContent: 'center', alignItems: 'center'}}>

      {showMore && <MoreHighestRated setOpen={setShowMore}/>}

      <View style={{ backgroundColor: 'rgb(251, 251, 251)', flex: 1, alignItems: 'center', width: '100%', overflowY: 'auto', paddingBottom: 100, paddingTop: 40, filter: (showMore) ? 'brightness(0.3) grayscale(0.4)' : 'none', pointerEvents: (showMore) ? 'none' : 'auto'}}>

        <View style={{width: '90%', justifyContent: 'center', alignItems: 'center', overflowY: 'auto'}}>

          <HighestRated setShowMore={setShowMore}/>
          <View style={{width: '100%', marginTop: 30}}>
            <RewardProgress />
          </View>
          <View style={{width: '100%', marginTop: 30}}>
            <MoodBar />
          </View>
          <View style={{width: '100%', marginTop: 30}}>
            <TaskTime />
          </View>

        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  
})

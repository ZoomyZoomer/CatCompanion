import React, { useState } from "react"
import { Image, StyleSheet, Text, View } from "react-native"
import rewards from '../staticData/rewardSets'

const RewardItem = ({ tier } : any) => {

    const [item, setItem] = useState({});

    const generateReward = () => {

        const options = Math.floor(Math.random() * rewards.length);
        const randomNumber = (Math.floor(Math.random() * 100) + 1) + (20 * tier);
        let rarityNum = 0;

        if (randomNumber >= 90){
            rarityNum = 2;
        } else if (randomNumber >= 60){
            rarityNum = 1;
        } else {
            rarityNum = 0;
        }

        setItem(rewards[options][rarityNum]);

    }

    generateReward();

    return (
        <View>
            <Text style={{ color: '#FF83B4', fontSize: 24, fontWeight: '500', marginBottom: 30}}>Coffee</Text>
            <Text style={{color: '#FF83B4'}}>Common</Text>
            <Image source={item?.icon} style={styles.item}/>
        </View>
    )
}

export default RewardItem

const styles = StyleSheet.create({
    item: {
        height: 100,
        width: 100,
        resizeMode: 'contain',
        marginTop: 10,
        zIndex: 900
    }
})
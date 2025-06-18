import React, { useEffect, useState } from "react"
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import Animated, { Easing, useAnimatedStyle, useSharedValue, withSequence, withTiming } from "react-native-reanimated"

import Arrow from '@/assets/svgs/right-arrow2.svg'
import Chevron from '@/assets/svgs/chevron_down.svg'
import Swap from '@/assets/svgs/swap.svg'
import Lupa from '@/assets/svgs/lupa.svg'
import RecordedItem from "./RecordedItem"
import axios from "axios"

const MoreHighestRated = ({ setOpen } : any) => {

    const [text, setText] = useState("");
    const [ratingList, setRatingList] = useState<any[]>([]);
    const [filteredList, setFilteredList] = useState<any[]>([]);
    const [isHighest, setIsHighest] = useState(true);

    const scale = useSharedValue(0.7);

    // subsequence matcher
    const isSubsequence = (search: string, str: string) => {
        let i = 0,
        j = 0;
        const s = search.toLowerCase();
        const t = str.toLowerCase();
        while (i < s.length && j < t.length) {
        if (s[i] === t[j]) i++;
        j++;
        }
        return i === s.length;
    };

    const filterList = () => {
        if (!text) {
        setFilteredList(ratingList);
        return;
        }
        const filtered = ratingList.filter((item) =>
        isSubsequence(text, item.itemName)
        );
        setFilteredList(filtered);
    };

    useEffect(() => {
        scale.value = withSequence(
        withTiming(1.05, { duration: 220, easing: Easing.out(Easing.ease) }),
        withTiming(1, { duration: 180, easing: Easing.out(Easing.ease) })
        );
    }, []);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    const fetchRatings = async () => {
        const res = await axios.get(
        "http://10.0.0.216:5000/fetchHighestRatedItems",
        {
            params: {
            uid: 0,
            },
        }
        );
        setRatingList(res.data);
    };

    // whenever text or ratingList changes, re-filter
    useEffect(() => {
        filterList();
    }, [text, ratingList]);

    useEffect(() => {
        fetchRatings();
    }, []);

    return (
        <Animated.View style={[styles.popup_container, animatedStyle]}>

            <View style={{width: '100%', justifyContent: 'center', alignItems: 'center', position: 'relative'}}>
                <Text style={{color: '#52637D', fontSize: 16, fontWeight: 500}}>Highest Rated</Text>
                <TouchableOpacity style={styles.back} onPress={() => setOpen(false)}>
                    <Arrow height={26} width={26} style={{transform: 'rotate(180deg)'}}/>
                </TouchableOpacity>
            </View>

            <View style={{width: '100%', marginTop: 30, position: 'relative', justifyContent: 'center'}}>

                <TextInput
                    style={styles.input}
                    placeholder="Search..."
                    placeholderTextColor={'#ACACAC'}
                    value={text}
                    onChangeText={setText}
                />
                <View style={styles.lupa}>
                    <Lupa />
                </View>

                <TouchableOpacity style={styles.swap_highest} onPress={() => {setIsHighest(prev => !prev); setRatingList(prev => prev.reverse())}}>
                    <Text style={{color: '#52637D', marginRight: 4}}>{isHighest ? 'Highest' : 'Lowest'}</Text>
                    <Swap style={{marginTop: 2}}/>
                </TouchableOpacity>

            </View>

            <View style={styles.item_cont}>
        {text.length < 1
          ? ratingList.map((item: any, index: number) => (
              <React.Fragment key={item.id}>
                <RecordedItem item={item} index={index} ratingList={ratingList} filteredList={filteredList} />
                <View style={styles.sep} />
              </React.Fragment>
            ))
          : filteredList.map((item: any, index: number) => (
              <React.Fragment key={item.id}>
                <RecordedItem
                  item={item}
                  index={index}
                  ratingList={ratingList} 
                  filteredList={filteredList}
                />
                <View style={styles.sep} />
              </React.Fragment>
            ))}
      </View>

        </Animated.View>
    )
}

export default MoreHighestRated

const styles = StyleSheet.create({
    popup_container: {
        height: '70%',
        width: '90%',
        backgroundColor: '#FDFDFD',
        borderRadius: 8,
        position: 'absolute',
        alignItems: 'center',
        padding: 16,
        paddingTop: 26,
        paddingBottom: 40,
        zIndex: 999,
    },
    back: {
        position: 'absolute',
        left: 0,
        bottom: -3,
        justifyContent: 'center',
        alignItems: 'center'
    },
    filter_left: {
        borderColor: '#D9D9D9',
        borderWidth: 1,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
        paddingLeft: 12,
        paddingRight: 12,
        color: '#52637D',
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        borderRightWidth: 0,
        backgroundColor: '#FCFCFC'
    },
    filter_right: {
        borderColor: '#CDD8EA',
        borderWidth: 1,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
        paddingLeft: 12,
        paddingRight: 12,
        color: '#52637D',
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        flexDirection: 'row'
    },
    swap_highest: {
        flexDirection: 'row',
        borderColor: '#CDD8EA',
        borderWidth: 1,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
        height: 42,
        paddingLeft: 12,
        paddingRight: 12,
        color: '#52637D',
        position: 'absolute',
        right: 0
    },
    input: {
        height: 42,
        borderColor: '#CDD8EA',
        width: 200,
        borderWidth: 1,
        borderRadius: 8,
        paddingLeft: 56,
        paddingRight: 10,
        fontSize: 16,
        color: '#52637D'
    },
    lupa: {
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: "#D9D9D9",
        borderWidth: 1,
        borderRadius: '100%',
        padding: 8,
        position: 'absolute',
        left: 10
    },
    item_cont: {
        borderColor: "#D9D9D9",
        borderRadius: 8,
        width: '100%',
        flex: 1,
        marginTop: 30,
        overflowY: 'auto',
        overflowX: 'hidden'
    },
    sep: {
        backgroundColor: '#D9D9D9',
        height: 1,
        width: '100%'
    }
})
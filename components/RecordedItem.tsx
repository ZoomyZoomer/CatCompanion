import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  withSequence,
} from "react-native-reanimated";
import CircleProgress from "./DonutChart";
import itemSet from "@/staticData/itemSet";

const AnimatedImage = Animated.createAnimatedComponent(Animated.Image);

const RecordedItem = ({ item, index, ratingList, filteredList }: any) => {
  const [data, setData] = useState<{
    imgUri?: any;
    sentence: Array<any>;
    adjectives: Array<string>;
  }>({
    sentence: [],
    adjectives: [],
  });

  // shared scale value
  const scale = useSharedValue(0.7);

  // replay animation whenever `item` (or `index`) changes
  useEffect(() => {
    // reset to start
    scale.value = 0.7;

    // then sequence: delay → pop → settle
    scale.value = withDelay(
      index * 150,
      withSequence(
        withTiming(1.1, { duration: 200 }),
        withTiming(1.0, { duration: 150 })
      )
    );
  }, [ratingList, filteredList, index]);

  // animated style
  const imageStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  // fetch the image / text data whenever `item` changes
  const fetchInfo = () => {
    const rel = itemSet.find((set: any) =>
      set.items.some((relItem: any) => relItem.id === item.id)
    );
    const items = rel?.items.find((relItem: any) => relItem.id === item.id);
    setData({
      imgUri: items?.itemIcon,
      sentence: items?.sentence,
      adjectives: items?.adjectives,
    });
  };

  useEffect(() => {
    fetchInfo();
  }, [item]);

  return (
    <View style={styles.cont}>
      <Text style={styles.indexText}>{index + 1}</Text>

      <View
        style={[
          styles.circle,
          { backgroundColor: index < 3 ? "#FFE3CE" : "#E8ECF1" },
        ]}
      >
        <AnimatedImage
          source={data.imgUri}
          style={[styles.image, imageStyle]}
        />
      </View>

      <View style={styles.textBlock}>
        <Text style={styles.itemName}>{item.itemName}</Text>
        <Text style={styles.sentenceText}>
          {data.sentence.map((word: any, i: number) => (
            <React.Fragment key={i}>
              {word === 0
                ? item.itemName
                : word === 1
                ? data.adjectives[Math.floor(item.avgRating) - 1]
                : word}
              {i < data.sentence.length - 1 ? " " : ""}
            </React.Fragment>
          ))}
        </Text>
      </View>

      <View style={styles.progressBlock}>
        <CircleProgress
          percentage={(item.avgRating / 5) * 100}
          size={46}
          strokeWidth={6}
          trackColor="#E8ECF1"
          fillColor="#FCAD72"
        />
        <Text style={styles.ratingText}>{item.avgRating.toFixed(1)}</Text>
      </View>
    </View>
  );
};

export default RecordedItem;

const styles = StyleSheet.create({
  cont: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 16,
  },
  indexText: {
    color: "#52637D",
    fontSize: 18,
    width: 30,
    textAlign: "center",
  },
  circle: {
    height: 50,
    width: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: 38,
    width: 38,
    marginTop: 4,
  },
  textBlock: {
    flex: 1,
    marginLeft: 14,
    justifyContent: "center",
  },
  itemName: {
    color: "#52637D",
    fontWeight: "500",
    fontSize: 16,
  },
  sentenceText: {
    color: "#A7AFBC",
    fontSize: 12,
  },
  progressBlock: {
    position: "absolute",
    right: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  ratingText: {
    position: "absolute",
    color: "#895D4E",
    fontWeight: "500",
  },
});

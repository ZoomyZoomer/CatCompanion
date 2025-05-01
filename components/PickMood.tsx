import React, { useEffect, useRef } from "react";
import {
  Animated,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type PickMoodProps = {
  image: any;
  text: string;
  isSelected: boolean;
  onPress: () => void;
};

const PickMood = ({ image, text, isSelected, onPress }: PickMoodProps) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (isSelected) {
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.15,
          duration: 180,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 4,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isSelected]);

  return (
    <TouchableOpacity style={[styles.mood_container, { borderColor: isSelected ? "#FCAD72" : "#CDD8EA" }]} onPress={onPress}>
      <View style={[styles.mood_circle, { backgroundColor: isSelected ? "#FFE3CE" : "#E8ECF1" }]}>
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          <View style={styles.imageWrapper}>
            <Image source={image} style={styles.cat} resizeMode="contain" />
          </View>
        </Animated.View>
      </View>
      <Text style={[styles.mood_text, { color: isSelected ? "#FCAD72" : "#52637D" }]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default PickMood;

const styles = StyleSheet.create({
  mood_container: {
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "white",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    paddingLeft: 26,
    paddingRight: 26,
  },
  mood_circle: {
    height: 74,
    width: 74,
    borderRadius: 74,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    // overflow: "hidden", // remove this to let image overflow a bit
  },
  imageWrapper: {
    height: 80,  // larger than circle
    width: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  cat: {
    height: 80,  // match imageWrapper
    width: 80,
  },
  mood_text: {
    fontWeight: "500",
    marginTop: 12,
    fontSize: 15,
  },
});

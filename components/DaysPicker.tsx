import React, { useRef, useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Animated,
} from "react-native";

const ITEM_HEIGHT = 40;
const VISIBLE_ITEMS = 3;
const LOOP_MULTIPLIER = 100;

// ────── Replace month/year with days of week ──────
const BASE_DAYS = [
  { id: "0", label: "Sunday" },
  { id: "1", label: "Monday" },
  { id: "2", label: "Tuesday" },
  { id: "3", label: "Wednesday" },
  { id: "4", label: "Thursday" },
  { id: "5", label: "Friday" },
  { id: "6", label: "Saturday" },
];

const daysData = Array.from(
  { length: LOOP_MULTIPLIER * BASE_DAYS.length },
  (_, i) => {
    const d = BASE_DAYS[i % BASE_DAYS.length];
    return { ...d, id: `d-${i}` };
  }
);

const DaysPicker = ({ onSelectDay, selectedDay = 0 }: any) => {
  // calculate mid‐loop start index for days
  const dayCycles = LOOP_MULTIPLIER;
  const daysCount = BASE_DAYS.length;
  const halfDayCycleStart = Math.floor(dayCycles / 2) * daysCount;
  const initialDayIdx = halfDayCycleStart + selectedDay;

  // Ref and Animated value
  const scrollYDay = useRef(new Animated.Value(0)).current;
  const flatListDayRef = useRef<FlatList>(null);
  const dayTimeout = useRef<NodeJS.Timeout | null>(null);

  // Center the list on mount
  useEffect(() => {
    flatListDayRef.current?.scrollToOffset({
      offset: initialDayIdx * ITEM_HEIGHT,
      animated: false,
    });
  }, []);

  const handleSnap = (
    offsetY: number,
    dataArray: any[],
    ref: React.RefObject<FlatList>,
    initialIdx: number
  ) => {
    const totalH = dataArray.length * ITEM_HEIGHT;

    // If scrolled too close to edges, jump back to center
    if (
      offsetY < ITEM_HEIGHT * daysCount ||
      offsetY > totalH - ITEM_HEIGHT * daysCount
    ) {
      ref.current?.scrollToOffset({
        offset: initialIdx * ITEM_HEIGHT,
        animated: false,
      });
      return;
    }

    // Snap to nearest item
    const idx = Math.round(offsetY / ITEM_HEIGHT);
    const to = idx * ITEM_HEIGHT;
    ref.current?.scrollToOffset({ offset: to, animated: true });

    // Notify parent with day index 0–6
    if (dataArray === daysData && onSelectDay) {
      const numericDay = idx % daysCount;
      onSelectDay(numericDay);
    }
  };

  // Generic renderer for one wheel
  const renderItem = (scrollY: Animated.Value) => ({ item, index }: any) => {
    const inputRange = [
      (index - 1) * ITEM_HEIGHT,
      index * ITEM_HEIGHT,
      (index + 1) * ITEM_HEIGHT,
    ];
    const opacity = scrollY.interpolate({
      inputRange,
      outputRange: [0.3, 1, 0.3],
      extrapolate: "clamp",
    });
    const scale = scrollY.interpolate({
      inputRange,
      outputRange: [0.8, 1, 0.8],
      extrapolate: "clamp",
    });
    const selectedIdx = Animated.divide(scrollY, ITEM_HEIGHT);

    return (
      <Animated.View style={[styles.item, { opacity, transform: [{ scale }] }]}>
        <Animated.Text
          style={[
            styles.text,
            {
              fontWeight: (selectedIdx.interpolate({
                inputRange: [index - 0.5, index + 0.5],
                outputRange: ["500", "400"],
                extrapolate: "clamp",
              }) as any),
            },
          ]}
        >
          {item.label}
        </Animated.Text>
      </Animated.View>
    );
  };

  return (
    <View style={styles.rowContainer}>
      <View style={styles.pickerContainer}>
        <FlatList
          ref={flatListDayRef}
          data={daysData}
          keyExtractor={(item) => item.id}
          renderItem={renderItem(scrollYDay)}
          showsVerticalScrollIndicator={false}
          decelerationRate="fast"
          bounces={false}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollYDay } } }],
            {
              useNativeDriver: true,
              listener: ({ nativeEvent: { contentOffset: { y } } }) => {
                if (dayTimeout.current) clearTimeout(dayTimeout.current);
                dayTimeout.current = setTimeout(
                  () => handleSnap(y, daysData, flatListDayRef, initialDayIdx),
                  100
                );
              },
            }
          )}
          contentContainerStyle={{
            paddingTop: ((VISIBLE_ITEMS - 1) * ITEM_HEIGHT) / 2,
            paddingBottom: ((VISIBLE_ITEMS - 1) * ITEM_HEIGHT) / 2,
          }}
          getItemLayout={(_, i) => ({
            length: ITEM_HEIGHT,
            offset: ITEM_HEIGHT * i,
            index: i,
          })}
        />

        {/* Top/bottom separators to highlight the selected row */}
        <View
          style={[
            styles.sep,
            {
              width: 100,
              top:
                (ITEM_HEIGHT * Math.floor(VISIBLE_ITEMS / 2) +
                  ITEM_HEIGHT / 2) -
                ITEM_HEIGHT / 2,
            },
          ]}
        />
        <View
          style={[
            styles.sep,
            {
              width: 100,
              top:
                ITEM_HEIGHT * Math.floor(VISIBLE_ITEMS / 2) +
                ITEM_HEIGHT,
            },
          ]}
        />
      </View>
    </View>
  );
};

export default DaysPicker;

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  pickerContainer: {
    flex: 1,
    height: ITEM_HEIGHT * VISIBLE_ITEMS,
    overflow: "hidden",
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    width: 100,
  },
  item: {
    height: ITEM_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 14,
    color: "#52637D",
  },
  sep: {
    height: 2,
    borderRadius: 40,
    backgroundColor: "#FCAD72",
    position: "absolute",
  },
});

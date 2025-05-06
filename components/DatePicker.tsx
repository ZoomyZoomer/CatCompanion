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

// Months data
const BASE_MONTHS = [...Array(12)].map((_, i) => ({
  id: i.toString(),
  label: new Date(0, i).toLocaleString("default", { month: "short" }),
}));
const monthData = Array.from({ length: LOOP_MULTIPLIER }, (_, i) => {
  const m = BASE_MONTHS[i % BASE_MONTHS.length];
  return { ...m, id: `m-${i}` };
});

// Years data (e.g., 1990 - 2040)
const START_YEAR = 1990;
const YEAR_COUNT = 50;
const BASE_YEARS = [...Array(YEAR_COUNT)].map((_, i) => ({
  id: i.toString(),
  label: (START_YEAR + i).toString(),
}));
const yearData = Array.from({ length: LOOP_MULTIPLIER }, (_, i) => {
  const y = BASE_YEARS[i % BASE_YEARS.length];
  return { ...y, id: `y-${i}` };
});

const DatePicker = ({ onSelectMonth, onSelectYear, month, year } : any) => {
  // Month refs and anim
  const scrollYMonth = useRef(new Animated.Value(0)).current;
  const flatListMonthRef = useRef<FlatList>(null);
  const initialMonthIdx = Math.floor(month);
  const monthTimeout = useRef<NodeJS.Timeout | null>(null);

  // Year refs and anim
  const scrollYYear = useRef(new Animated.Value(0)).current;
  const flatListYearRef = useRef<FlatList>(null);
  const initialYearIdx = 35;
  const yearTimeout = useRef<NodeJS.Timeout | null>(null);

  // Center both lists on mount
  useEffect(() => {
    flatListMonthRef.current?.scrollToOffset({ offset: initialMonthIdx * ITEM_HEIGHT, animated: false });
    flatListYearRef.current?.scrollToOffset({ offset: initialYearIdx * ITEM_HEIGHT, animated: false });
  }, []);

  const handleSnap = (
    offsetY: number,
    dataArray: any[],
    ref: React.RefObject<FlatList>,
    initialIdx: number
  ) => {
    const totalH = dataArray.length * ITEM_HEIGHT;
  
    // Infinite loop reset
    if (
      offsetY < ITEM_HEIGHT * BASE_MONTHS.length ||
      offsetY > totalH - ITEM_HEIGHT * BASE_MONTHS.length
    ) {
      ref.current?.scrollToOffset({ offset: initialIdx * ITEM_HEIGHT, animated: false });
      return;
    }
  
    // Snap logic
    const idx = Math.round(offsetY / ITEM_HEIGHT);
    const to = idx * ITEM_HEIGHT;
    ref.current?.scrollToOffset({ offset: to, animated: true });
  
    if (dataArray === monthData && onSelectMonth) {
      const numericMonth = idx % BASE_MONTHS.length; // 0 - 11
      onSelectMonth(numericMonth); // Pass numeric value
    } else if (dataArray === yearData && onSelectYear) {
      const numericYear = START_YEAR + (idx % BASE_YEARS.length); // e.g., 1990+
      onSelectYear(numericYear); // Pass numeric value
    }
  };
  

  // Render generic item
  const renderItem = (scrollY: Animated.Value) => ({ item, index }: any) => {
    const inputRange = [
      (index - 1) * ITEM_HEIGHT,
      index * ITEM_HEIGHT,
      (index + 1) * ITEM_HEIGHT,
    ];
    const opacity = scrollY.interpolate({ inputRange, outputRange: [0.3, 1, 0.3], extrapolate: "clamp" });
    const scale = scrollY.interpolate({ inputRange, outputRange: [0.8, 1, 0.8], extrapolate: "clamp" });
    const selectedIdx = Animated.divide(scrollY, ITEM_HEIGHT);

    return (
      <Animated.View style={[styles.item, { opacity, transform: [{ scale }] }]}>        
        <Animated.Text
          style={[
            styles.text,
            {
              fontWeight: selectedIdx.interpolate({
                inputRange: [index - 0.5, index + 0.5],
                outputRange: ["500", "400"],
                extrapolate: "clamp",
              }) as any,
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
      {/* Month picker */}
      <View style={styles.pickerContainer}>
        <FlatList
          ref={flatListMonthRef}
          data={monthData}
          keyExtractor={(item) => item.id}
          renderItem={renderItem(scrollYMonth)}
          showsVerticalScrollIndicator={false}
          decelerationRate="fast"
          bounces={false}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollYMonth } } }],
            {
              useNativeDriver: true,
              listener: ({ nativeEvent: { contentOffset: { y } } }) => {
                if (monthTimeout.current) clearTimeout(monthTimeout.current);
                monthTimeout.current = setTimeout(() => handleSnap(y, monthData, flatListMonthRef, initialMonthIdx), 100);
              },
            }
          )}
          contentContainerStyle={{
            paddingTop: ((VISIBLE_ITEMS - 1) * ITEM_HEIGHT) / 2,
            paddingBottom: ((VISIBLE_ITEMS - 1) * ITEM_HEIGHT) / 2,
          }}
          getItemLayout={(_, i) => ({ length: ITEM_HEIGHT, offset: ITEM_HEIGHT * i, index: i })}
        />
        <View style={[styles.sep, { width: 40, top: (ITEM_HEIGHT * Math.floor(VISIBLE_ITEMS / 2) + (ITEM_HEIGHT / 2)) - ITEM_HEIGHT / 2 }]} />
        <View style={[styles.sep, { width: 40, top: ITEM_HEIGHT * Math.floor(VISIBLE_ITEMS / 2) + (ITEM_HEIGHT) }]} />
      </View>

      {/* Year picker */}
      <View style={[styles.pickerContainer, {marginLeft: 10}]}>
        <FlatList
          ref={flatListYearRef}
          data={yearData}
          keyExtractor={(item) => item.id}
          renderItem={renderItem(scrollYYear)}
          showsVerticalScrollIndicator={false}
          decelerationRate="fast"
          bounces={false}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollYYear } } }],
            {
              useNativeDriver: true,
              listener: ({ nativeEvent: { contentOffset: { y } } }) => {
                if (yearTimeout.current) clearTimeout(yearTimeout.current);
                yearTimeout.current = setTimeout(() => handleSnap(y, yearData, flatListYearRef, initialYearIdx), 100);
              },
            }
          )}
          contentContainerStyle={{
            paddingTop: ((VISIBLE_ITEMS - 1) * ITEM_HEIGHT) / 2,
            paddingBottom: ((VISIBLE_ITEMS - 1) * ITEM_HEIGHT) / 2,
          }}
          getItemLayout={(_, i) => ({ length: ITEM_HEIGHT, offset: ITEM_HEIGHT * i, index: i })}
        />
        <View style={[styles.sep, { width: 60, top: (ITEM_HEIGHT * Math.floor(VISIBLE_ITEMS / 2) + (ITEM_HEIGHT / 2)) - ITEM_HEIGHT / 2 }]} />
        <View style={[styles.sep, { width: 60, top: ITEM_HEIGHT * Math.floor(VISIBLE_ITEMS / 2) + (ITEM_HEIGHT) }]} />
      </View>
    </View>
  );
};

export default DatePicker;

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
    width: 60
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

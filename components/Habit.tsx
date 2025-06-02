import React, { useEffect, useRef, useState } from "react"
import {
  Animated,
  Easing,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native"

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity)

import Clock from '@/assets/svgs/clock-filled.svg'
import Check from '@/assets/svgs/check-circle.svg'
import Close from '@/assets/svgs/close-square.svg'
import axios from "axios"

const Habit = ({
  habit,
  setShowHabitLog,
  habitId,
  setShowRewardPopup,
  isDeleting,
  setDeletingHabit
}: any) => {
  const icons: { [key: string]: any } = {
    'clipboard.png': require('@/assets/icons/clipboard.png'),
    'flexibility.png': require('@/assets/icons/flexibility.png'),
    'heart.png': require('@/assets/icons/heart.png'),
    'laptop.png': require('@/assets/icons/laptop.png'),
    'paint-brush.png': require('@/assets/icons/paint-brush.png'),
    'reading.png': require('@/assets/icons/reading.png'),
    'shoe_icon.png': require('@/assets/icons/shoe_icon.png'),
    'sports.png': require('@/assets/icons/sports.png'),
    'water-bottle.png': require('@/assets/icons/water-bottle.png'),
  }

  function isSameDay(date1: Date, date2: Date) {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    )
  }

  const [amountCompleted, setAmountCompleted] = useState(0)

  const handleHabitInfo = () => {
    const today = new Date()
    const habitAmount = habit.habit_logs.find((rel: any) =>
      isSameDay(new Date(rel.date), today)
    )

    if (!habitAmount) {
      setAmountCompleted(0)
    } else {
      setAmountCompleted(habitAmount.amount_completed)
    }
  }

  useEffect(() => {
    handleHabitInfo()
  }, [habit])

  // ────── Shake animation setup ──────
  const shakeAnim = useRef(new Animated.Value(-4)).current
  const loopRef = useRef<Animated.CompositeAnimation | null>(null)

  useEffect(() => {
    if (isDeleting) {
      // Reset to -4, so motion is continuous
      shakeAnim.setValue(-4)

      const sequence = Animated.sequence([
        Animated.timing(shakeAnim, {
          toValue: 4,
          duration: 300,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
          toValue: -4,
          duration: 300,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ])

      // No options object—just wrap the sequence
      loopRef.current = Animated.loop(sequence)
      loopRef.current.start()
    } else {
      // Stop and reset
      if (loopRef.current) {
        loopRef.current.stop()
        loopRef.current = null
      }
      shakeAnim.stopAnimation()
      shakeAnim.setValue(0)
    }

    return () => {
      if (loopRef.current) {
        loopRef.current.stop()
        loopRef.current = null
      }
    }
  }, [isDeleting, shakeAnim])

  const rotate = shakeAnim.interpolate({
    inputRange: [-4, 4],
    outputRange: ["-4deg", "4deg"],
  })

  return (
    <AnimatedTouchable
      style={[
        styles.container,
        {
          borderColor:
            amountCompleted / habit.amount_required === 1
              ? "#FCAD72"
              : "#E8ECF1",
        },
      ]}
      onPress={() => {
        habitId.current = {
          amount_completed: amountCompleted,
          name: habit.name,
          availability: habit.availability,
          hid: habit._id,
          max: habit.amount_required,
          type: habit.type,
          tier: habit.reward_tier,
        };
        isDeleting ? setDeletingHabit(true) : setShowHabitLog(true)
      }}
    >

      {isDeleting && <TouchableOpacity style={{position: 'absolute', right: -10, top: -10, backgroundColor: 'white'}} onPress={() => 
       {  
          habitId.current={amount_completed: amountCompleted,
          hid: habit._id,
          max: habit.amount_required,
          type: habit.type,
          tier: habit.reward_tier,}; setDeletingHabit(true)
        }}>
        <Close />
      </TouchableOpacity>
}
      <View
        style={[
          styles.left_cont,
          {
            backgroundColor:
              amountCompleted / habit.amount_required === 1
                ? "#FCAD72"
                : "#E8ECF1",
          },
        ]}
      >
        <View
          style={[
            styles.circle,
            {
              borderColor:
                amountCompleted / habit.amount_required === 1
                  ? "#FCAD72"
                  : "#E4E7EC",
            },
          ]}
        >
          <Image source={icons[habit.icon]} style={styles.image} />
          <View style={[styles.quant]}>
            <Text style={{ color: "#8592A7", fontSize: 10, fontWeight: "500" }}>
              {habit.num_claimed}x
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.right_cont}>
        <View style={{ height: "100%", justifyContent: "center", marginLeft: 20 }}>
          <Text style={{ color: "#7C889A", fontWeight: "500", fontSize: 12 }}>
            <Text style={{ color: "#52637D", fontWeight: "600", marginRight: 4 }}>
              Habit
            </Text>
            · {habit.name}
          </Text>
          <Text style={{ color: "#ACACAC", fontSize: 10, marginTop: 2, width: "90%" }}>
            {habit.motivator}
          </Text>
          <View
            style={[
              styles.tag,
              {
                borderColor:
                  amountCompleted / habit.amount_required < 1
                    ? "#E4E7EC"
                    : "#FCAD72",
              },
            ]}
          >
            {amountCompleted / habit.amount_required < 1 ? <Clock /> : <Check />}
            <Text
              style={{
                color:
                  amountCompleted / habit.amount_required < 1
                    ? "#7C889A"
                    : "#FCAD72",
                fontSize: 10,
                marginLeft: 4,
              }}
            >
              {amountCompleted / habit.amount_required < 1
                ? `Every ${habit.availability}`
                : "Completed"}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.energy_bar}>
        <View style={styles.bar}>
          <View
            style={[
              styles.fill_bar,
              { height: `${(amountCompleted / habit.amount_required) * 100}%` },
            ]}
          />
        </View>
      </View>
    </AnimatedTouchable>
  )
}

export default Habit

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderColor: "#E8ECF1",
    borderWidth: 1,
    borderRadius: 8,
    height: 104,
    backgroundColor: "white",
    flexDirection: "row",
    position: "relative",
    marginTop: 10,
  },
  left_cont: {
    height: "100%",
    width: "24%",
    backgroundColor: "#E8ECF1",
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  right_cont: {
    height: "100%",
    width: "76%",
    justifyContent: "center",
  },
  circle: {
    height: 58,
    width: 58,
    borderRadius: 29,
    backgroundColor: "white",
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#E4E7EC",
    borderWidth: 1,
  },
  image: {
    resizeMode: "contain",
    height: 38,
    width: 38,
    zIndex: 100,
  },
  tag: {
    borderColor: "#CFD6E1",
    borderWidth: 1,
    borderStyle: "dashed",
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
    padding: 4,
    marginTop: 16,
    maxWidth: 120,
  },
  quant: {
    position: "absolute",
    height: 26,
    width: 26,
    borderRadius: 13,
    borderColor: "#E4E7EC",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    right: "-12%",
    bottom: "-12%",
    backgroundColor: "white",
  },
  energy_bar: {
    position: "absolute",
    right: 14,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  bar: {
    backgroundColor: "#E4E7EC",
    height: "70%",
    width: 7,
    borderRadius: 7,
    position: "relative",
    justifyContent: "flex-end",
  },
  fill_bar: {
    backgroundColor: "#FCAD72",
    width: "100%",
    height: 20,
    borderRadius: 7,
  }
})

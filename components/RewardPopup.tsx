import React, { useEffect, useRef, useState } from "react"
import {
  View,
  Animated,
  Easing,
  Image,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native'
import { useAnimatedStyle, useSharedValue, withSequence, withTiming } from "react-native-reanimated"
import rewards from '../staticData/rewardSets'

const RewardPopup = ({ setShowRewardPopup, habitInfo }: any) => {
  // ────── 1) Entrance “pop” (Reanimated) ──────
  const scale = useSharedValue(0.7)
  useEffect(() => {
    scale.value = withSequence(
      withTiming(1.05, { duration: 220, easing: Easing.out(Easing.ease) }),
      withTiming(1,    { duration: 180, easing: Easing.out(Easing.ease) })
    )
  }, [])
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }))

  // ────── 2) Idle shake loop (RN Animated) ──────
  const imageRotation = useRef(new Animated.Value(0)).current
  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(imageRotation, {
          toValue: 1,
          duration: 180,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(imageRotation, {
          toValue: -1,
          duration: 180,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(imageRotation, {
          toValue: 0,
          duration: 180,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.delay(3200),
      ])
    )

    loop.start()
    return () => loop.stop()
  }, [])

  // ────── 3) “Press‐to‐shrink” (RN Animated) ──────
  const pressScale = useRef(new Animated.Value(1)).current

  const imageCombinedStyle = {
    transform: [
      {
        rotate: imageRotation.interpolate({
          inputRange: [-1, 0, 1],
          outputRange: ['-6deg', '0deg', '6deg'],
        }),
      },
      { scale: pressScale },
    ],
    zIndex: 900,
  }

  // ────── 4) Dancing circles (RN Animated) ──────
  const circle1Anim = useRef(new Animated.Value(0)).current
  const circle3Anim = useRef(new Animated.Value(0)).current
  const circle0Scale = useRef(new Animated.Value(1)).current
  const circle2Scale = useRef(new Animated.Value(1)).current

  const startTranslationOsc = (anim: Animated.Value, delay = 0) => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(anim, {
          toValue: 1,
          duration: 800,
          easing:    Easing.inOut(Easing.ease),
          useNativeDriver: true,
          delay,
        }),
        Animated.timing(anim, {
          toValue: 0,
          duration: 800,
          easing:    Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start()
  }

  const startScaleOsc = (anim: Animated.Value, delay = 0) => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(anim, {
          toValue: 1.2,
          duration: 800,
          easing:    Easing.inOut(Easing.ease),
          useNativeDriver: true,
          delay,
        }),
        Animated.timing(anim, {
          toValue: 1,
          duration: 800,
          easing:    Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start()
  }

  useEffect(() => {
    startTranslationOsc(circle1Anim, 0)
    startTranslationOsc(circle3Anim, 400)
    startScaleOsc(circle0Scale, 0)
    startScaleOsc(circle2Scale, 400)
  }, [])

  const circle1TranslateX = circle1Anim.interpolate({
    inputRange: [0, 1],
    outputRange: [-4, 4],
  })
  const circle3TranslateX = circle3Anim.interpolate({
    inputRange: [0, 1],
    outputRange: [4, -4],
  })

  // ────── 5) Press‐state & completion flags ──────
  const [isPressed, setIsPressed] = useState(false)
  const [animationComplete, setAnimationComplete] = useState(false)

  // ────── 6) Animate popup height ──────
  const containerHeight = useRef(new Animated.Value(360)).current
  useEffect(() => {
    if (isPressed) {
      Animated.timing(containerHeight, {
        toValue: 300,
        duration: 400,
        easing: Easing.out(Easing.ease),
        useNativeDriver: false,
      }).start()
    }
  }, [isPressed])

  // ────── 7) Post‐press animations ──────
  const postPressRotation = useRef(new Animated.Value(0)).current
  const postPressScale    = useRef(new Animated.Value(1)).current
  const postPressOpacity  = useRef(new Animated.Value(1)).current

  useEffect(() => {
    if (!isPressed) return

    // A) Two quick shakes (100ms each)
    const part1 = Animated.sequence([
      Animated.timing(postPressRotation, {
        toValue:   1,
        duration:  100,
        easing:    Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(postPressRotation, {
        toValue:  -1,
        duration:  100,
        easing:    Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(postPressRotation, {
        toValue:   1,
        duration:  100,
        easing:    Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(postPressRotation, {
        toValue:  -1,
        duration:  100,
        easing:    Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(postPressRotation, {
        toValue:   0,
        duration:  100,
        easing:    Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    ])

    // B) Scale to 1.2 + one small shake
    const part2 = Animated.parallel([
      Animated.timing(postPressScale, {
        toValue: 1.2,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.sequence([
        Animated.timing(postPressRotation, {
          toValue:  -0.5,
          duration: 100,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(postPressRotation, {
          toValue:   0.5,
          duration: 100,
          easing:    Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(postPressRotation, {
          toValue:   0,
          duration: 100,
          easing:    Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    ])

    // C) Continuous shake loop (100 ms steps)
    const singleShakeStep = Animated.sequence([
      Animated.timing(postPressRotation, {
        toValue:   1,
        duration:  100,
        easing:    Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(postPressRotation, {
        toValue:  -1,
        duration:  100,
        easing:    Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(postPressRotation, {
        toValue:   1,
        duration:  100,
        easing:    Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(postPressRotation, {
        toValue:  -1,
        duration:  100,
        easing:    Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(postPressRotation, {
        toValue:   0,
        duration:  100,
        easing:    Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    ])
    const shakeLoop = Animated.loop(singleShakeStep)

    // D) Reset rotation
    const resetRotation = Animated.timing(postPressRotation, {
      toValue: 0,
      duration: 50,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    })

    // E) Bounce up to 1.3 faster
    const part4 = Animated.spring(postPressScale, {
      toValue: 1.3,
      tension: 260,
      friction: 5,
      useNativeDriver: true,
    })

    // F) Scale down to 0.6 + fade out over 0.5s
    const part5 = Animated.parallel([
      Animated.timing(postPressScale, {
        toValue: 0.6,
        duration: 500,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(postPressOpacity, {
        toValue: 0,
        duration: 500,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
    ])

    // Run part1 + part2, then shake 2s, then reset + part4→part5
    Animated.sequence([part1, part2]).start(() => {
      shakeLoop.start()
      setTimeout(() => {
        shakeLoop.stop()
        resetRotation.start(() => {
          part4.start(() => {
            part5.start(() => {
              // Once part5 finishes:
              // 1) Resize popup back to 440
              Animated.timing(containerHeight, {
                toValue: 440,
                duration: 400,
                easing: Easing.out(Easing.ease),
                useNativeDriver: false,
              }).start()
              // 2) Set animationComplete = true
              setAnimationComplete(true)
            })
          })
        })
      }, 2000)
    })
  }, [isPressed])

  // ────── 8) Post‐press style ──────
  const postPressImageStyle = {
    transform: [
      {
        rotate: postPressRotation.interpolate({
          inputRange: [-1, 0, 1],
          outputRange: ['-6deg', '0deg', '6deg'],
        }),
      },
      { scale: postPressScale },
    ],
    opacity: postPressOpacity,
    zIndex: 900,
  }

  // ────── 10) Hover animation for coffee (when animationComplete=true) ──────
  const coffeeOffset = useRef(new Animated.Value(0)).current

  useEffect(() => {
    if (!animationComplete) return

    // 1) Initial move from 0 → –10
    Animated.timing(coffeeOffset, {
      toValue: -10,
      duration: 667,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start(() => {
      // 2) After reaching –10, run a continuous back-and-forth loop via recursion
      const animateLoop = () => {
        Animated.sequence([
          Animated.timing(coffeeOffset, {
            toValue: 10,
            duration: 667,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(coffeeOffset, {
            toValue: -10,
            duration: 667,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ]).start(() => animateLoop())
      }
      animateLoop()
    })
  }, [animationComplete])

  // ────── 10.a) Shadow‐width interpolation ──────
  const shadowWidth = coffeeOffset.interpolate({
    inputRange: [-10, 0, 10],
    outputRange: [60, 80, 100],
    extrapolate: 'clamp',
  })

  const tiers = [
    {icon: require('@/assets/pngs/message.png'), name: 'Envelope', tier: 'I', desc: 'I wonder whose mail this is. Is it mine?!'},
    {icon: require('@/assets/pngs/gift-box.png'), name: 'Chocolate Box', tier: 'II', desc: 'My very own chocolate box! I LOVE it!'},
    {icon: require('@/assets/pngs/gift.png'), name: 'Present', tier: 'III', desc: 'A neatly wrapped present... for me?!'}
  ]

  const [item, setItem] = useState({});

    const generateReward = () => {

        const options = Math.floor(Math.random() * rewards.length);
        const randomNumber = (Math.floor(Math.random() * 100) + 1) + (20 * habitInfo?.tier);
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

    useEffect(() => {
      generateReward();
    }, [])

  return (
    <View
      style={{
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        zIndex: 998,
      }}
    >
      <Animated.View
        style={[
          styles.popup_container,
          { height: containerHeight },
          animatedStyle,
        ]}
      >
        <View
          style={{
            width: '100%',
            height: '100%',
            alignItems: 'center',
            position: 'relative',
            padding: 30,
          }}
        >
          <Text style={{ color: '#FF83B4', fontSize: 24, fontWeight: '500' }}>
            {!isPressed && `${tiers[habitInfo.tier].name} · Tier ${tiers[habitInfo.tier].tier}`}
          </Text>

          {animationComplete && (
            <Text style={{ color: item?.rarity === 'Epic' ? '#FF83B4' : item?.rarity === 'Rare' ? '#83C5FF' : '#54EB7A', fontSize: 24, fontWeight: '500' }}>
              {`★ ${item?.name} ★`}
            </Text>
          )}

          {animationComplete && <Text style={{color: item?.rarity === 'Epic' ? '#FF83B4' : item?.rarity === 'Rare' ? '#83C5FF' : '#54EB7A'}}>{item?.rarity}</Text>}

          <View style={{ marginTop: 30 }}>
            <View
              style={[
                styles.circle,
                { backgroundColor: (isPressed ) ? 'transparent' : '#FFE3CE' }
              ]}
            >
              <TouchableWithoutFeedback
                onPressIn={() => {
                  Animated.timing(pressScale, {
                    toValue: 0.86,
                    duration: 150,
                    easing: Easing.out(Easing.ease),
                    useNativeDriver: true,
                  }).start()
                }}
                onPressOut={() => {
                  Animated.timing(pressScale, {
                    toValue: 1,
                    duration: 150,
                    easing: Easing.out(Easing.ease),
                    useNativeDriver: true,
                  }).start(() => {
                    setIsPressed(true)
                  })
                }}
              >
                <Animated.View
                  style={isPressed ? postPressImageStyle : imageCombinedStyle}
                >
                  {!animationComplete && (
                    <Image
                      source={tiers[habitInfo.tier].icon}
                      style={styles.item}
                    />
                  )}
                </Animated.View>
              </TouchableWithoutFeedback>

              {animationComplete && (
                <Animated.View
                  style={{ transform: [{ translateY: coffeeOffset }] }}
                >
                  <Image source={item?.icon} style={styles.item}/>
                </Animated.View>
              )}

              {/* Four circles around gift only if not pressed */}
              {!isPressed && (
                <>
                  <Animated.View
                    style={[
                      styles.circle0,
                      { transform: [{ scale: circle0Scale }] },
                    ]}
                  />
                  <Animated.View
                    style={[
                      styles.circle1,
                      { transform: [{ translateX: circle1TranslateX }] },
                    ]}
                  />
                  <Animated.View
                    style={[
                      styles.circle2,
                      { transform: [{ scale: circle2Scale }] },
                    ]}
                  />
                  <Animated.View
                    style={[
                      styles.circle3,
                      { transform: [{ translateX: circle3TranslateX }] },
                    ]}
                  />
                </>
              )}
            </View>
          </View>

          <Text style={[styles.desc, {position: 'absolute', bottom: animationComplete ? 110: 40, width: animationComplete ? 260 : 210}]}>
            {!isPressed && `"${tiers[habitInfo.tier].desc}"`}
            {animationComplete && `"${item?.desc}"`}
          </Text>

          {animationComplete && (
            <Animated.View
              style={[
                styles.shadow,
                { width: shadowWidth }
              ]}
            />
          )}

          {animationComplete && (
            <TouchableOpacity style={styles.claim} onPress={() => setShowRewardPopup(false)}>
              <Text style={{color: 'white', fontWeight: 500, fontSize: 16}}>Claim</Text>
            </TouchableOpacity>
          )}
        </View>
      </Animated.View>
    </View>
  )
}

export default RewardPopup

const styles = StyleSheet.create({
  popup_container: {
    height: 360,  // overridden by containerHeight
    width: '80%',
    backgroundColor: '#FDFDFD',
    borderRadius: 8,
    alignItems: 'center',
    zIndex: 900,
    overflow: 'visible',
  },
  item: {
    height: 100,
    width: 100,
    resizeMode: 'contain',
    marginTop: 10,
    zIndex: 900,
  },
  desc: {
    position: 'absolute',
    bottom: 40,
    color: '#8497B6',
    fontSize: 16,
    width: 210,
    textAlign: 'center',
  },
  circle: {
    height: 120,
    width: 120,
    borderRadius: 60,
    backgroundColor: '#FFE3CE',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  circle0: {
    backgroundColor: '#FFE3CE',
    height: 30,
    width: 30,
    borderRadius: 30,
    position: 'absolute',
    right: -16,
    top: 8,
  },
  circle1: {
    backgroundColor: '#FFE3CE',
    height: 24,
    width: 24,
    borderRadius: 20,
    position: 'absolute',
    left: -18,
    top: 4,
  },
  circle2: {
    backgroundColor: '#FFE3CE',
    height: 36,
    width: 36,
    borderRadius: 30,
    position: 'absolute',
    left: -18,
    bottom: 4,
  },
  circle3: {
    backgroundColor: '#FFE3CE',
    height: 24,
    width: 24,
    borderRadius: 20,
    position: 'absolute',
    right: -10,
    bottom: 0,
  },
  claim: {
    height: 50,
    width: 200,
    backgroundColor: '#FCAD72',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
    position: 'absolute',
    bottom: 26
  },
  shadow: {
    height: 14,
    borderRadius: '100%',
    backgroundColor: '#E8ECF1',
    marginTop: 10,
    alignSelf: 'center',
  },
})

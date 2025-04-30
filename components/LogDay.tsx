import { Animated, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import React, { useRef, useEffect, useState } from "react"
import InfoSection from "./InfoSection"
import MoodSelector from "./MoodSelector"

import ChevronDown from '@/assets/svgs/chevron_down.svg'

import itemSet from '@/staticData/itemSet'

const LogDay = ({selectedItems, setSelectedItems} : any) => {

    const bounceAnim = useRef(new Animated.Value(0)).current;
    const scrollViewRef = useRef(null);
    const [showScrollButton, setShowScrollButton] = useState(true); // 👈 new state

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(bounceAnim, {
                    toValue: -6,
                    duration: 600,
                    useNativeDriver: true
                }),
                Animated.timing(bounceAnim, {
                    toValue: 0,
                    duration: 600,
                    useNativeDriver: true
                })
            ])
        ).start();
    }, []);

    const scrollToBottom = () => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollToEnd({ animated: true });
        }
    };

    const handleScroll = (event) => {
        const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
        const isAtBottom = layoutMeasurement.height + contentOffset.y >= contentSize.height - 20; // 👈 little buffer
        setShowScrollButton(!isAtBottom);
    };

    return (
        <View style={{ padding: 20, paddingTop: 0, width: '100%', position: 'relative' }}>
            <InfoSection 
                mainText={'What to do'}
                subText={"Pick the top 3 most notable events you experienced today, good or bad."}
            />

            <View style={{ position: 'relative', height: 340 }}>
                <ScrollView
                    ref={scrollViewRef}
                    style={styles.mainContent}
                    showsVerticalScrollIndicator={false}
                    onScroll={handleScroll} // 👈 track scrolling
                    scrollEventThrottle={16} // 👈 smoother tracking (16ms ~ 60fps)
                >
                    {itemSet.map((itemSet, index) => (
                        <MoodSelector 
                            key={index}
                            items={itemSet.items}
                            title={itemSet.setName}
                            selectedItems={selectedItems}
                            setSelectedItems={setSelectedItems}
                        />
                    ))}
                </ScrollView>

                {showScrollButton && ( // 👈 only show if not at bottom
                    <Animated.View style={[{
                        transform: [{ translateY: bounceAnim }, { translateX: -15 }],
                        position: 'absolute',
                        bottom: -24,
                        left: '50%'
                    }]}>
                        <TouchableOpacity style={styles.moreCircle} onPress={scrollToBottom}>
                            <ChevronDown stroke={'white'} />
                        </TouchableOpacity>
                    </Animated.View>
                )}
            </View>
        </View>
    );
}

export default LogDay

const styles = StyleSheet.create({
    mainContent: {
        height: '100%',
        overflowY: 'auto',
        marginTop: 16
    },
    moreCircle: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 30,
        width: 30,
        borderRadius: 30,
        backgroundColor: '#FCAD72',
    }
})

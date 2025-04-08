import React, { useEffect, useRef } from "react";
import { StyleSheet, Image, View, Animated, Easing } from "react-native";

const CatIntroLogin = () => {
    const fadeAnim = useRef(new Animated.Value(0)).current; // For circle opacity
    const scaleAnim = useRef(new Animated.Value(0)).current; // For image scale

    useEffect(() => {
        // Fade in the circle
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 800,
            easing: Easing.ease,
            useNativeDriver: true,
        }).start();

        // Bounce in the image
        Animated.spring(scaleAnim, {
            toValue: 0.9, // Final scale
            friction: 4, // Lower friction = more bounce
            tension: 100, // Higher tension = faster spring
            useNativeDriver: true,
        }).start();
    }, []);

    return (
        <View style={{ flex: 1, backgroundColor: '#FCAD72', alignItems: 'center' }}>
            <View style={{ width: '90%', alignItems: 'center' }}>
                <Animated.View
                    style={[
                        styles.cat_circle,
                        { marginTop: 70, opacity: fadeAnim },
                    ]}
                >
                    <Animated.Image
                        source={require('@/assets/cats/glasses_cat.png')}
                        style={[styles.cat_image, {
                            transform: [{ scale: scaleAnim }],
                        }]}
                    />
                </Animated.View>
            </View>
        </View>
    );
};

export default CatIntroLogin;

const styles = StyleSheet.create({
    cat_circle: {
        height: 220,
        width: 220,
        borderRadius: 110,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cat_image: {
        marginTop: 10,
    },
});

import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View, Image, Animated, Easing, Button, TouchableOpacity } from "react-native";
import { useTalkingPulse } from "@/hooks/useTalkingPulse";
import TypingText from "@/components/TypingText";
import LoadingDots from "@/components/LoadingDots";
import ContinueArrow from '@/assets/svgs/right-arrow.svg'

const CatIntroLogin = () => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const bounceAnim = useRef(new Animated.Value(0)).current;

    // State to trigger pulse animation dynamically
    const [isTalking, setIsTalking] = useState(false);
    const [showText1, setShowText1] = useState(false);
    const [showText2, setShowText2] = useState(false);
    const [showLoad, setShowLoad] = useState(false);
    const [duration, setDuration] = useState(2000);
    const [showButton, setShowButton] = useState(false);

    // Trigger the talking pulse animation when `isTalking` is true
    const talkingPulse = useTalkingPulse(isTalking, duration);

    useEffect(() => {
        // Fade in the circle
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 800,
            easing: Easing.ease,
            useNativeDriver: true,
        }).start();

        // Spring-in the image
        Animated.spring(bounceAnim, {
            toValue: 0.9,
            friction: 4,
            tension: 100,
            useNativeDriver: true,
        }).start();
    }, []);

    useEffect(() => {
        const timer1 = setTimeout(() => {
            setIsTalking(true);
            setShowText1(true);
            const timer2 = setTimeout(() => {
                setIsTalking(false);
                setShowLoad(true);
                const timer3 = setTimeout(() => {
                    setDuration(3000);
                    setIsTalking(true);
                    setShowText2(true);
                    setTimeout(() =>{
                        setShowButton(true);
                    }, 3000)
                }, 3000);
                return () => clearTimeout(timer3);
            }, 2100);
            return () => clearTimeout(timer2);
        }, 2000);
        return () => clearTimeout(timer1);
    }, []);
    

    return (
        <View style={{ flex: 1, backgroundColor: '#FCAD72', alignItems: 'center' }}>
            <View style={{ width: '90%', alignItems: 'center' }}>
                <Animated.View style={[styles.cat_circle, { marginTop: 70, opacity: fadeAnim }]}>
                    <Animated.Image
                        source={require('@/assets/cats/glasses_cat.png')}
                        style={[styles.cat_image, { transform: [{ scale: bounceAnim }, ...talkingPulse.transform] }]}
                    />
                </Animated.View>

                <View style={{flexDirection: 'row', marginTop: 20, justifyContent: 'center', alignItems: 'center'}}>
                    <Image source={require('@/assets/cats/paw_white.png')} style={{height: 16, width: 16, transform: 'rotate(20deg)', marginRight: 6}}/>
                    <Text style={styles.cat_title}>Library Cat</Text>
                </View>

                <View style={{flex: 1, width: '100%', marginTop: 30}}>

                    <View>
                        {showText1 && <TypingText text='"Meow~ Welcome to CatCompanion."' speed={50} fade={showLoad}/>}
                    </View>
        
                    <View style={{marginTop: 20, marginBottom: 20}}>
                        {showLoad && <LoadingDots />}
                    </View>

                    <View style={{marginTop: 40}}>
                        {showText2 && <TypingText text='"Dont look at me like that— we have some work to do."' speed={50} fade={false}/>}
                    </View>

                </View>

                <View style={{marginTop: 40}}>
                    {showButton && <ContinueArrow />}
                </View>
                
            </View>
        </View>
    );
};

export default CatIntroLogin;

const styles = StyleSheet.create({
    cat_circle: {
        height: 210,
        width: 210,
        borderRadius: 230,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cat_image: {
        marginTop: 10
    },
    cat_title: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold'
    }
});

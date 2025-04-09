import { View, StyleSheet, TouchableOpacity } from "react-native"
import React, { useEffect, useState } from 'react';
import { useRouter } from "expo-router";

import TextInputBox from '@/components/TextInputBox'
import ProgressBar from '@/components/ProgressBar'
import ScreenFill from '@/components/ScreenFill'

import Email from '@/assets/svgs/email.svg'
import Password from '@/assets/svgs/password.svg'
import Google from '@/assets/svgs/Google.svg'

import CatButton from "@/components/CatButton"
import FontText from "@/components/FontText"

export default function loginPage() {

    const [fillScreen, setFillScreen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (!fillScreen) return;
        setTimeout(() => {
            router.push('/(main)/adventures');
        }, 1250)
    }, [fillScreen])

    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FDFDFD', position: 'relative'}}>

            {/* Conditional rendering of the animated component */}

            {fillScreen && <ScreenFill />}
                

            <View style={styles.header_bar}>
                <ProgressBar progress={0} barLength={50}/>
            </View>

            <View style={{flex: 1, width: '90%', justifyContent: 'center', alignItems: 'center'}}>

                <View style={{width: '100%'}}><TextInputBox SvgItem={Email} placeholderText={'Email'}/></View>
                <View style={{width: '100%', marginTop: 12}}><TextInputBox SvgItem={Password} placeholderText={'Password'} /></View>
                <View style={{width: '100%', marginTop: 24}}><CatButton executeFunction={() => setFillScreen(prev => !prev)}/></View>

                <View style={{flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 36, marginBottom: 36}}>
                    <View style={styles.line_divider}/>
                    <FontText style={{fontSize: 14, width: '40%', textAlign: 'center'}}>Or sign in with Google</FontText>
                    <View style={styles.line_divider}/>
                </View>

                <TouchableOpacity style={[styles.google_button, {flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}]}>
                    <Google />
                    <FontText style={{marginLeft: 12}}>Sign in with Google</FontText>
                </TouchableOpacity>

            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    header_bar: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F9F9F9',
        borderTopRightRadius: '0.8rem',
        borderTopLeftRadius: '0.8rem',
        width: '100%',
        height: '8%'
    },
    line_divider: {
        backgroundColor: '#CDD8EA',
        height: 1,
        width: '30%'
    },
    google_button: {
        borderColor: '#CDD8EA',
        borderWidth: 1,
        borderRadius: '0.8rem',
        padding: 16,
        width: '100%'
    }
})
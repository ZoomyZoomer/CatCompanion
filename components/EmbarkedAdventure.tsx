import { Image, StyleSheet, Text, View } from "react-native"
import React from "react"

import Star from '@/assets/svgs/star_filled_dark.svg'
import Bolt from '@/assets/svgs/bolt_filled_dark.svg'

type Adventure = {
    name: string
}

type EmbarkedAdventureTypes = {
    adventure: Adventure | null
}

const EmbarkedAdventure = ({adventure} : EmbarkedAdventureTypes) => {
    return (
        <View style={[styles.adventure_container, {borderColor: adventure ? '#FCAD72' : '#CDD8EA'}]}>

            <View style={[styles.adventure_banner, {backgroundColor: adventure ? '#FCAD72' : '#E4E7EC'}]}>
                <View style={styles.adventure_circle}>
                    <Image source={require('@/assets/pngs/swords.png')} style={styles.banner_icon}/>
                </View>
            </View>

            <View style={{width: '78%', flexDirection: 'row', alignItems: 'center'}}>

                <View style={{marginLeft: 20, justifyContent: 'center', width: '75%', boxSizing: 'border-box'}}>

                    <Text style={styles.adventure_title}>{adventure ? adventure.name : 'Empty Adventure Slot'} · {adventure ? 'Active' : 'Inactive'}</Text>
                    <Text style={styles.adventure_desc}><strong>Tap</strong> for a random adventure or select one below~</Text>

                    <View style={styles.adventure_tag}>
                        <Star />
                        <Text style={styles.adventure_tag_text}>Get random adventure</Text>
                    </View>

                </View>
                
                <View style={{width: '25%', marginLeft: -20, height: '100%', alignItems: 'center'}}>
                    <View style={styles.adventure_status_bar}>
                        <Bolt style={styles.bolt_icon}/>
                    </View>
                </View>

            </View>

            <Image source={require('@/assets/cats/cat_sleep.png')} style={styles.cat_sleep_icon}/>

        </View>
    )
}

export default EmbarkedAdventure

const styles = StyleSheet.create({
    adventure_container: {
        borderWidth: 1,
        borderStyle: 'dashed',
        borderRadius: '0.8rem',
        flexDirection: 'row',
        position: 'relative',
        width: '100%',
        height: 130
    },
    adventure_banner: {
        height: '100%',
        width: '22%',
        borderTopLeftRadius: '0.8rem',
        borderBottomLeftRadius: '0.8rem',
        justifyContent: 'center',
        alignItems: 'center'
    },
    adventure_circle: {
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
        width: 60,
        borderRadius: 60
    },
    adventure_title: {
        color: '#7C889A',
        fontWeight: '500',
        fontSize: 14,
        fontFamily: 'Poppins'
    },
    adventure_desc: {
        color: '#C8C4C3',
        fontSize: 12,
        marginTop: 4,
        width: '70%',
        fontFamily: 'Poppins'
    },
    adventure_tag: {
        borderColor: '#E4E7EC',
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: '0.8rem',
        width: '70%',
        height: 24,
        marginTop: 12,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        paddingLeft: 10,
        paddingRight: 10,

    },
    adventure_tag_text: {
        color: '#7C889A',
        fontSize: 12,
        marginLeft: 6,
        fontFamily: 'Poppins'
    },
    adventure_status_bar: {
        backgroundColor: '#E4E7EC',
        width: 7,
        borderRadius: '0.8rem',
        height: '55%',
        marginLeft: 10,
        marginTop: 20,
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center'
    },
    bolt_icon: {
        position: 'absolute',
        top: '110%'
    },
    banner_icon: {
        height: 36,
        width: 36,
        filter: 'grayscale(0.6)'
    },
    cat_sleep_icon: {
        position: 'absolute',
        height: 40,
        width: 80,
        right: 20,
        bottom: '96%'
    }
})
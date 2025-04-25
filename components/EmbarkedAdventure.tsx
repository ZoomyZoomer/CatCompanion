import { Image, StyleSheet, Text, View } from "react-native"
import React, { useEffect, useState } from "react"

import Star from '@/assets/svgs/star_filled_dark.svg'
import StarLight from '@/assets/svgs/star_filled.svg'
import Bolt from '@/assets/svgs/bolt_filled_dark.svg'
import axios from "axios"

const EmbarkedAdventure = ({ refresh, adventureSet } : any) => {

    const [activeAdventure, setActiveAdventure] = useState(null);

    const fetchActiveAdventure = async() => {

        const res = await axios.get('http://10.72.104.118:5000/fetchActiveAdventure', {
            params: {
                uid: 0
            }
        })

        setActiveAdventure(res.data);

    }

    useEffect(() => {
        fetchActiveAdventure();
    }, [refresh])

    const pathColors = [
        {main: '#F074CF', tag: '#FEC1EE', bubble: '#FFE1F7', bg: '#FCFCFC'},
        {main: '#72BEFC', tag: '#A0D4FF', bubble: '#D6EDFF', bg: '#F6F9FB'}
    ]

    return (
        <View style={[styles.adventure_container, {borderColor: activeAdventure ? pathColors[activeAdventure?.pathIndex]?.main : '#CDD8EA'}]}>

            <View style={[styles.adventure_banner, {backgroundColor: activeAdventure ? pathColors[activeAdventure?.pathIndex]?.tag : '#E4E7EC'}]}>
                <View style={styles.adventure_circle}>
                    <Image source={!activeAdventure ? require('@/assets/pngs/swords.png') : adventureSet[activeAdventure?.cid]?.paths[activeAdventure?.cpid]?.Icon} style={!activeAdventure ? styles.banner_icon : styles.banner_icon_active}/>
                </View>
            </View>

            <View style={{width: '78%', flexDirection: 'row', alignItems: 'center'}}>

                <View style={{marginLeft: 20, justifyContent: 'center', width: '75%', boxSizing: 'border-box'}}>

                    <Text style={styles.adventure_title}>{activeAdventure ? adventureSet[activeAdventure?.cid]?.paths[activeAdventure?.cpid]?.name : 'Empty Adventure Slot'}</Text>
                    {!activeAdventure && <Text style={styles.adventure_desc}><Text style={{fontWeight: 600}}>Tap</Text> for a random adventure or select one below~</Text>}
                    {activeAdventure && <Text style={styles.adventure_desc}>
                        <Text style={{fontWeight: 600}}>{adventureSet[activeAdventure?.cid]?.paths[activeAdventure?.cpid]?.optionsLabels[activeAdventure?.pathIndex]?.label}: </Text>
                        {adventureSet[activeAdventure?.cid]?.paths[activeAdventure?.cpid]?.options[activeAdventure?.pathIndex].map((label, index) => (
                            <>
                                {label?.name}{index <= 2 ? `, ` : ''}
                            </>
                        ))}
                    </Text>}

                    <View style={[styles.adventure_tag, {borderColor: activeAdventure ? pathColors[activeAdventure?.pathIndex]?.tag : '#E4E7EC', backgroundColor: activeAdventure ? pathColors[activeAdventure?.pathIndex]?.tag : 'white'}]}>
                        
                        {!activeAdventure && (
                            <>
                                <Star />
                                <Text style={styles.adventure_tag_text}>Get random adventure</Text>
                            </>
                        )}

                        {activeAdventure && (
                            <>
                                <StarLight style={styles.starIcon}/>
                                <Text style={{color: 'white', fontWeight: 400, fontSize: 10, marginLeft: 2}}><Text style={{fontWeight: 500}}>Next Up: </Text>{adventureSet[activeAdventure?.cid]?.paths[activeAdventure?.cpid]?.options[activeAdventure?.pathIndex][activeAdventure?.numCompleted]?.name}</Text>
                            </>
                        )}
                        
                    </View>

                </View>
                
                <View style={{width: '25%', marginLeft: -20, height: '100%', alignItems: 'center'}}>
                    <View style={styles.adventure_status_bar}>
                    <Bolt style={{ ...styles.bolt_icon, color: !activeAdventure ? '#52637D' : pathColors[activeAdventure?.pathIndex]?.tag }} />
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
        height: 115
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
        height: 54,
        width: 54,
        borderRadius: 54
    },
    adventure_title: {
        color: '#7C889A',
        fontWeight: '500',
        fontSize: 12
    },
    adventure_desc: {
        color: '#AFAFAF',
        fontSize: 10,
        marginTop: 4,
        width: '80%'
    },
    adventure_tag: {
        borderColor: '#E4E7EC',
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: '0.8rem',
        width: '84%',
        height: 24,
        marginTop: 12,
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: 10,
        paddingRight: 10,

    },
    adventure_tag_text: {
        color: '#7C889A',
        fontSize: 10,
        marginLeft: 6
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
        top: '110%',
        transform: 'rotate(20deg)'
    },
    banner_icon: {
        height: 32,
        width: 32,
        filter: 'grayscale(0.6)'
    },
    banner_icon_active: {
        height: 32,
        width: 32
    },
    cat_sleep_icon: {
        position: 'absolute',
        height: 40,
        width: 80,
        right: 20,
        bottom: '96%'
    },
    starIcon: {
        height: 14,
        width: 14
    }
})
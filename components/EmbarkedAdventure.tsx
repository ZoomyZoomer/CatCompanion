import { StyleSheet, Text, View } from "react-native"
import Star from '@/assets/svgs/star_filled_dark.svg'
import Bolt from '@/assets/svgs/bolt_filled_dark.svg'

const EmbarkedAdventure = () => {
    return (
        <View style={styles.adventure_container_inactive}>

            <View style={styles.adventure_banner}>
                <View style={styles.adventure_circle}/>
            </View>

            <View style={{width: '78%', flexDirection: 'row', alignItems: 'center'}}>

                <View style={{marginLeft: 20, justifyContent: 'center', width: '75%', boxSizing: 'border-box'}}>

                    <Text style={styles.adventure_title}>Empty Adventure Slot ·  Inactive</Text>
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


        </View>
    )
}

export default EmbarkedAdventure

const styles = StyleSheet.create({
    adventure_container_inactive: {
        borderWidth: 1,
        borderColor: '#CDD8EA',
        borderStyle: 'dashed',
        borderRadius: '0.8rem',
        flexDirection: 'row',
        width: '100%',
        height: 130
    },
    adventure_banner: {
        height: '100%',
        width: '22%',
        backgroundColor: '#E4E7EC',
        borderTopLeftRadius: '0.8rem',
        borderBottomLeftRadius: '0.8rem',
        justifyContent: 'center',
        alignItems: 'center'
    },
    adventure_circle: {
        backgroundColor: 'white',
        height: 60,
        width: 60,
        borderRadius: 60
    },
    adventure_title: {
        color: '#7C889A',
        fontWeight: '500',
        fontSize: 14
    },
    adventure_desc: {
        color: '#C8C4C3',
        fontSize: 12,
        marginTop: 4,
        width: '70%'
    },
    adventure_tag: {
        borderColor: '#E4E7EC',
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: '0.8rem',
        width: '82%',
        height: 24,
        marginTop: 12,
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: 10,
        paddingRight: 10
    },
    adventure_tag_text: {
        color: '#7C889A',
        fontSize: 12,
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
        top: '110%'
    }
})
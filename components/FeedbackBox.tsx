import React from "react"
import { StyleSheet, TouchableOpacity, Text, TextInput, View } from "react-native"

import Close from '@/assets/svgs/close.svg'
import Clipboard from '@/assets/svgs/clipb.svg'

const FeedbackBox = ({ setShowFeedback } : any) => {
    return (
        <View style={styles.popup_container}>
            <View style={{height: '100%', width: '100%', position: 'relative', alignItems: 'center'}}>
            <View style={styles.popup_header}>

                <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%', position: 'relative' }}>

                <Text style={styles.header_text}>
                    Feedback Box
                </Text>

                <TouchableOpacity style={styles.close} onPress={() => setShowFeedback(false)}>
                    <Close />
                </TouchableOpacity>

                </View>

            </View>

                <View style={{width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 20}}>
                    <View style={styles.feedback_left}>
                        <Clipboard />
                    </View>
                    <View style={styles.feedback_right}>
                        <Text style={{color: '#7C889A'}}>Icon Suggestion</Text>
                    </View>
                </View>

                <View style={{width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 30}}>
                    <View style={{position: 'relative'}}>
                        <TextInput 
                            style={styles.input}
                        />
                        <View style={styles.invis}>
                            <Text style={{color: '#7C889A', marginBottom: -7, fontSize: 16}}>Feedback</Text>
                        </View>
                        <Text style={styles.num_char}>0/50 characters</Text>
                    </View>
                </View>

                <TouchableOpacity style={styles.button}>
                    <Text style={{color: 'white', fontSize: 16, fontWeight: 500}}>Send</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default FeedbackBox

const styles = StyleSheet.create({
    popup_container: {
        height: '40%',
        width: '80%',
        backgroundColor: '#FDFDFD',
        borderRadius: 8,
        position: 'absolute',
        alignItems: 'center',
        zIndex: 999
      },
      popup_header: {
        backgroundColor: '#F9F9F9',
        height: 75,
        width: '100%',
        borderTopRightRadius: 8,
        borderTopLeftRadius: 8,
        justifyContent: 'center',
        alignItems: 'center'
      },
      header_text: {
        color: '#52637D',
        fontSize: 16,
        fontWeight: '500'
      },
      header_subtext: {
        color: '#AFAEAE',
        fontSize: 12
      },
      close: {
        position: 'absolute',
        right: '7%',
        top: '-10%',
        zIndex: 999
      },
      feedback_left: {
        borderWidth: 1,
        borderColor: '#CDD8EA',
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
        height: 46,
        width: 56,
        backgroundColor: '#FCFCFC',
        justifyContent: 'center',
        alignItems: 'center'
      },
      feedback_right: {
        borderWidth: 1,
        borderColor: '#D9D9D9',
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
        borderLeftWidth: 0,
        height: 46,
        paddingLeft: 14,
        paddingRight: 14,
        width: 220,
        backgroundColor: 'white',
        justifyContent: 'center',
      },
      input: {
        borderColor: '#D9D9D9',
        borderWidth: 1,
        borderRadius: 8,
        backgroundColor: 'white',
        width: 276,
        height: 70
      },
      invis: {
        position: 'absolute',
        height: 20,
        width: 80,
        backgroundColor: '#FDFDFD',
        left: 20,
        top: -18,
        alignItems: 'center',
        justifyContent: 'flex-end'
      },
      num_char: {
        position: 'absolute',
        right: 10,
        bottom: 4,
        color: '#D9D9D9',
        fontSize: 12
      },
      button: {
        backgroundColor: '#FCAD72',
        borderRadius: 40,
        width: 140,
        height: 54,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 26
      }
})
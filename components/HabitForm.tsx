import React, { useState } from "react"
import { Switch, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import Chevron from '@/assets/svgs/chevron_down.svg'

const HabitForm = ({ setValidEntry } : any) => {

    const [isEnabled, setIsEnabled] = useState(false);
    const [type, setType] = useState('time');
    setValidEntry(true);

    return (
                <View style={{width: '100%', padding: 30}}>

                    <Text style={{color: '#52637D', marginLeft: 10, fontWeight: 500, marginBottom: 6}}>Name of Habit</Text>
                    <TextInput 
                        placeholder="Play Tennis.. (Max 20 char)"
                        placeholderTextColor='#ACACAC'
                        style={styles.input}
                    />

                    <Text style={{color: '#52637D', marginLeft: 10, fontWeight: 500, marginBottom: 6, marginTop: 20}}>
                        Tags
                        <Text style={{color: '#ACACAC', fontSize: 12, marginLeft: 4}}>{`(Separate by comma)`}</Text>
                    </Text>
                    <TextInput 
                        placeholder="Exercise, sports, outdoors, ..."
                        placeholderTextColor='#ACACAC'
                        style={[styles.input, {height: 90, paddingTop: 10}]}
                        multiline={true}
                        textAlignVertical="top"
                    />

                        <View style={{marginTop: 40, width: '100%', position: 'relative', justifyContent: 'center'}}>
                            <Text style={{color: '#52637D', marginLeft: 10, fontWeight: 500}}>Type of Habit</Text>
                            <View style={{position: 'absolute', right: 0, flexDirection: 'row'}}>
                                <TouchableOpacity style={[type === 'quantity' ? styles.labelActive : styles.label, {marginRight: 4}]} onPress={() => setType('quantity')}>
                                    <Text style={{color: type === 'quantity' ? 'white' : '#52637D'}}>Quantity</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={type === 'time' ? styles.labelActive : styles.label} onPress={() => setType('time')}>
                                    <Text style={{color: type === 'time' ? 'white' : '#52637D'}}>Time</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                    
                        <View style={{marginTop: 26, width: '100%', position: 'relative', justifyContent: 'center'}}>
                            <Text style={{color: '#52637D', marginLeft: 10, fontWeight: 500}}>Amount</Text>
                            <View style={{position: 'absolute', right: 0, flexDirection: 'row'}}>
                                <TextInput 
                                    style={[styles.input, {width: 40, height: 30, paddingLeft: 0, textAlign: 'center',}]}
                                    placeholder="0"
                                    placeholderTextColor='#ACACAC'
                                />
                                <TouchableOpacity style={[styles.label, {height: 30, marginLeft: 6, borderRadius: 4, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}]}>
                                    <Text style={{color: '#52637D'}}>min.</Text>
                                    <Chevron stroke='#52637D' style={{marginTop: 2, marginLeft: 4}}/>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={{marginTop: 40, width: '100%', position: 'relative', justifyContent: 'center'}}>
                            <Text style={{color: '#52637D', marginLeft: 10, fontWeight: 500}}>Frequency</Text>
                            <View style={{position: 'absolute', right: 0, top: -5, flexDirection: 'row'}}>
                                <TouchableOpacity style={[styles.label, {borderRadius: 20, paddingLeft: 12, paddingRight: 12, marginRight: 4}]}><Text style={{color: '#52637D', fontSize: 12}}>Sunday</Text></TouchableOpacity >
                                <TouchableOpacity  style={[styles.label, {borderRadius: 20, paddingLeft: 12, paddingRight: 12, marginRight: 4}]}><Text style={{color: '#52637D', fontSize: 12}}>Monday</Text></TouchableOpacity >
                                <TouchableOpacity  style={[styles.label, {borderRadius: 20, paddingLeft: 12, paddingRight: 12}]}><Text style={{color: '#52637D', fontSize: 12}}>Tuesday</Text></TouchableOpacity >
                            </View>
                            <View style={{marginTop: 14, flexDirection: 'row', width: '100%', justifyContent: 'right'}}>
                                <TouchableOpacity  style={[styles.label, {borderRadius: 20, paddingLeft: 12, paddingRight: 12, marginRight: 4}]}><Text style={{color: '#52637D', fontSize: 12}}>Wednesday</Text></TouchableOpacity >
                                <TouchableOpacity  style={[styles.label, {borderRadius: 20, paddingLeft: 12, paddingRight: 12, marginRight: 4}]}><Text style={{color: '#52637D', fontSize: 12}}>Thursday</Text></TouchableOpacity >
                                <TouchableOpacity  style={[styles.label, {borderRadius: 20, paddingLeft: 12, paddingRight: 12, marginRight: 4}]}><Text style={{color: '#52637D', fontSize: 12}}>Friday</Text></TouchableOpacity >
                                <TouchableOpacity  style={[styles.label, {borderRadius: 20, paddingLeft: 12, paddingRight: 12}]}><Text style={{color: '#52637D', fontSize: 12}}>Saturday</Text></TouchableOpacity >
                            </View>
                        </View>

                        <View style={{marginTop: 40, width: '100%', position: 'relative', justifyContent: 'center'}}>
                            <Text style={{color: '#52637D', marginLeft: 10, fontWeight: 500}}>Notification Reminder</Text>
                            <View style={{position: 'absolute', right: 0}}>
                                <Switch
                                    trackColor={{ false: '#E8ECF1', true: '#FCAD72' }}
                                    thumbColor={isEnabled ? 'white' : 'white'}
                                    onValueChange={() => setIsEnabled(prev => !prev)}
                                    value={isEnabled}
                                />
                            </View>
                        </View>

                </View>
    )
}

export default HabitForm

const styles = StyleSheet.create({
input: {
        borderColor: '#E4E7EC',
        borderWidth: 1,
        width: '100%',
        height: 40,
        borderRadius: 4,
        backgroundColor: 'white',
        paddingLeft: 16
      },
      label: {
        borderColor: '#CDD8EA',
        borderWidth: 1,
        borderRadius: 8,
        padding: 6,
        paddingLeft: 12,
        paddingRight: 12,
        backgroundColor: 'white'
      },
      labelActive: {
        borderColor: '#F89E5B',
        borderWidth: 1,
        borderRadius: 8,
        padding: 6,
        paddingLeft: 12,
        paddingRight: 12,
        backgroundColor: '#FCAD72'
      },
      box: {
        borderColor: '#CDD8EA',
        borderWidth: 1,
        borderRadius: 8,
        marginTop: 26
      }
})
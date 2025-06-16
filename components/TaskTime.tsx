import React from "react"
import { StyleSheet, Text, View } from "react-native"

import Arrow from '@/assets/svgs/up-arrow.svg'

const TaskTime = () => {

    const data = [
        60, 40, 20, 180, 90, 30, 60, 68, 40, 43, 65, 6, 92, 56, 70, 60, 10, 20, 130, 90, 30, 10, 68, 40, 73, 90, 41, 92, 26, 90, 23
    ]

    return (
        <View style={styles.stat_container}>

            <Text style={{color: '#52637D', fontWeight: 500, fontSize: 16}}>Task Time</Text>

            <View style={{width: '100%', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', marginTop: 26}}>
                <View style={styles.average_box}>
                    <Text style={{color: '#8394AE', fontSize: 12}}>Avg Duration</Text>
                    <Text style={{color: '#52637D', fontSize: 14, fontWeight: 500}}>48 minutes</Text>
                    <View style={styles.empty_fill}>
                        <View style={styles.fill}/>
                    </View>
                    <View style={styles.status}>
                        <Arrow />
                    </View>
                </View>
                <View style={styles.average_box}>
                    <Text style={{color: '#8394AE', fontSize: 12}}>Highest Time</Text>
                    <Text style={{color: '#52637D', fontSize: 14,fontWeight: 500}}>180 minutes</Text>
                    <View style={styles.empty_fill}>
                        <View style={[styles.fill, {height: '100%'}]}/>
                    </View>
                </View>
            </View>

            <View style={{width: '100%', marginTop: 30, flexDirection: 'row'}}>
                <View style={{height: '100%', width: 46}}/>
                <View style={styles.graph_box}>

                    <View style={[styles.graph_dash, {top: '16.67%'}]}>
                        <View style={{position: 'relative', height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{position: 'absolute', right: '103%', color: '#8394AE', width: 44, textAlign: 'right', fontSize: 12}}>2.5 hrs.</Text>
                        </View>
                    </View>
                    <View style={[styles.graph_dash, {top: '33.3%'}]}>
                        <View style={{position: 'relative', height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{position: 'absolute', right: '103%', color: '#8394AE', width: 44, textAlign: 'right', fontSize: 12}}>2 hrs.</Text>
                        </View>
                    </View>
                    <View style={[styles.graph_dash, {top: '50.1%'}]}>
                        <View style={{position: 'relative', height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{position: 'absolute', right: '103%', color: '#8394AE', width: 44, textAlign: 'right', fontSize: 12}}>1.5 hrs.</Text>
                        </View>
                    </View>
                    <View style={[styles.graph_dash, {top: '66.68%'}]}>
                        <View style={{position: 'relative', height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{position: 'absolute', right: '103%', color: '#8394AE', width: 44, textAlign: 'right', fontSize: 12}}>1 hr.</Text>
                        </View>
                    </View>
                    <View style={[styles.graph_dash, {top: '83.35%'}]}>
                        <View style={{position: 'relative', height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{position: 'absolute', right: '103%', color: '#8394AE', width: 44, textAlign: 'right', fontSize: 12}}>30 min</Text>
                        </View>
                    </View>

                    <View style={{width: '100%', height: '100%', justifyContent: 'flex-start', alignItems: 'flex-end', flexDirection: 'row', paddingLeft: 16, paddingRight: 16}}>
                        {data.map((val: number) => (
                            <View style={[styles.data_bar, {backgroundColor: val < 60 ? '#FFE3CE' : val < 90 ? 'rgb(251, 200, 149)' : 'rgb(252, 173, 114)' ,height: `${(val / 180) * 100}%`}]}/>
                        ))}
                    </View>

                    <View style={styles.dates}>
                        <Text style={{color: '#8394AE', fontSize: 12}}>6/1</Text>
                        <Text style={{color: '#8394AE', fontSize: 12}}>6/6</Text>
                        <Text style={{color: '#8394AE', fontSize: 12}}>6/11</Text>
                        <Text style={{color: '#8394AE', fontSize: 12}}>6/16</Text>
                        <Text style={{color: '#8394AE', fontSize: 12}}>6/21</Text>
                        <Text style={{color: '#8394AE', fontSize: 12}}>6/26</Text>
                        <Text style={{color: '#8394AE', fontSize: 12}}>7/1</Text>
                    </View>

                </View>
            </View>

            <View style={styles.info_box}>
                <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', position: 'relative'}}>
                    <View style={{height: 12, width: 12, borderRadius: 4, backgroundColor: '#FFE3CE'}}/>
                    <Text style={{color: '#77879F', marginLeft: 6, fontSize: 12, fontWeight: 500}}>Less than 1hr.</Text>
                    <Text style={{color: '#ACB6C6', position: 'absolute', right: 0, fontSize: 12}}>
                        <Text style={{color: '#52637D', fontWeight: 500}}>24</Text> / 30 days
                    </Text>
                </View>
                <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', position: 'relative', marginTop: 8}}>
                    <View style={{height: 12, width: 12, borderRadius: 4, backgroundColor: 'rgb(251, 200, 149)'}}/>
                    <Text style={{color: '#77879F', marginLeft: 6, fontSize: 12, fontWeight: 500}}>Over 1hr.</Text>
                    <Text style={{color: '#ACB6C6', position: 'absolute', right: 0, fontSize: 12}}>
                        <Text style={{color: '#52637D', fontWeight: 500}}>20</Text> / 30 days
                    </Text>
                </View>
                <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', position: 'relative', marginTop: 8}}>
                    <View style={{height: 12, width: 12, borderRadius: 4, backgroundColor: '#FCAD72'}}/>
                    <Text style={{color: '#77879F', marginLeft: 6, fontSize: 12, fontWeight: 500}}>Over 1.5hrs.</Text>
                    <Text style={{color: '#ACB6C6', position: 'absolute', right: 0, fontSize: 12}}>
                        <Text style={{color: '#52637D', fontWeight: 500}}>6</Text> / 30 days
                    </Text>
                </View>
            </View>

        </View>
    )
}

export default TaskTime

const styles = StyleSheet.create({
    stat_container: {
        borderColor: '#CDD8EA',
        borderWidth: 1,
        borderRadius: 8,
        backgroundColor: 'white',
        justifyContent: 'center',
        padding: 18,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 18,
        width: '100%'
    },
    average_box: {
        borderColor: '#CDD8EA',
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        paddingLeft: 12,
        width: '47%',
        justifyContent: 'center'
    },
    graph_box: {
        borderColor: '#D9D9D9',
        borderWidth: 1,
        borderRadius: 4,
        height: 180,
        position: 'relative',
        flex: 1
    },
    graph_dash: {
        borderWidth: 1,
        borderColor: '#F1F1F1',
        borderStyle: 'dashed',
        width: '100%',
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center'
    },
    dates: {
        position: 'absolute',
        top: '105%',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: 10,
        paddingRight: 10
    },
    data_bar: {
        width: 7,
        backgroundColor: 'rgb(251, 200, 149)',
        borderTopRightRadius: 8,
        borderTopLeftRadius: 8,
        marginRight: 1
    },
    empty_fill: {
        backgroundColor: '#E8ECF1',
        width: 6,
        height: '75%',
        position: 'absolute',
        right: 12,
        borderRadius: 8,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    fill: {
        backgroundColor: '#FCAD72',
        width: '100%',
        borderRadius: 8,
        height: '20%'
    },
    status: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        borderRadius: '100%',
        left: -10,
        top: -10,
        backgroundColor: 'white'
    },
    info_box: {
        borderColor: '#E6E6E6',
        borderWidth: 1,
        borderRadius: 8,
        width: '100%',
        marginTop: 50,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#FCFCFC'
    }
})
import { StyleSheet, Text, View } from "react-native"
import Fish from '@/assets/svgs/fish.svg'
import React from "react";

type navbarTypes = {
    tabName: string;
    currencyAmount: number;
}

const Navbar = ({tabName, currencyAmount} : navbarTypes) => {
    return (
        <View style={styles.navbar_container}>
            <Text style={styles.navbar_title}>{tabName}</Text>
            <View style={styles.currency_container}>
                <Text style={styles.currency_text}>{currencyAmount}</Text>
                <Fish style={styles.fish}/>
            </View>
        </View>
    )
}

export default Navbar

const styles = StyleSheet.create({
    navbar_container: {
        backgroundColor: 'white',
        width: '100%',
        borderTopRightRadius: '0.8rem',
        borderTopLeftRadius: '0.8rem',
        borderBottomWidth: 1,
        borderBottomColor: '#CDD8EA',
        justifyContent: 'center',
        alignItems: 'center',
        height: 70,
        position: 'relative'
    },
    navbar_title: {
        color: '#52637D',
        fontSize: 16,
        fontWeight: '600'
    },
    currency_container: {
        borderColor: '#CDD8EA',
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: '0.8rem',
        position: 'absolute',
        backgroundColor: '#F9F9F9',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        height: 26,
        width: 90,
        right: 20
    },
    currency_text: {
        color: '#52637D',
        marginRight: 6,
        fontSize: 14,
        fontWeight: '600'
    },
    fish: {
        height: 26,
        width: 26
    }
})
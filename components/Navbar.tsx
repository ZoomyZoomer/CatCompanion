import { StyleSheet, Text, View } from "react-native"
import Fish from '@/assets/svgs/fish.svg'

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
                <Fish />
            </View>
        </View>
    )
}

export default Navbar

const styles = StyleSheet.create({
    navbar_container: {
        backgroundColor: '#F9F9F9',
        width: '100%',
        borderTopRightRadius: '0.8rem',
        borderTopLeftRadius: '0.8rem',
        justifyContent: 'center',
        alignItems: 'center',
        height: 80,
        position: 'relative'
    },
    navbar_title: {
        color: '#52637D',
        fontSize: 18,
        fontWeight: '600'
    },
    currency_container: {
        borderColor: '#CDD8EA',
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: '0.8rem',
        position: 'absolute',
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        height: 30,
        width: 100,
        right: 34
    },
    currency_text: {
        color: '#52637D',
        marginRight: 6,
        fontSize: 16,
        fontWeight: '600'
    }
})
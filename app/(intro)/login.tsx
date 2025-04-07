import { View, StyleSheet } from "react-native"
import TextInput from '@/components/TextInput'
import ProgressBar from '@/components/ProgressBar'

export default function loginPage() {
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FDFDFD'}}>

            <View style={styles.header_bar}>
                <ProgressBar progress={65} barLength={50}/>
            </View>

            <View style={{flex: 1, width: '80%', justifyContent: 'center', alignItems: 'center'}}>
                <TextInput />
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
    }
})
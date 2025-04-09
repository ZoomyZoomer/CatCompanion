import { View, StyleSheet, TouchableOpacity } from "react-native"
import CatSelectNavbarItem from "./CatSelectNavbarItem"
import KeyEmpty from '@/assets/svgs/key_empty.svg'
import KeyFilled from '@/assets/svgs/key_filled.svg'
import EmojiEmpty from '@/assets/svgs/emoji_empty.svg'
import EmojiFilled from '@/assets/svgs/emoji_filled.svg'
import StarEmpty from '@/assets/svgs/star_empty.svg'
import StarFilled from '@/assets/svgs/star_filled.svg'
import { useState } from "react"

const CatSelectNavbar = () => {

    const[activeTab, setActiveTab] = useState(0);

    return (
        <View style={styles.navbar_container}>

            <TouchableOpacity style={{height: '80%', width: '30%', justifyContent: activeTab === 0 ? 'flex-start' : 'flex-end', marginLeft: 2, marginRight: 2}} onPress={() => setActiveTab(0)}>
                <CatSelectNavbarItem isActive={activeTab === 0} Icon={activeTab === 0 ? KeyFilled : KeyEmpty} tabName={'Solo'}/>
            </TouchableOpacity>

            <TouchableOpacity style={{height: '80%', width: '30%', justifyContent: activeTab === 1 ? 'flex-start' : 'flex-end', marginLeft: 2, marginRight: 2}} onPress={() => setActiveTab(1)}>
                <CatSelectNavbarItem isActive={activeTab === 1} Icon={activeTab === 1 ? EmojiFilled : EmojiEmpty} tabName={'Group'}/>
            </TouchableOpacity>

            <TouchableOpacity style={{height: '80%', width: '30%', justifyContent: activeTab === 2 ? 'flex-start' : 'flex-end', marginLeft: 2, marginRight: 2}} onPress={() => setActiveTab(2)}>
                <CatSelectNavbarItem isActive={activeTab === 2} Icon={activeTab === 2 ? StarFilled : StarEmpty} tabName={'Exclusive'}/>
            </TouchableOpacity>

        </View>
    )
}

export default CatSelectNavbar

const styles = StyleSheet.create({
    navbar_container: {
        height: 100,
        width: '100%',
        borderBottomWidth: 1,
        borderColor: '#CDD8EA',
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center'
    }
})
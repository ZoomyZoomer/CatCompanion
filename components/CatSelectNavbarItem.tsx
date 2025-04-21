import { FunctionComponent } from "react";
import React = require("react");
import { Image, View, Text, StyleSheet } from "react-native"
import { SvgProps } from "react-native-svg";

type navbarItemTypes = {
    isActive: boolean;
    Icon: FunctionComponent<SvgProps>;
    tabName: string
}

const CatSelectNavbarItem = ({isActive, Icon, tabName} : navbarItemTypes) => {
    return (
        <View style={isActive ?  styles.item_container_active : styles.item_container_inactive}>

            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <Icon style={styles.icons}/>
                <Text style={isActive ? styles.tab_text_active : styles.tab_text_inactive}>{tabName}</Text>
            </View>

            {isActive && <Image source={require('@/assets/cats/cat_hang.png')} style={styles.cat_hang}/>}

        </View>
    )
}

export default CatSelectNavbarItem

const styles = StyleSheet.create({
    item_container_active: {
        backgroundColor: '#FCAD72',
        borderTopRightRadius: '0.8rem',
        borderTopLeftRadius: '0.8rem',
        width: '100%',
        height: '100%',
        padding: 12,
        position: 'relative'
    },
    item_container_inactive: {
        backgroundColor: 'transparent',
        borderTopRightRadius: '0.8rem',
        borderTopLeftRadius: '0.8rem',
        borderColor: '#CDD8EA',
        borderWidth: 1,
        width: '100%',
        height: '60%',
        borderBottomWidth: 0,
        padding: 12
    },
    tab_text_active: {
        color: 'white',
        fontWeight: '700',
        fontSize: 14,
        marginLeft: 6
    },
    tab_text_inactive: {
        color: '#52637D',
        fontSize: 14,
        marginLeft: 6
    },
    cat_hang: {
        position: 'absolute',
        bottom: '92%',
        left: 10
    },
    icons: {
        height: 22,
        width: 22
    }
})
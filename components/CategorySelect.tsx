import React from "react"
import { StyleSheet, Text, TouchableOpacity } from "react-native"

type CategorySelectTypes = {
    category: string;
    id: number;
    activeId: number;
    setActiveId: (arg: number) => (void);
}

const CategorySelect = ({category, id, activeId, setActiveId} : CategorySelectTypes) => {
    <TouchableOpacity style={[styles.category_container, {borderColor: id === activeId ? '#FCAD72' : '#CDD8EA', backgroundColor: id === activeId ? '#FCAD72' : 'white'}]} onPress={() => setActiveId(id)}>
        <Text style={{color: id === activeId ? 'white' : '#52637D' }}>{category}</Text>
    </TouchableOpacity>
}

export default CategorySelect

const styles = StyleSheet.create({
    category_container: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 18,
        paddingRight: 8,
        paddingLeft: 8,
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: '0.8rem'
    },
    category_text: {
        fontSize: 14
    }
})
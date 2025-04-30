import React, { useState } from "react"
import { StyleSheet, View } from "react-native"
import PickMood from "./PickMood"
import InfoSection from "./InfoSection";


const SelectMood = ({setSelectedMood, selectedMood} : any) => {

    return (
        <View style={{ padding: 20 }}>
            <View style={{ flexDirection: "row", width: "100%", justifyContent: "center" }}>
                <PickMood
                image={require("@/assets/cats/angry_cat.png")}
                text="Upset"
                isSelected={selectedMood === "Upset"}
                onPress={() => setSelectedMood("Upset")}
                />
                <PickMood
                image={require("@/assets/cats/sad_cat.png")}
                text="Sad"
                isSelected={selectedMood === "Sad"}
                onPress={() => setSelectedMood("Sad")}
                />
            </View>
            <View style={{ flexDirection: "row", width: "100%", justifyContent: "center" }}>
                <PickMood
                image={require("@/assets/cats/okay_cat.png")}
                text="Okay"
                isSelected={selectedMood === "Okay"}
                onPress={() => setSelectedMood("Okay")}
                />
                <PickMood
                image={require("@/assets/cats/happy_cat.png")}
                text="Happy"
                isSelected={selectedMood === "Happy"}
                onPress={() => setSelectedMood("Happy")}
                />
            </View>

            <InfoSection 
                mainText={'Select'}
                subText={"How are you feeling today? Don't be shy, it's okay to express yourself :)"}
            />

        </View>
    );

}

export default SelectMood

const styles = StyleSheet.create({})
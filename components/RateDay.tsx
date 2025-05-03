import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import React from "react"
import RateItem from "./RateItem"
import InfoSection from "./InfoSection"

const RateDay = ({selectedItems, setRatings, ratings} : any) => {
    return (
        <View style={{ padding: 20, paddingTop: 0, width: '100%', position: 'relative' }}>

            <InfoSection 
                mainText={'What to do'}
                subText={"Pick the top 3 most notable events you experienced today, good or bad."}
            />

            <View style={{ position: 'relative', height: 376, overflowY: 'auto', overflowX: 'hidden', marginTop: 10 }}>

                {selectedItems.map((item: any, index: any) => (
                    <RateItem ind={index} item={item} setRatings={setRatings} ratings={ratings}/>
                ))}

            </View>

        </View>
    )
}

export default RateDay

const styles = StyleSheet.create({

})
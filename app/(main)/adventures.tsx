import { View } from "react-native"
import Navbar from "@/components/Navbar"
import CatSelectNavbar from "@/components/CatSelectNavbar"
import EmbarkedAdventure from "@/components/EmbarkedAdventure"

export default function adventures() {
    return (
        <View style={{flex: 1, backgroundColor: '#FDFDFD', alignItems: 'center'}}>

            <Navbar tabName={"Adventures"} currencyAmount={103}/>
            <CatSelectNavbar />

            <View style={{flex: 1, width: '90%', alignItems: 'center', marginTop: 40}}>
                <EmbarkedAdventure />
            </View>

        </View>
    )
}
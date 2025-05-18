import { Easing, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import React, { useEffect, useState } from "react"

import Close from '@/assets/svgs/close.svg'
import Animated, { useAnimatedStyle, useSharedValue, withSequence, withTiming } from "react-native-reanimated"
import PopupNav from "./PopupNav"
import LogDay from "./LogDay"
import RateDay from "./RateDay"
import SelectMood from "./SelectMood"
import AddPhoto from "./AddPhoto"
import axios from "axios"

const MoodPopup = ({setIsPickingMood, moodDate} : any) => {

    const scale = useSharedValue(0.7)
    
      useEffect(() => {
        scale.value = withSequence(
          withTiming(1.05, { duration: 220, easing: Easing.out(Easing.ease) }),
          withTiming(1, { duration: 180, easing: Easing.out(Easing.ease) })
        )
      }, [])
    
      const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }]
      }))

      const [pageInd, setPageInd] = useState(0);
      const [selectedItems, setSelectedItems] = useState([]);
      const [selectedMood, setSelectedMood] = useState<string | null>(null);
      const [ratings, setRatings] = useState([0,0,0]);
      const [selectedImage, setSelectedImage] = useState<string | null>(null);
      const [captionText, setCaptionText] = useState('');

      const uploadToCloudinary = async (selectedImageUri : any) => {
        const formData = new FormData();
      
        const response = await fetch(selectedImageUri);
        const blob = await response.blob();
      
        formData.append('file', blob);
        formData.append('upload_preset', 'unsigned_mood_uploads');
      
        const cloudRes = await fetch('https://api.cloudinary.com/v1_1/dwyvozk21/image/upload', {
          method: 'POST',
          body: formData,
        });
      
        const data = await cloudRes.json();
        return data.secure_url;
      };
      

      const sendInfo = async() => {

        const relImageLink = await uploadToCloudinary(selectedImage);

        try {

          await axios.post('http://10.0.0.216:5000/sendMood', {
            uid: 0,
            mood: selectedMood,
            selectedItems,
            ratings,
            selectedImage: relImageLink,
            caption: captionText,
            date: moodDate.current
          })

          moodDate.current = new Date();
          setIsPickingMood(false);

        } catch(e) {

        }

      }

      const fetchInfo = async() => {

        const res = await axios.get('http://10.0.0.216:5000/fetchCurrentMood', {
          params: {
            uid: 0,
            date: moodDate.current
          }
        }) 

        if (res.data){

          setSelectedItems([...res.data.logItems.map((thing: any) => thing.item)]);
          setSelectedMood(res.data.mood);
          setRatings([...res.data.logItems.map((thing: any) => thing.rating)]);
          setSelectedImage(res.data.imageUri);
          setCaptionText(res.data.caption);

        }

      }

      useEffect(() => {
        fetchInfo();
      }, [])

    return (
        <Animated.View style={[styles.popup_container, animatedStyle]}>

            <View style={{width: '100%', height: '100%', alignItems: 'center', position: 'relative'}}>
                <View style={styles.popup_header}>

                    <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%', position: 'relative' }}>

                    <Text style={styles.header_text}>
                      {pageInd === 0 ? 'How Do You Feel?' : 
                      pageInd === 1 ? 'Log Your Day' : 
                      pageInd === 2 ? 'Rate Your Day' : 
                      'Add a Photo'}
                    </Text>

                    <Text style={styles.header_subtext}>
                      {pageInd === 0 ? "Express your emotions" : 
                      pageInd === 1 ? 'What did you to today?' : 
                      pageInd === 2 ? 'How did things go today?' : 
                      'Create a memory'}
                    </Text>

                    <TouchableOpacity style={styles.close} onPress={() => {moodDate.current = (new Date()); setIsPickingMood(false)}}>
                        <Close />
                    </TouchableOpacity>

                    </View>

                </View>

                {pageInd === 0 ? <SelectMood setSelectedMood={setSelectedMood} selectedMood={selectedMood}/> :
                 (pageInd === 1 ? <LogDay selectedItems={selectedItems} setSelectedItems={setSelectedItems} /> : 
                 (pageInd === 2 ? <RateDay selectedItems={selectedItems} setRatings={setRatings} ratings={ratings}/> :
                  <AddPhoto selectedImage={selectedImage} setSelectedImage={setSelectedImage} captionText={captionText} setCaptionText={setCaptionText}/>
                 ))}

                <PopupNav 
                  isFilter={pageInd === 0 ? (selectedMood == null) : (pageInd === 1 ? selectedItems.length < 3 : (!ratings[0] || !ratings[1] || !ratings[2]))} 
                  buttonText={(pageInd === 0 ) || (pageInd === 2) ? 'Next' : (pageInd === 1 ? (selectedItems.length < 3 ? `Select ${3 - selectedItems.length} more` : 'Next') : 'Complete')} 
                  setOpenPopup={() => {}} 
                  processPostReq={() => pageInd < 3 ? {} : sendInfo()} 
                  setPage={setPageInd} 
                  selectedItems={selectedItems}
                />

            </View>

        </Animated.View>
    )
}

export default MoodPopup

const styles = StyleSheet.create({
    popup_container: {
        height: '80%',
        width: '90%',
        backgroundColor: '#FDFDFD',
        borderRadius: 8,
        position: 'absolute',
        alignItems: 'center',
        zIndex: 999
      },
      popup_header: {
        backgroundColor: '#F9F9F9',
        height: 75,
        width: '100%',
        borderTopRightRadius: 8,
        borderTopLeftRadius: 8,
        justifyContent: 'center',
        alignItems: 'center'
      },
      header_text: {
        color: '#52637D',
        fontSize: 16,
        fontWeight: '500'
      },
      header_subtext: {
        color: '#AFAEAE',
        fontSize: 12
      },
      close: {
        position: 'absolute',
        right: '7%',
        top: '-10%',
        zIndex: 999
      }
})
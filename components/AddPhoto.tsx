import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import React, { useState } from "react"
import * as ImagePicker from 'expo-image-picker'

import CameraAdd from '@/assets/svgs/camera_add.svg'

const AddPhoto = () => {
  const [captionText, setCaptionText] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const pickImage = async () => {
    // Ask for permission if not already granted
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access gallery is required!');
      return;
    }

    // Open image picker
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
        setSelectedImage(result.assets[0].uri);
    }
  };

  return (
    <View style={{ padding: 20, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity style={styles.add_photo_cont} onPress={pickImage}>

        {selectedImage && (
            <Image source={{ uri: selectedImage }} style={styles.selected_image} />
        )}

        {!selectedImage && (
            <>
              <View style={styles.photo_circle}>
                  <Image source={require('@/assets/pngs/camera.png')} style={styles.camera} />
              </View>

              <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
              <CameraAdd />
              <Text style={{ color: '#52637D', marginLeft: 6, fontSize: 14 }}>Tap to attach a Photo</Text>
              </View>
              <Text style={{ color: '#8F9BAD', fontSize: 10, marginTop: 2 }}>Everyday has something memorable</Text>
            </>
        )}

      </TouchableOpacity>

      {selectedImage && (
        <TouchableOpacity style={styles.unattach_btn} onPress={() => setSelectedImage(null)}>
          <Text style={{ color: '#52637D' }}>Remove Photo</Text>
        </TouchableOpacity>
      )}

      <View style={{ width: '100%', marginTop: 20 }}>
        <Text style={{ color: '#52637D', fontWeight: '500', marginLeft: 4 }}>Caption</Text>
      </View>
      <View style={[styles.caption_cont, {backgroundColor: selectedImage ? 'white' : '#FBFBFB'}]}>
      <TextInput
        value={captionText}
        onChangeText={(text) => {
          if (text.length <= 70) {
            setCaptionText(text);
          }
        }}
        style={styles.textInput}
        multiline={true}
        underlineColorAndroid="transparent"
        placeholder="This photo is cool because..."
        placeholderTextColor="#94A4BD"
        editable={!!selectedImage}
      />
        <Text style={[styles.char_count, {color: captionText.length < 70 ? '#8F9BAD' : '#FB5858'}]}>{captionText.length}/70</Text>
      </View>
    </View>
  );
};

export default AddPhoto;

const styles = StyleSheet.create({
  add_photo_cont: {
    borderColor: '#CDD8EA',
    borderWidth: 1,
    borderRadius: 8,
    borderStyle: 'dashed',
    backgroundColor: 'white',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 28,
    height: 203
  },
  photo_circle: {
    backgroundColor: '#E8ECF1',
    borderRadius: 100,
    height: 90,
    width: 90,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative'
  },
  camera: {
    position: 'absolute',
    bottom: 6,
    height: 80,
    width: 80,
  },
  selected_image: {
    height: 90,
    width: 90,
    resizeMode: 'cover',
  },
  caption_cont: {
    width: '100%',
    borderColor: '#CDD8EA',
    borderWidth: 1,
    borderRadius: 8,
    height: 70,
    marginTop: 4,
    position: 'relative'
  },
  textInput: {
    height: '100%',
    borderRadius: 8,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
    color: '#52637D',
    textAlignVertical: 'top',
  },
  unattach_btn: {
    borderColor: '#C3C3C3',
    borderWidth: 1,
    borderRadius: 8,
    width: '100%',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    height: 42,
    marginTop: 6
  },
  char_count: {
    position: 'absolute',
    right: 6,
    bottom: 4,
    fontSize: 10
  }
});

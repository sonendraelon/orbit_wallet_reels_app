import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const CreateScreen = ({ navigation }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [caption, setCaption] = useState('');

  const requestPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission required', 'Please allow access to your photo library to select images.');
    }
  };

  const handleImagePick = async (source) => {
    await requestPermission();

    let result;
    if (source === 'camera') {
      result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
    } else {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
    }

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const handlePost = () => {
    if (!selectedImage) {
      Alert.alert('Error', 'Please select an image before posting.');
      return;
    }

    console.log('Post created with image:', selectedImage, 'and caption:', caption);
    
    setSelectedImage(null);
    setCaption('');

    Alert.alert('Success', 'Your post has been created!', [
      { text: 'OK', onPress: () => navigation.goBack() }
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="close-outline" size={30} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>New Post</Text>
        <TouchableOpacity onPress={handlePost}>
          <Text style={styles.postButton}>Share</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.imageContainer}>
        {selectedImage ? (
          <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
        ) : (
          <TouchableOpacity style={styles.imagePicker} onPress={() => handleImagePick('gallery')}>
            <Ionicons name="add-circle-outline" size={50} color="gray" />
            <Text style={styles.imagePickerText}>Add Photo</Text>
          </TouchableOpacity>
        )}
      </View>
      <TextInput
        style={styles.captionInput}
        placeholder="Write a caption..."
        value={caption}
        onChangeText={setCaption}
        multiline
      />
      <View style={styles.optionsContainer}>
        <TouchableOpacity style={styles.option} onPress={() => handleImagePick('camera')}>
          <Ionicons name="camera-outline" size={24} color="black" />
          <Text style={styles.optionText}>Camera</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} onPress={() => handleImagePick('gallery')}>
          <Ionicons name="image-outline" size={24} color="black" />
          <Text style={styles.optionText}>Gallery</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#dbdbdb',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  postButton: {
    color: '#0095f6',
    fontWeight: 'bold',
    fontSize: 16,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imagePicker: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePickerText: {
    marginTop: 10,
    fontSize: 16,
    color: 'gray',
  },
  captionInput: {
    padding: 15,
    fontSize: 16,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#dbdbdb',
  },
  option: {
    alignItems: 'center',
  },
  optionText: {
    marginTop: 5,
  },
});

export default CreateScreen;
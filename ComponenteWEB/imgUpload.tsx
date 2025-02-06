import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

interface ImgUploadProps {
  imageUris: string[];
  pickImage: () => void;
  removeImage: (index: number) => void;
}

const ImgUpload: React.FC<ImgUploadProps> = ({ imageUris, pickImage, removeImage }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Images</Text>
      
      <TouchableOpacity style={styles.uploadBox} onPress={pickImage}>
        <Text style={styles.uploadText}>Upload Images</Text>
        <Text style={styles.subText}>PNG, JPG, GIF up to 10MB</Text>
      </TouchableOpacity>

      {imageUris.length > 0 && (
        <FlatList
          data={imageUris}
          keyExtractor={(item, index) => index.toString()}
          numColumns={3}
          renderItem={({ item, index }) => (
            <View style={styles.imageContainer}>
              <Image source={{ uri: item }} style={styles.image} />
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => removeImage(index)}
              >
                <Text style={styles.removeText}>&times;</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
};

export const useImagePicker = (setImageUris: React.Dispatch<React.SetStateAction<string[]>>) => {
  const pickImage = async () => {
    // Request permissions for accessing images
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Required', 'Please allow access to your photo library.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true, // Allows selecting multiple images (Expo SDK 48+)
      selectionLimit: 5,
      quality: 1,
    });

    if (!result.canceled && result.assets) {
      const newUris = result.assets.map((asset) => asset.uri);
      setImageUris((prevUris) => [...prevUris, ...newUris]);
    }
  };

  return pickImage;
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4A4A4A',
    marginBottom: 8,
  },
  uploadBox: {
    paddingVertical: 12,
    borderWidth: 2,
    borderColor: '#EC4899',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FDE8F3',
  },
  uploadText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#EC4899',
  },
  subText: {
    fontSize: 12,
    color: '#777',
  },
  imageContainer: {
    position: 'relative',
    margin: 5,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  removeButton: {
    position: 'absolute',
    top: 2,
    right: 2,
    backgroundColor: 'red',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  removeText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ImgUpload;

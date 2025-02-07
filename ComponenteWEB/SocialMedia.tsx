// components/SocialMedia.tsx

import React from 'react';
import { View, Text, TouchableOpacity, Linking, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';


const SocialMedia = () => {
  const openLink = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>App Made By Ryan</Text>
      <View style={styles.iconsContainer}>
        <TouchableOpacity onPress={() => openLink('https://www.linkedin.com/in/ryancarlos/')} style={styles.iconButton}>
          <FontAwesome name="linkedin" size={32} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => openLink('https://instagram.com/make4ryan')} style={styles.iconButton}>
          <FontAwesome name="instagram" size={32} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => openLink('https://www.tiktok.com/@make4ryan')} style={styles.iconButton}>
          <FontAwesome5 name="tiktok" size={32} color="black" />
        </TouchableOpacity>
      </View> 
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 16,
  },
  text: {
    color: '#6B7280',
    fontSize: 16,
    textAlign: 'center',
  },
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 16,
  },
  iconButton: {
    marginHorizontal: 10,
  },
});

export default SocialMedia;

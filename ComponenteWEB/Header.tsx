import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const Header: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* Placeholder for logo */}
      <View style={styles.logoContainer}>
        <Image
          source={require('@/assets/icon.png')} // Replace with your image path in assets
          style={styles.logo}
        />
      </View>

      {/* App Name */}
      <Text style={styles.appName}>LoveU365 ❤️</Text>

      {/* Welcome Message */}
      <Text style={styles.welcomeMessage}>
        Welcome to 365 days of love
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  logoContainer: {
    marginBottom: 10,
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 25, // Makes the image circular
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#EC4899',
    marginBottom: 10,
  },
  welcomeMessage: {
    fontSize: 18,
    color: '#4B5563',
  },
});

export default Header;
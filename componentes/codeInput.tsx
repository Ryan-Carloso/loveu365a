import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Pressable, Clipboard } from 'react-native';
import styles from '../styles/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Linking } from 'react-native';
import { Link, router } from 'expo-router';

interface CodeInputProps {
  onCodeSubmit: (code: string) => void;
}

const CodeInput: React.FC<CodeInputProps> = ({ onCodeSubmit }) => {
  const [code, setCode] = useState<string>(''); // Start with an empty code

  useEffect(() => {
    const loadStoredCode = async () => {
      try {
        // Load the stored code from AsyncStorage
        const storedCode = await AsyncStorage.getItem('userCode');
        if (storedCode) {
          setCode(storedCode);
        }
      } catch (error) {
        console.error('Error loading stored code:', error.message);
      }
    };

    loadStoredCode();
  }, []);

  useEffect(() => {
    // Function to handle incoming URLs
    const handleUrl = async (url: string) => {
      const params = new URLSearchParams(url.split('?')[1]);
      const inputCode = params.get('input');
      
      if (inputCode) {
        const storedCode = await AsyncStorage.getItem('userCode');
        
        if (inputCode !== storedCode) { // Check if the incoming code is different
          await AsyncStorage.clear(); // Clear AsyncStorage if the codes are different
          setCode(inputCode); // Set the new code from the URL
          Alert.alert('New Code Received', `Code set to: ${inputCode}`);
        } else {
          Alert.alert('Same Code', 'The received code is the same as the stored code.');
        }
      }
    };

    // Get the initial URL when the app starts
    const getInitialUrl = async () => {
      const initialUrl = await Linking.getInitialURL();
      if (initialUrl) {
        handleUrl(initialUrl);
      }
    };

    getInitialUrl(); // Check if there's an initial URL

    // Subscribe to the URL event
    const subscription = Linking.addEventListener('url', ({ url }) => {
      handleUrl(url);
    });

    return () => {
      subscription.remove(); // Clean up the subscription
    };
  }, []);

  const handleCodeSubmit = async () => {
    if (code.trim() === '') {
      Alert.alert('Validation Error', 'Please enter a valid code.');
      return;
    }

    try {
      await onCodeSubmit(code); // Call the submit function with the current code
      await AsyncStorage.setItem('userCode', code); // Store the code locally
      Alert.alert('Success', 'Code saved successfully!');
    } catch (error) {
      console.error('Error saving code:', error.message);
      Alert.alert('Error', 'Could not save code. Please try again.');
    }
  };

  const handleCopyPress = () => {
    Clipboard.setString(code); // Copy the current code to clipboard
    Alert.alert("Copied to clipboard!", "You can now paste it anywhere.");
  };

  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.TextBelow}>Enter Your Code Below</Text>
      <View style={styles.codeInputContainer}>
        <TextInput
          style={styles.TextcodeInput}
          placeholder="Enter your code"
          value={code} // Pre-filled with the stored or passed code
          onChangeText={setCode}
          secureTextEntry={false}
        />
        <TouchableOpacity style={styles.submitButton} onPress={handleCodeSubmit}>
          <Text style={styles.submitButtonText}>Save Code</Text>
        </TouchableOpacity>
      </View>
      <Link href="/settings" asChild>
      <TouchableOpacity >
      <Text style={styles.TextBelow}>Dont has one? click here</Text>

      </TouchableOpacity>
      </Link>
      <TouchableOpacity onPress={handleCopyPress}>
        <Text style={styles.TextBelow}>To try a code for test, type "code" and click save</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CodeInput;

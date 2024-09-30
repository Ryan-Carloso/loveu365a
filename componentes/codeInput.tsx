import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Pressable, Clipboard, Linking } from 'react-native';
import styles from '../styles/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface CodeInputProps {
  onCodeSubmit: (code: string) => void;
}

const CodeInput: React.FC<CodeInputProps> = ({ onCodeSubmit }) => {
  const [code, setCode] = useState<string>('');

  // Load code from AsyncStorage when the component mounts
  useEffect(() => {
    const loadStoredCode = async () => {
      try {
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

  const handleCodeSubmit = async () => {
    if (code.trim() === '') {
      Alert.alert('Validation Error', 'Please enter a valid code.');
      return;
    }

    try {
      // Delegate handling code submission to the parent component
      await onCodeSubmit(code);
      Alert.alert('Success', 'Code saved successfully!');
    } catch (error) {
      console.error('Error saving code:', error.message);
      Alert.alert('Error', 'Could not save code. Please try again.');
    }
  };

  const handleCopyPress = () => {
    Clipboard.setString("code");
    Alert.alert("Copied to clipboard!", "You can now paste it anywhere.");
  };

  const handleLinkPress = () => {
    Linking.openURL("https://makedbyryan.tech")
      .catch((err) => Alert.alert("Error", "Failed to open link."));
  };

  return (
    <View>
      <Text style={styles.TextBelow}>Enter Your Code Below</Text>
      <View style={styles.codeInputContainer}>
        <TextInput
          style={styles.TextcodeInput}
          placeholder="Enter your code"
          value={code}  // Keep the value from AsyncStorage in the input
          onChangeText={setCode}
          secureTextEntry={false} // Always show the code
        />
        <TouchableOpacity style={styles.submitButton} onPress={handleCodeSubmit}>
          <Text style={styles.submitButtonText}>Save Code</Text>
        </TouchableOpacity>
      </View>
      <Pressable onPress={handleCopyPress}>

      <Text style={styles.TextBelow}>To try a code for test do "code" and click save</Text>
      </Pressable>
      <Pressable style={styles.submitButton} onPress={handleLinkPress}>
        <Text style={styles.submitButtonText}>click here to generate your code</Text>
      </Pressable>
    </View>
  );
};

export default CodeInput;
